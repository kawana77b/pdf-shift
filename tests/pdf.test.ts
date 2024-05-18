import { expect, test, describe } from "vitest";

import { PDF2PNGConverter, PDFPageEditor } from "../main/lib/pdf/index.js";

const pdfPath = "./tests/data/test.pdf";

describe("png converter", () => {
  const converter = PDF2PNGConverter.fromFile(pdfPath);
  test("pdf to png", async () => {
    const result = await converter.convert();
    expect(result.count).toBe(17);
  });
});

describe("pdf page editor", async () => {
  const editor = await PDFPageEditor.fromFile(pdfPath);
  test("editor.src", async () => {
    expect(editor.src.count).toBe(17);
  });

  test("editor get/set pages", async () => {
    editor.setPages(1, 2, 3, 5);
    expect(editor.getPages().length).toBe(4);
  });
});
