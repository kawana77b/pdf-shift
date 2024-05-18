"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";

import { FolderIcon, ReturnIcon, SaveIcon, StarIcon } from "@/components/icons";
import { ThemeButton } from "@/components/ThemeButton";
import { Button } from "@/components/ui/button";
import { WithTooltip } from "@/components/WithTooltip";

const MENU_ICON_SIZE = 16;

export type MenuButton = ComponentPropsWithRef<"button">

export const MenuButton = forwardRef<HTMLButtonElement, MenuButton>(
  ({ children, ...props }, ref) => {
    return (
      <Button ref={ref} size={"sm"} variant={"ghost"} {...props}>
        {children}
      </Button>
    );
  }
);

MenuButton.displayName = "MenuButton";

export type MenuLoadButtonProps = MenuButton

export const MenuLoadButton = forwardRef<
  HTMLButtonElement,
  MenuLoadButtonProps
>(({ ...props }, ref) => {
  return (
    <WithTooltip text="Load" asChild>
      <MenuButton ref={ref} {...props}>
        <FolderIcon size={MENU_ICON_SIZE} />
      </MenuButton>
    </WithTooltip>
  );
});

MenuLoadButton.displayName = "MenuLoadButton";

export type MenuSaveButtonProps = MenuButton

export const MenuSaveButton = forwardRef<
  HTMLButtonElement,
  MenuSaveButtonProps
>(({ ...props }, ref) => {
  return (
    <WithTooltip text="Save" asChild>
      <MenuButton ref={ref} {...props}>
        <SaveIcon size={MENU_ICON_SIZE} />
      </MenuButton>
    </WithTooltip>
  );
});

MenuSaveButton.displayName = "MenuSaveButton";

export type MenuResetButtonProps = MenuButton

export const MenuResetButton = forwardRef<
  HTMLButtonElement,
  MenuResetButtonProps
>(({ ...props }, ref) => {
  return (
    <WithTooltip text="Reset" asChild>
      <MenuButton ref={ref} {...props}>
        <ReturnIcon size={MENU_ICON_SIZE} />
      </MenuButton>
    </WithTooltip>
  );
});

MenuResetButton.displayName = "MenuResetButton";

export type MenuClearButtonProps = MenuButton

export const MenuClearButton = forwardRef<
  HTMLButtonElement,
  MenuResetButtonProps
>(({ ...props }, ref) => {
  return (
    <WithTooltip text="Clear" asChild>
      <MenuButton ref={ref} {...props}>
        <StarIcon size={MENU_ICON_SIZE} />
      </MenuButton>
    </WithTooltip>
  );
});

MenuClearButton.displayName = "MenuClearButton";

export const MenuThemeButton = () => {
  return <ThemeButton size={"sm"} />;
};
