
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, icon }) => {
  return (
    <Card className="bg-white border border-slate-200 self-stretch flex flex-col items-stretch justify-center flex-1 shrink basis-[0%] my-auto px-6 py-3 rounded-lg shadow-sm max-md:px-5">
      <CardContent className="p-0">
        <div className="flex w-full items-center justify-between">
          <div className="self-stretch flex-1 shrink basis-[0%] my-auto">
            <div className="text-slate-950 text-2xl font-medium leading-none tracking-[-0.14px]">
              {value}
            </div>
            <div className="text-slate-500 text-sm font-normal leading-none mt-1.5">
              {label}
            </div>
          </div>
          <div className="self-stretch flex min-h-[62px] flex-col w-6 my-auto">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
