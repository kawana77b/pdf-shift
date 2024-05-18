"use client";

import { useTheme } from "next-themes";
import { type ComponentProps, forwardRef } from "react";

import { MoonIcon, SunIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoaded } from "@/hooks/useLoaded";
import { cn } from "@/lib/utils";

import { Skeleton } from "./ui/skeleton";

export interface ThemeButtonProps {
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  /**
   * Whether to show the focus ring when focused, defaults to `true`
   */
  invisibleRing?: boolean;
}

/**
 * A button that toggles between light and dark mode.
 */
export const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(
  (
    {
      variant = "ghost",
      size = "icon",
      invisibleRing = true,
    }: ThemeButtonProps,
    ref
  ) => {
    const { setTheme, theme, systemTheme } = useTheme();

    const loaded = useLoaded();
    if (!loaded) {
      return (
        <Button size={"sm"} variant={"ghost"} disabled>
          <Skeleton className="w-[16px] h-[16px]" />
        </Button>
      );
    }

    const isDark =
      theme === "dark" || (theme === "system" && systemTheme === "dark");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            className={cn(
              invisibleRing
                ? "focus-visible:ring-0 focus-visible:ring-offset-0"
                : null
            )}
            size={size}
            variant={variant}
          >
            {isDark ? <MoonIcon size={16} /> : <SunIcon size={16} />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

ThemeButton.displayName = "ThemeButton";
