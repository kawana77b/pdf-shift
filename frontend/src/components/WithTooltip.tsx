import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export interface WithTooltipProps {
  children?: React.ReactNode;
  text?: string;
  asChild?: boolean;
}

/**
 * Display a tooltip when hovering over the children.
 */
export const WithTooltip = ({ children, text, asChild }: WithTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
