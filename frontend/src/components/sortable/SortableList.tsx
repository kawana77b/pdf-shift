"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type ReactNode, useState } from "react";

import { SortableItem } from "./SortableItem";
import { useSortableState } from "./useSortableState";

interface SortableListProps {
  /**
   * Callback to render the item to be drawn.
   */
  render: (data: { id: UniqueIdentifier; idx: number }) => ReactNode;
  /**
   * Callback to render the overlay to be drawn.
   */
  renderOverlay: (data: { id: UniqueIdentifier; idx: number }) => ReactNode;
}

/**
 * List-like components that can be sorted by dragging and dropping up and down.
 * @description `useSortableState` hook to control state, but note that this is a universal and **unique** state.
 */
export const SortableList = ({ render, renderOverlay }: SortableListProps) => {
  const { items, setItems } = useSortableState();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Require the user to press the mouse or touch screen to initiate a drag
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const onDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id);
  };

  const onDragEnd = (e: DragEndEvent) => {
    moveItems(e);
    setActiveId(null);
  };

  const moveItems = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id && over?.id && active.id !== over.id) {
      const oldIdx = items.findIndex((data) => data.id === active.id);
      const newIdx = items.findIndex((data) => data.id === over.id);
      setItems(arrayMove(items, oldIdx, newIdx));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item, idx) => (
          <SortableItem key={`${item.id}-${idx}`} id={item.id}>
            {render({
              id: item.id,
              idx,
            })}
          </SortableItem>
        ))}
      </SortableContext>
      <DragOverlay>
        {activeId
          ? renderOverlay({
              id: activeId,
              idx: items.findIndex((data) => data.id === activeId),
            })
          : null}
      </DragOverlay>
    </DndContext>
  );
};
