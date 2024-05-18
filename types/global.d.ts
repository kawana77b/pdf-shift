declare global {
  interface Window {
    api: ElectronAPI;
  }

  interface ElectronAPI {
    /**
     * Open file dialog, and return the file path
     * @returns file path
     */
    openPdfFileDialog: () => Promise<string | null>;
    /**
     * Open save dialog, and return the save path
     * @returns save path
     */
    openPdfSaveDialog: () => Promise<string | null>;
    /**
     * Analyze the PDF file and return the png data
     * @param path
     * @returns json data including id and base64
     */
    getPdfData: (path: string) => Promise<{
      data: [
        {
          id: string;
          base64: string;
        }
      ];
    } | null>;
    /**
     * Save the PDF file
     * @param src
     * @param dst
     * @param idxs
     * @returns
     */
    savePdfFile: (src: string, dst: string, idxs: number[]) => Promise<void>;
    /**
     * Open the file by system explorer
     * @param path
     */
    openByExplorer: (path: string) => Promise<void>;
  }

  // Electron extends the path property on the File object
  interface File {
    path: string;
  }
}

export {};
