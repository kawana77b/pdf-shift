import { useCallback } from "react";
import { toast } from "sonner";

import { useSortableState } from "@/components/sortable";
import { Images, useImagesState } from "@/states/ImagesState";
import { useOpenFileState } from "@/states/OpenFileState";
import { usePleaseWaitState } from "@/states/PleaseWaitState";
import { useSelectedIdState } from "@/states/SelectedIdState";

export function usePdfFile() {
  const { filePath, setFilePath } = useOpenFileState();
  const { setImages, images } = useImagesState();
  const { setItems } = useSortableState();
  const { setSelectedId } = useSelectedIdState();
  const { items } = useSortableState();
  const { setIsWaiting } = usePleaseWaitState();

  /**
   * Display the overlay while performing a callback, which is a task,
   * and turn off the display when the task is finished.
   * Control to notify the user if there is an error.
   */
  const runWithWaitingOverlay = useCallback(
    async (task: () => Promise<void>) => {
      try {
        setIsWaiting(true);
        await task();
      } catch (e) {
        // This app is a demo app and will not be that honest about errors.
        // If there is a failure, simple information is given to the user.
        console.error(e);
        toast.error("Sorry, An error has occurred.", {
          duration: 3 * 1000,
        });
      } finally {
        setIsWaiting(false);
      }
    },
    [setIsWaiting]
  );

  /**
   * Open file dialog and set the file path and slides
   */
  const openFileDialog = async () => {
    const f = await window.api.openPdfFileDialog();
    if (!f) return;

    setOpenFile(f);
  };

  /**
   * Set the file path and slides
   */
  const setOpenFile = async (path: string) => {
    if (!path) return;
    await runWithWaitingOverlay(async () => {
      const ext = path.split(".").pop();
      if (ext !== "pdf") return;

      const { data } = await window.api.getPdfData(path);
      if (!data) return;

      /**
       * Update the file path and slides
       */
      setFilePath(path);

      const _images = new Images(data);
      setImages(_images);
      setItems(_images.getOrderIds());
      setSelectedId(_images.initialOrders[0]);
    });
  };

  /**
   * Save slides
   */
  const saveFile = async () => {
    const src = filePath;
    const dst = await window.api.openPdfSaveDialog();
    if (!dst) return;

    await runWithWaitingOverlay(async () => {
      // Identify how the order of pages to be preserved corresponds to the index of the original source.
      const ids = items.map((item) => item.id) as string[];
      const idxs = images.getIndexArrayFromIds(ids);

      await window.api.savePdfFile(src, dst, idxs);

      toast.success("Saved File", {
        duration: 5 * 1000,
        action: {
          label: "Open Folder",
          onClick: async () => {
            await window.api.openByExplorer(dst);
          },
        },
      });
    });
  };

  /**
   * Reset pages
   */
  const resetSlides = () => {
    setItems(images.getOrderIds());
    setSelectedId(images.initialOrders[0]);
  };

  /**
   * Clear pages
   */
  const clearSlides = () => {
    setFilePath("");
    setImages(new Images([]));
    setItems([]);
    setSelectedId("");
  };

  return {
    filePath,
    openFileDialog,
    setOpenFile,
    saveFile,
    resetSlides,
    clearSlides,
  };
}
