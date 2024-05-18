export type MIMEType = "image/png" | "image/jpeg" | "image/webp";

/**
 * Represents a base64 converter.
 * It can convert base64 string to data url and vice versa.
 */
export class Base64Converter {
  static PNG() {
    return new Base64Converter("image/png");
  }
  static JPEG() {
    return new Base64Converter("image/jpeg");
  }
  static WebP() {
    return new Base64Converter("image/webp");
  }

  private _mime: MIMEType;
  constructor(mime: MIMEType) {
    this._mime = mime;
  }

  get mime() {
    return this._mime;
  }

  protected get prefix() {
    return `data:${this._mime};base64,`;
  }

  /**
   * Convert base64 string to data url
   * @param b64string
   * @returns
   */
  dataURL(b64string: string): string {
    return `${this.prefix}${b64string}`;
  }

  /**
   * Strip prefix from data url
   * @param dataUrl
   * @returns
   */
  stripPrefix(dataUrl: string): string {
    return dataUrl.substring(this.prefix.length);
  }
}
