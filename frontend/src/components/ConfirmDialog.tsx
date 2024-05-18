import { cva, type VariantProps } from "class-variance-authority";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const confirmDialogVariants = cva("", {
  variants: {
    okColor: {
      default: "",
      info: "bg-blue-500 text-white",
      danger: "bg-red-500 text-white",
    },
  },
  defaultVariants: {
    okColor: "default",
  },
});

export interface ConfirmDialogProps
  extends VariantProps<typeof confirmDialogVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Only show the OK button
   */
  onlyOk?: boolean;
  title?: string;
  content?: string;
  /**
   * Text for the cancel button. Default is "Cancel"
   */
  cancelText?: string;
  /**
   * Text for the OK button. Default is "Confirm"
   */
  okText?: string;
  /**
   * Callback when the cancel button is clicked
   */
  onCancelClick?: () => void;
  /**
   * Callback when the OK button is clicked
   */
  onOkClick?: () => void;
}

/**
 * Confirm dialog component
 */
export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  content,
  cancelText,
  okText,
  onCancelClick,
  onOkClick,
  onlyOk,
  okColor,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {content && (
            <AlertDialogDescription>{content}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!onlyOk && (
            <AlertDialogCancel onClick={onCancelClick}>
              {cancelText ?? "Cancel"}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            className={confirmDialogVariants({ okColor })}
            onClick={onOkClick}
          >
            {okText ?? "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
