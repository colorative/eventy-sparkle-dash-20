
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarClock, Map } from "lucide-react";
import { Link } from "react-router-dom";

export const EventInfo: React.FC = () => {
  return <div className="bg-white flex w-full items-center gap-6 overflow-hidden flex-wrap p-0 max-md:max-w-full">
      <div className="flex w-full items-center gap-6 px-0 py-0">
        <div className="self-stretch min-w-60 w-[430px] my-auto">
          <img src="https://cdn.builder.io/api/v1/image/assets/4f5dcc361c1f41d3969c5785002c7d1e/671e1fb233dad8933d568aa0cbc0ecf0d24f93a7?placeholderIfAbsent=true" className="aspect-[1.86] object-contain w-full rounded-md" alt="Event" />
        </div>
        <div className="self-stretch min-w-60 flex-1 shrink basis-[0%] my-auto">
          <div className="w-full">
            <div>
              <h1 className="text-gray-950 text-xl font-semibold">
                AI Summit 2026
              </h1>
              <div className="text-slate-500 text-sm font-normal mt-1.5">
                Dec 24, 2026 - Dec 31, 2026
              </div>
            </div>
            <p className="text-slate-800 text-sm font-normal leading-[18px] mt-2">
              The premier event bringing together industry leaders, innovators,
              and AI enthusiasts to explore the latest advancements, trends, and
              real-world applications of artificial intelligence. Join us for
              insightful keynotes, expert panels, and hands-on demos shaping the
              future of AI.
            </p>
            <div className="mt-4 flex gap-3">
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <Link to="/schedule">
                  <CalendarClock className="h-4 w-4" />
                  <span>View Schedule</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <Link to="/floorplan">
                  <Map className="h-4 w-4" />
                  <span>Explore Venue</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
