import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { config } from "dotenv";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import serve from "electron-serve";
import { nanoid } from "nanoid";
import { z } from "zod";

import { PDFDialog } from "./lib/dialog/index.js";
import { PDF2PNGConverter } from "./lib/pdf/PDF2PNGConverter.js";
import { PDFPageEditor } from "./lib/pdf/PDFPageEditor.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loadURL = serve({ directory: "frontend/dist" });

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    minWidth: 900,
    minHeight: 600,
    width: 1000,
    height: 700,
    webPreferences: {
      preload: resolve(__dirname, "preload/preload.js"),
    },
  });

  if (app.isPackaged) {
    mainWindow.menuBarVisible = false;
  }

  await loadURL(mainWindow);

  if (!app.isPackaged) {
    if (process.env?.DEV_TOOLS === "true")
      mainWindow.webContents.openDevTools();
  }
};

const lock = app.requestSingleInstanceLock();
if (!lock) app.quit();

if (!app.isPackaged) config();

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

//-----------------------------
// ipcMain Handlers
//-----------------------------

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Open a file dialog to select a PDF file
 */
ipcMain.handle("open-pdf-file-dialog", async (ev, args) => {
  return await new PDFDialog().load();
});

/**
 * Get the data of a PDF file
 */
ipcMain.handle("get-pdf-data", async (ev, p) => {
  const schema = z.string().safeParse(p);
  if (schema.error) {
    return null;
  }
  const path = schema.data;

  const conv = PDF2PNGConverter.fromFile(path);
  const res = await conv.convert();
  const data = res.pages().map((page) => {
    return {
      id: nanoid(),
      base64: page.base64(),
    };
  });
  return { data };
});

/**
 * Open a file dialog to save a PDF file
 */
ipcMain.handle("open-pdf-save-dialog", async (ev, args) => {
  return await new PDFDialog().save();
});

/**
 * Save a PDF file with selected pages
 */
ipcMain.handle("save-pdf-file", async (ev, s, d, i) => {
  const schema = z
    .object({
      src: z.string(),
      dst: z.string(),
      idxs: z.array(z.number()),
    })
    .safeParse({ src: s, dst: d, idxs: i });
  if (schema.error) {
    return;
  }

  const { src, dst, idxs } = schema.data;
  const editor = await PDFPageEditor.fromFile(src);
  editor.setPages(...idxs);
  await editor.save(dst);
});

/**
 * Open a file explorer to the specified path
 */
ipcMain.handle("open-by-explorer", async (ev, p) => {
  const schema = z.string().safeParse(p);
  if (schema.error) {
    return undefined;
  }

  const fullPath = schema.data;
  if (!existsSync(fullPath)) {
    return undefined;
  }

  shell.showItemInFolder(fullPath);
  return fullPath;
});

/* eslint-enable @typescript-eslint/no-unused-vars */
