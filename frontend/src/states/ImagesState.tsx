import { create } from "zustand";

import { Base64Converter } from "@/lib/base64";

interface Slide {
  id: string;
  base64: string;
}

/**
 * Data container of information in slide management, managing sequence and images
 */
export class Images {
  private static readonly converter = Base64Converter.PNG();

  private readonly _initialOrders: string[] = [];
  private readonly _datas: Map<string, string> = new Map<string, string>();
  constructor(slides: Slide[]) {
    slides.forEach((slide) => {
      this._initialOrders.push(slide.id);
      this._datas.set(slide.id, slide.base64);
    });
  }

  /**
   * Get the initail order (index keys) of the data containers.
   */
  get initialOrders(): string[] {
    return this._initialOrders;
  }

  /**
   * Get a list containing the IDs of the data containers in order.
   * @description The difference from `initialOrders` is that the return value is an object.
   */
  getOrderIds(): { id: string }[] {
    return this._initialOrders.map((id) => ({ id }));
  }

  /**
   * Get the data URL of the specified ID.
   * @param id
   * @returns data URL. If the ID does not exist, an Empty string is returned.
   */
  getDataUrl(id: string): string {
    return Images.converter.dataURL(this._datas.get(id)) ?? "";
  }

  /**
   * Get indexes from IDs.
   * That is, for an array of ids, it returns a list with each element converted to an index number.
   * @param ids
   * @returns
   */
  getIndexArrayFromIds(ids: string[]): number[] {
    return ids.map((id) => this._initialOrders.indexOf(id));
  }
}

export interface ImagesState {
  images: Images;
  setImages: (images: Images) => void;
}

export const useImagesState = create<ImagesState>((set) => ({
  images: new Images([]),
  setImages: (images: Images) => set({ images }),
}));
