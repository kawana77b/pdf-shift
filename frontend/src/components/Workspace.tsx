"use client";

import { PleaseDropPdf } from "@/components/PleaseDropPdf";
import { SlideListView } from "@/components/slide/list";
import { SingleView } from "@/components/slide/single";
import { usePdfFile } from "@/hooks/usePdfFile";

export const Workspace = () => {
  const { filePath } = usePdfFile();

  if (!filePath) {
    return <PleaseDropPdf />;
  }

  // To animate whenever filePath is updated,
  // a key must be passed to trigger re-rendering.
  return (
    <div className="flex h-full overflow-hidden" key={filePath}>
      <SlideListView />
      <SingleView />
    </div>
  );
};
