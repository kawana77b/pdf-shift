"use client";

import { usePdfFile } from "@/hooks/usePdfFile";

export interface InformationProps {}

export const Information = ({}: InformationProps) => {
  const { filePath } = usePdfFile();
  return (
    <div id="src-info" className="overflow-hidden px-6 py-2">
      <p className="text-xs font-semibold">file:</p>
      <p className="text-xs text-ellipsis text-nowrap">
        {filePath.length > 0 ? filePath : "No Read"}
      </p>
    </div>
  );
};
