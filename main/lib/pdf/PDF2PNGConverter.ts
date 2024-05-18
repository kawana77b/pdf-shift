import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { extname } from "node:path";

import { PDFiumLibrary, type PDFiumPageRender } from "@hyzyla/pdfium";

const PDF_EXT = ".pdf";

/**
 * Convert PDF to PNGs Data
 */
export class PDF2PNGConverter {
  /**
   * Create a new instance from a file path
   * @param path
   * @returns
   */
  static fromFile(path: string) {
    if (!existsSync(path)) {
      throw new Error(`File not found: ${path}`);
    }
    if (extname(path).toLowerCase() !== PDF_EXT) {
      throw new Error(`Invalid file type: ${path}`);
    }

    const buf = readFileSync(path);
    return new PDF2PNGConverter(buf);
  }

  /**
   * Create a new instance from a buffer
   * @param buffer
   * @returns
   */
  static fromBuffer(buffer: Buffer) {
    return new PDF2PNGConverter(buffer);
  }

  private _buffer: Buffer;
  constructor(buffer: Buffer) {
    this._buffer = buffer;
  }

  /**
   * Convert the PDF to PNGsData
   * @returns Result of the conversion
   */
  async convert(options?: { scale?: number }): Promise<PDF2PNGConvertResult> {
    const pdfium = await PDFiumLibrary.init();
    const document = await pdfium.loadDocument(this._buffer);

    const pages: PDFPage[] = [];
    try {
      for (const page of document.pages()) {
        const png = await page.render({
          render: "sharp",
          scale: Math.abs(options?.scale ?? 1),
        });
        pages.push(new PDFPage(png));
      }
    } finally {
      // NOTE: Don't forget to destroy the document and library
      document.destroy();
      pdfium.destroy();
    }

    return new PDF2PNGConvertResult(pages);
  }
}

/**
 * Represents a single page of a PDF
 */
export class PDFPage {
  private _image: PDFiumPageRender;
  constructor(image: PDFiumPageRender) {
    this._image = image;
  }

  /**
   * Get the size of the image
   */
  get size() {
    const { width, height } = this._image;
    return { width, height };
  }

  /**
   * Get the Png image buffer
   * @returns
   */
  buffer(): Buffer {
    return this._image.data;
  }

  /**
   * Get the Png image as base64 string
   * @returns
   */
  base64(): string {
    return this._image.data.toString("base64");
  }

  /**
   * Save the Png image to a file
   * @param dst Destination path
   */
  save(dst: string) {
    if (extname(dst) !== ".png") {
      throw new Error(`Save Extension must be .png`);
    }
    writeFileSync(dst, this.buffer());
  }
}

/**
 * Result of the PDF to PNG conversion
 */
export class PDF2PNGConvertResult {
  private _pages: PDFPage[] = [];
  constructor(pages: PDFPage[]) {
    this._pages = pages;
  }

  *[Symbol.iterator]() {
    for (const page of this._pages) {
      yield page;
    }
  }

  /**
   * Indicates the number of pages
   */
  get count() {
    return this._pages.length;
  }

  /**
   * Retrieve the pages as an array of buffers
   * @returns
   */
  buffers(): Buffer[] {
    return this._pages.map((image) => image.buffer());
  }

  /**
   * Retrieve the pages as an array of base64 strings
   * @returns
   */
  base64s(): string[] {
    return this._pages.map((image) => image.base64());
  }

  /**
   * Retrieve the pages as an array
   * @returns
   */
  pages(): PDFPage[] {
    return [...this._pages];
  }
}
