import { contextBridge, ipcRenderer } from "electron";

const api: ElectronAPI = {
  openPdfFileDialog: async () => {
    const filePath = await ipcRenderer.invoke("open-pdf-file-dialog");
    if (typeof filePath === "string") {
      return filePath;
    }
    return null;
  },

  openPdfSaveDialog: async () => {
    const filePath = await ipcRenderer.invoke("open-pdf-save-dialog");
    if (typeof filePath === "string") {
      return filePath;
    }
    return null;
  },

  getPdfData: async (path: string) => {
    const data = await ipcRenderer.invoke("get-pdf-data", path);
    if (data) {
      return data;
    }
    return null;
  },

  savePdfFile: async (src: string, dst: string, idxs: number[]) => {
    await ipcRenderer.invoke("save-pdf-file", src, dst, idxs);
  },

  openByExplorer: async (path: string) => {
    await ipcRenderer.invoke("open-by-explorer", path);
  },
};

contextBridge.exposeInMainWorld("api", api);
