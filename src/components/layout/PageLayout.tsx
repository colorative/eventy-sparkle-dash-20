
import React, { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { LeftSidebar } from "@/components/dashboard/LeftSidebar";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
  hideRightSidebar?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, hideRightSidebar = false }) => {
  const [currentRole, setCurrentRole] = useState("exhibitor");
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="sticky top-0 z-30">
          <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
        </div>
        <div className="flex w-full flex-1 h-[calc(100vh-65px)]">
          <div className="sticky top-[65px] h-[calc(100vh-65px)]">
            <LeftSidebar currentRole={currentRole} />
          </div>
          <main className="flex-1 overflow-auto transition-all">
            {children}
          </main>
          {!hideRightSidebar && (
            <div className="sticky top-[65px] h-[calc(100vh-65px)]">
              <RightSidebar />
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};
