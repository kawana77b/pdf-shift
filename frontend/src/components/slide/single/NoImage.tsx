import { ImageIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export const NoImage = () => {
  return (
    <div
      className={cn("flex flex-col justify-center items-center h-full gap-4")}
    >
      <ImageIcon size={220} />
      <p className="font-bold">No Selected Image</p>
    </div>
  );
};
