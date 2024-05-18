import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { extname } from "node:path";

import { PDFDocument } from "pdf-lib/cjs/index.js";

const PDF_EXT = ".pdf";

/**
 * PDF page editing.
 * In other words, the class can delete and replace pages based on PDF data.
 */
export class PDFPageEditor {
  /**
   * Create PDF from a file
   * @param src
   * @returns
   */
  static async fromFile(src: string): Promise<PDFPageEditor> {
    if (!existsSync(src)) {
      throw new Error(`File not found: ${src}`);
    }
    if (extname(src.toLowerCase()) !== PDF_EXT) {
      throw new Error(`File cannot be read: not a ${PDF_EXT} file`);
    }
    const uint8Array = readFileSync(src);
    return await PDFPageEditor.fromBuffer(uint8Array);
  }

  /**
   * Create PDF from a buffer
   * @param buffer
   * @returns
   */
  static async fromBuffer(
    buffer: Uint8Array | ArrayBuffer
  ): Promise<PDFPageEditor> {
    return new PDFPageEditor(await PDFDocument.load(buffer));
  }

  private _src: PDFDocument;
  private _pages: number[] = [];
  constructor(src: PDFDocument) {
    this._src = src;
    this._pages = Array.from({ length: src.getPages().length }, (_, i) => i);
  }

  /**
   * Get page count
   */
  get count(): number {
    return this._pages.length;
  }

  /**
   * Get source PDF information
   * @returns
   */
  get src(): {
    count: number;
  } {
    return {
      count: this._src.getPages().length,
    };
  }

  /**
   * Get Page Indexes
   * @returns
   */
  getPages(): number[] {
    return [...this._pages];
  }

  /**
   * Set Page Indexes from `0` to `count - 1`
   * @param pages
   */
  setPages(...pages: number[]) {
    if (pages.length > this.count) {
      throw new Error("Too many pages");
    }
    if (pages.some((i) => i < 0 || i >= this.count)) {
      throw new Error("Invalid page index");
    }
    this._pages = pages;
  }

  /**
   * Save PDF to a file
   * @param dst destination file path
   */
  async save(dst: string): Promise<void> {
    if (extname(dst.toLowerCase()) !== PDF_EXT) {
      throw new Error(`File extension must be ${PDF_EXT}`);
    }
    const data = await this.toUint8Array();
    writeFileSync(dst, data);
  }

  /**
   * Convert PDF to `Uint8Array`
   * @returns
   */
  async toUint8Array(): Promise<Uint8Array> {
    const pdf = await PDFDocument.create();
    for (const i of this._pages) {
      const [page] = await pdf.copyPages(this._src, [i]);
      pdf.addPage(page);
    }
    const data = await pdf.save();
    return data;
  }
}
