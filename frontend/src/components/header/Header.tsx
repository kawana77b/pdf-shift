import { cn } from "@/lib/utils";

import { Information } from "./Information";
import { Menu } from "./Menu";

export interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const Header = ({ className, children }: HeaderProps) => {
  return (
    <header
      className={cn(
        "py-4 px-8 flex flex-row items-center justify-between gap-3 h-[60px] max-h-[60px] border-b-[0.5px] z-1",
        className
      )}
    >
      <Information />
      <Menu />
    </header>
  );
};
