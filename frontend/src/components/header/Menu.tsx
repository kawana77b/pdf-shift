"use client";

import { useState } from "react";

import { ConfirmDialog } from "@/components/ConfirmDialog";
import { usePdfFile } from "@/hooks/usePdfFile";

import {
  MenuClearButton,
  MenuLoadButton,
  MenuResetButton,
  MenuSaveButton,
  MenuThemeButton,
} from "./Buttons";

const MenuResetButtonWithDialog = ({ disabled }: { disabled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resetSlides } = usePdfFile();

  const onClick = () => setIsOpen(true);
  return (
    <>
      <MenuResetButton onClick={onClick} disabled={disabled} />
      <ConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title={"Reset Pages"}
        content={
          "The edit page state will be restored to the initial state. Are you sure?"
        }
        onOkClick={resetSlides}
        okColor="danger"
      />
    </>
  );
};

const MenuClearButtonWithDialog = ({ disabled }: { disabled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearSlides } = usePdfFile();

  const onClick = () => setIsOpen(true);
  return (
    <>
      <MenuClearButton onClick={onClick} disabled={disabled} />
      <ConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title={"Clear Pages"}
        content={
          "Close the currently open file and clear the window state. Are you sure?"
        }
        onOkClick={clearSlides}
        okColor="danger"
      />
    </>
  );
};

export const Menu = () => {
  const { filePath, openFileDialog, saveFile } = usePdfFile();

  const fileNotReady = filePath.length === 0;
  return (
    <>
      <ul id="menu-btns" className="flex flex-row gap-4">
        <li>
          <MenuLoadButton onClick={openFileDialog} />
        </li>
        <li>
          <MenuSaveButton onClick={saveFile} disabled={fileNotReady} />
        </li>
        <li>
          <MenuResetButtonWithDialog disabled={fileNotReady} />
        </li>
        <li>
          <MenuClearButtonWithDialog disabled={fileNotReady} />
        </li>
        <li>
          <MenuThemeButton />
        </li>
      </ul>
    </>
  );
};
