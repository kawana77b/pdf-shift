"use client";

import { type UniqueIdentifier } from "@dnd-kit/core";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ComponentPropsWithoutRef, type ReactNode } from "react";

import { Indicator } from "./Indicator";

/**
 * Position of the indicator.
 */
enum IndicatorPosition {
  None,
  Up,
  Down,
}

export interface SortableItemProps
  extends Omit<ComponentPropsWithoutRef<"div">, "id"> {
  id: UniqueIdentifier;
  children?: ReactNode;
}

/**
 * Higher-level components for sorting items
 */
export const SortableItem = ({ id, children, ...props }: SortableItemProps) => {
  const {
    isSorting,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    activeIndex,
    overIndex,
  } = useSortable({
    id: id,
    animateLayoutChanges: (args: any) =>
      defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
  });

  const style = {
    transform: isSorting ? undefined : CSS.Transform.toString(transform),
    transition,
  };

  const getIndicatorPosition = (): IndicatorPosition => {
    if (isSorting && isOver) {
      if (activeIndex > overIndex) return IndicatorPosition.Up;
      if (activeIndex < overIndex) return IndicatorPosition.Down;
    }
    return IndicatorPosition.None;
  };

  const indicatorPosition = getIndicatorPosition();

  return (
    <div
      className="flex flex-col gap-2"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    >
      {indicatorPosition === IndicatorPosition.Up && <Indicator />}
      {children}
      {indicatorPosition === IndicatorPosition.Down && <Indicator />}
    </div>
  );
};
