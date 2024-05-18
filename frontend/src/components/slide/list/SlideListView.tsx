"use client";

import { motion, type Variants } from "framer-motion";
import { type MouseEvent } from "react";

import { SlidePage } from "@/components/slide/list/page";
import { SortableList, useSortableState } from "@/components/sortable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSlides } from "@/hooks/useSlides";

const animationVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export const SlideListView = () => {
  const { images, selectedId, setSelectedId } = useSlides();
  const { items, removeItem } = useSortableState();

  return (
    <aside className="w-[30vw] h-full border-r-[1px]">
      <ScrollArea className="h-full">
        <motion.ul
          className="flex flex-col gap-4 mx-3 p-2"
          initial={"initial"}
          animate={"animate"}
          variants={animationVariants}
        >
          <SortableList
            render={(data) => {
              const id = data.id as string;
              const no = data.idx + 1;
              const src = images.getDataUrl(id);
              const alt = `slide ${data.idx} page`;
              const isSelected = selectedId === id;
              const onlyOneItemLeft = items.length <= 1;

              const handleClick = (e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();

                setSelectedId(id);
              };

              const handleRemoveClick = (e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();

                removeItem(id);
                if (isSelected) {
                  setSelectedId("");
                }
              };
              return (
                <SlidePage
                  key={id}
                  id={id}
                  src={src}
                  alt={alt}
                  no={no}
                  onClick={handleClick}
                  onRemoveClick={handleRemoveClick}
                  isSelected={isSelected}
                  disableRemove={onlyOneItemLeft}
                />
              );
            }}
            renderOverlay={(data) => {
              const id = data.id as string;
              const no = data.idx + 1;
              const src = images.getDataUrl(id);
              const alt = `slide ${data.idx} page`;
              return (
                <SlidePage
                  key={id}
                  id={id}
                  src={src}
                  alt={alt}
                  no={no}
                  opacity="40"
                />
              );
            }}
          />
        </motion.ul>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </aside>
  );
};
