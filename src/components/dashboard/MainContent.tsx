
import React from "react";
import { EventInfo } from "./EventInfo";
import { EventStats } from "./EventStats";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRightCircle, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

export const MainContent: React.FC = () => {
  return (
    <div className="bg-white flex min-w-60 flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] p-2 max-md:max-w-full">
      <Card className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full h-full overflow-hidden flex-1 rounded-2xl max-md:max-w-full border-0">
        <CardContent className="w-full h-full flex-1 p-4 max-md:max-w-full">
          <Card className="bg-blue-50 border-sky-100 border flex w-full items-center gap-3 pl-3 pr-2 py-1.5 rounded-lg border-solid max-md:max-w-full mb-4">
            <div className="self-stretch flex min-w-60 gap-2 items-center flex-1 shrink basis-8 my-auto max-md:max-w-full">
              <AlertCircle className="h-[18px] w-[18px] text-blue-500" />
              <div className="min-w-60 text-sm text-slate-950 font-medium tracking-[-0.08px] leading-none flex-1 shrink basis-[0%] max-md:max-w-full">
                Activate Your Team Now
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="self-stretch flex min-h-8 items-center gap-2 text-sm text-blue-600 font-medium whitespace-nowrap tracking-[-0.08px] leading-none justify-center my-auto px-3 py-1 rounded-md"
              asChild
            >
              <Link to="/activate-team">
                <span className="self-stretch my-auto">Activate</span>
                <ArrowRightCircle className="h-4 w-4" />
              </Link>
            </Button>
          </Card>
          
          <EventInfo />
          
          <div className="flex w-full flex-col text-base text-slate-500 font-medium justify-center mt-4 px-2 max-md:max-w-full">
            <div className="self-stretch gap-3">Take me to</div>
          </div>
          
          <div className="p-2">
            <EventStats />
          </div>
          
          <Card className="w-full mt-6 border shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">Your Booth</h2>
                  <p className="text-gray-600 mb-4">
                    Booth #242 - Main Exhibition Hall
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Visitors today</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Leads generated</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Meetings booked</span>
                      <span className="font-medium">7</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full">Manage Booth</Button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center border-l pl-4">
                  <div className="mb-3">
                    <QrCode className="h-32 w-32" />
                  </div>
                  <p className="text-sm text-gray-500 text-center mb-2">
                    Scan to download your ticket information
                  </p>
                  <Button variant="outline" size="sm">Download QR Code</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
