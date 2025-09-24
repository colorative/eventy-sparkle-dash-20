
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ExhibitorData {
  id: string;
  name: string;
  boothNumber: string;
  bgColor: string;
  logo: string;
  categories?: string[];
  industry?: string;
}

interface ExhibitorCardProps {
  exhibitor: ExhibitorData;
  viewMode: "grid" | "list";
}

const ExhibitorCard: React.FC<ExhibitorCardProps> = ({
  exhibitor,
  viewMode,
}) => {
  const { id, name, boothNumber, bgColor, logo, categories } = exhibitor;
  
  if (viewMode === "grid") {
    return (
      <Link to={`/exhibitors/${id}`} className="block h-full transition-transform hover:scale-[1.01]">
        <div className="flex flex-col overflow-hidden h-full">
          <div
            className="aspect-square rounded-lg flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <div className="text-white text-4xl md:text-5xl font-bold">{logo}</div>
          </div>
          <div className="mt-2">
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-slate-500">Booth {boothNumber}</p>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link to={`/exhibitors/${id}`} className="block w-full transition-transform hover:scale-[1.01]">
        <div className="flex items-center p-3 border rounded-lg mb-2 bg-white dark:bg-white">
          <div
            className="h-16 w-16 rounded-md flex items-center justify-center mr-4 flex-shrink-0"
            style={{ backgroundColor: bgColor }}
          >
            <div className="text-white text-xl font-bold">{logo}</div>
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-slate-500">Booth {boothNumber}</p>
            </div>
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {categories.slice(0, 3).map((category, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-slate-50">
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }
};

interface AllExhibitorsProps {
  viewMode: "grid" | "list";
  searchQuery: string;
}

export const AllExhibitors: React.FC<AllExhibitorsProps> = ({
  viewMode,
  searchQuery,
}) => {
  const exhibitors: ExhibitorData[] = [
    {
      id: "alphacore",
      name: "Alphacore",
      boothNumber: "242",
      bgColor: "#0a4a87",
      logo: "α",
      categories: ["Technology", "Software"],
      industry: "Information Technology",
    },
    {
      id: "mindmesh",
      name: "Mind Mesh",
      boothNumber: "242",
      bgColor: "#5e35b1",
      logo: "⦿",
      categories: ["AI", "Machine Learning"],
      industry: "Artificial Intelligence",
    },
    {
      id: "collekt",
      name: "Collekt Payments",
      boothNumber: "242",
      bgColor: "#2c1a4d",
      logo: "C",
      categories: ["Fintech", "Payments"],
      industry: "Financial Services",
    },
    {
      id: "fluidicons",
      name: "Fluid Icons",
      boothNumber: "242",
      bgColor: "#1976d2",
      logo: "f",
      categories: ["Design", "UI/UX"],
      industry: "Creative Services",
    },
    {
      id: "kinetica",
      name: "Kinetica",
      boothNumber: "242",
      bgColor: "#ff6d00",
      logo: "K",
      categories: ["Data Analytics", "Visualization"],
      industry: "Information Technology",
    },
    {
      id: "seasmepay",
      name: "Seasme Pay",
      boothNumber: "242",
      bgColor: "#00c853",
      logo: "≡",
      categories: ["Fintech", "Mobile Payments"],
      industry: "Financial Services",
    },
    {
      id: "blink",
      name: "Blink",
      boothNumber: "242",
      bgColor: "#03a9f4",
      logo: "B",
      categories: ["IoT", "Smart Home"],
      industry: "Electronics",
    },
    {
      id: "arnaborg",
      name: "Arnaborg",
      boothNumber: "242",
      bgColor: "#26418f",
      logo: "♣",
      categories: ["Security", "Blockchain"],
      industry: "Cybersecurity",
    },
    {
      id: "xiphos",
      name: "Xiphos",
      boothNumber: "242",
      bgColor: "#ff7043",
      logo: "X",
      categories: ["Hardware", "AI"],
      industry: "Electronics",
    },
    {
      id: "neonwave",
      name: "Neon Wave",
      boothNumber: "242",
      bgColor: "#6a00ff",
      logo: "ᐧᐧᐧ",
      categories: ["Gaming", "AR/VR"],
      industry: "Entertainment",
    },
    {
      id: "orbit",
      name: "Orbit",
      boothNumber: "242",
      bgColor: "#424242",
      logo: "○",
      categories: ["Data Storage", "Cloud"],
      industry: "Information Technology",
    },
    {
      id: "nexus",
      name: "Nexus",
      boothNumber: "242",
      bgColor: "#1565c0",
      logo: "⋮⋮",
      categories: ["Networking", "Infrastructure"],
      industry: "Telecommunications",
    },
  ];

  const filteredExhibitors = exhibitors.filter((exhibitor) => {
    // Search filter
    return exhibitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibitor.boothNumber.includes(searchQuery);
  });

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          : "flex flex-col gap-2"
      }
    >
      {filteredExhibitors.map((exhibitor, index) => (
        <ExhibitorCard key={index} exhibitor={exhibitor} viewMode={viewMode} />
      ))}
    </div>
  );
};
