import { useImagesState } from "@/states/ImagesState";
import { useSelectedIdState } from "@/states/SelectedIdState";

export function useSlides() {
  const { images } = useImagesState();
  const { selectedId, setSelectedId } = useSelectedIdState();

  return {
    images,
    selectedId,
    setSelectedId,
  };
}
