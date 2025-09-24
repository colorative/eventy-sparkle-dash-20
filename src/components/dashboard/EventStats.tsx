import React from "react";
import { StatCard } from "./StatCard";

export const EventStats: React.FC = () => {
  const stats = [
    {
      value: 7,
      label: "Interested in Me",
      icon: "https://cdn.builder.io/api/v1/image/assets/4f5dcc361c1f41d3969c5785002c7d1e/53bf31679b42c4da6f3d840ac99198ae5f021637?placeholderIfAbsent=true",
    },
    {
      value: 0,
      label: "Pending Meetings",
      icon: "https://cdn.builder.io/api/v1/image/assets/4f5dcc361c1f41d3969c5785002c7d1e/1019b8a9fe99516f365af1f531f4f6c6798d7fba?placeholderIfAbsent=true",
    },
    {
      value: 24,
      label: "Total Leads",
      icon: "https://cdn.builder.io/api/v1/image/assets/4f5dcc361c1f41d3969c5785002c7d1e/53bf31679b42c4da6f3d840ac99198ae5f021637?placeholderIfAbsent=true",
    },
    {
      value: 236,
      label: "Our Exhibitors",
      icon: "https://cdn.builder.io/api/v1/image/assets/4f5dcc361c1f41d3969c5785002c7d1e/53bf31679b42c4da6f3d840ac99198ae5f021637?placeholderIfAbsent=true",
    },
    {
      value: 2145,
      label: "Attendees",
      icon: "https://cdn.builder.io/api/v1/image/assets/4f5dcc361c1f41d3969c5785002c7d1e/1019b8a9fe99516f365af1f531f4f6c6798d7fba?placeholderIfAbsent=true",
    },
    {
      value: 71,
      label: "Recommended for Me",
      icon: "https://cdn.builder.io/api/v1/image/assets/4f5dcc361c1f41d3969c5785002c7d1e/53bf31679b42c4da6f3d840ac99198ae5f021637?placeholderIfAbsent=true",
    },
  ];

  return (
    <div className="w-full mt-3 max-md:max-w-full">
      <div className="flex w-full items-center gap-3 flex-wrap max-md:max-w-full">
        {stats.slice(0, 3).map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="flex w-full items-center gap-3 flex-wrap mt-3 max-md:max-w-full">
        {stats.slice(3).map((stat, index) => (
          <StatCard key={index + 3} {...stat} />
        ))}
      </div>
    </div>
  );
};
