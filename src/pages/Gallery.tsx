
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GalleryContent } from "@/components/gallery/GalleryContent";
import { FolderListPanel } from "@/components/gallery/FolderListPanel";

const Gallery = () => {
  return (
    <PageLayout hideRightSidebar={true}>
      <div className="flex h-full">
        <main className="flex-1 overflow-auto">
          <GalleryContent />
        </main>
        <aside className="h-full border-l border-slate-100 sticky top-0 self-start">
          <FolderListPanel />
        </aside>
      </div>
    </PageLayout>
  );
};

export default Gallery;
