export interface ILoadFileDialog {
  /**
   * open file dialog, and return the file path to load the file
   * @returns the file path to read the file
   */
  load: () => Promise<string | undefined>;
}

export interface ISaveFileDialog {
  /**
   * open save dialog, and return the file path to save the file
   * @returns the file path to save the file
   */
  save: () => Promise<string | undefined>;
}

export interface IFileDialog extends ILoadFileDialog, ISaveFileDialog {}
