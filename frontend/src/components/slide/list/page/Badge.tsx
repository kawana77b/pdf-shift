"use client";

import { Badge as UiBadge } from "@/components/ui/badge";

export interface BadgeProps {
  className?: string;
  isSelected?: boolean;
  no: number;
}

export const Badge = ({ className, isSelected, no }: BadgeProps) => {
  return (
    <UiBadge
      className={className}
      variant={isSelected ? "secondary" : "default"}
    >
      {no}
    </UiBadge>
  );
};
