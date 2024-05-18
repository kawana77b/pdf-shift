import { dialog, type FileFilter } from "electron";

import { IFileDialog } from "./contracts.js";

export class PDFDialog implements IFileDialog {
  static Filters: FileFilter[] = [{ name: "PDF FIle", extensions: ["pdf"] }];

  async load(): Promise<string | undefined> {
    const res = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: PDFDialog.Filters,
    });

    if (res.canceled) return undefined;
    if (res.filePaths.length === 0) return undefined;

    return res.filePaths[0];
  }

  async save(): Promise<string | undefined> {
    const res = await dialog.showSaveDialog({
      properties: ["createDirectory", "showOverwriteConfirmation"],
      filters: PDFDialog.Filters,
    });

    if (res.canceled) return undefined;
    if (res.filePath.length === 0) return undefined;

    return res.filePath;
  }
}
