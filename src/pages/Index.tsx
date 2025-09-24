
import React, { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { LeftSidebar } from "@/components/dashboard/LeftSidebar";
import { MainContent } from "@/components/dashboard/MainContent";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [currentRole, setCurrentRole] = useState("exhibitor");
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex flex-col bg-neutral-50">
        <div className="sticky top-0 z-30">
          <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
        </div>
        <div className="flex w-full flex-1 h-[calc(100vh-133px)]">
          <div className="sticky top-[64px] h-[calc(100vh-64px)]">
            <LeftSidebar currentRole={currentRole} />
          </div>
          <div className="flex-1 overflow-auto">
            <MainContent />
          </div>
          <div className="sticky top-[64px] h-[calc(100vh-64px)]">
            <RightSidebar />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
