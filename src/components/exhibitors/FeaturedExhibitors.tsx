
import React, { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface FeaturedExhibitorProps {
  id: string;
  name: string;
  boothNumber: string;
  logo: string;
  bgColor: string;
  logoColor: string;
  isSponsor?: boolean;
}

const FeaturedExhibitor: React.FC<FeaturedExhibitorProps> = ({
  id,
  name,
  boothNumber,
  logo,
  bgColor,
  logoColor,
  isSponsor = false,
}) => {
  return (
    <Link 
      to={`/exhibitors/${id}`}
      className="block min-w-[300px] h-full cursor-pointer transition-transform hover:scale-[1.01]"
    >
      <div className="relative h-full">
        <div
          className="w-full aspect-[2/1] rounded-t-lg flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          {isSponsor && (
            <Badge className="absolute top-3 right-3 bg-amber-500">
              Sponsor
            </Badge>
          )}
          <div className="text-2xl md:text-3xl font-bold" style={{ color: logoColor }}>
            {logo}
          </div>
        </div>
        <div className="bg-white p-4 rounded-b-lg border border-t-0 border-slate-200 flex items-center h-[76px]">
          <div className="bg-slate-100 h-12 w-12 rounded-md flex items-center justify-center text-lg font-bold mr-3">
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-slate-500">Booth {boothNumber}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const FeaturedExhibitors: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const featuredExhibitors = [
    {
      id: "spectrum",
      name: "Spectrum",
      boothNumber: "242",
      logo: "Spectrum",
      bgColor: "#000",
      logoColor: "#00ffff",
      isSponsor: true,
    },
    {
      id: "andromo",
      name: "Andromo",
      boothNumber: "242",
      logo: "Andromo",
      bgColor: "#15216d",
      logoColor: "#3db5ff",
      isSponsor: true,
    },
    {
      id: "colab",
      name: "CōLab",
      boothNumber: "242",
      logo: "CōLab",
      bgColor: "#024b46",
      logoColor: "#ffffff",
    },
    {
      id: "nuage",
      name: "Nuage",
      boothNumber: "242",
      logo: "Nuage",
      bgColor: "#072693",
      logoColor: "#34f5ff",
    },
    {
      id: "nextech",
      name: "NexTech",
      boothNumber: "118",
      logo: "NT",
      bgColor: "#6a1b9a",
      logoColor: "#ffffff",
    },
    {
      id: "dataflow",
      name: "Dataflow",
      boothNumber: "156",
      logo: "→",
      bgColor: "#0277bd",
      logoColor: "#ffffff",
    },
    {
      id: "quantacore",
      name: "QuantaCore",
      boothNumber: "210",
      logo: "Q",
      bgColor: "#d84315",
      logoColor: "#ffffff",
    },
    {
      id: "synapse",
      name: "Synapse AI",
      boothNumber: "183",
      logo: "S",
      bgColor: "#00695c",
      logoColor: "#ffffff",
    },
  ];

  return (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide -mx-1 px-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {featuredExhibitors.map((exhibitor, index) => (
          <div key={index} className="flex-shrink-0 w-[300px]">
            <FeaturedExhibitor {...exhibitor} />
          </div>
        ))}
      </div>
      <style>
        {`.scrollbar-hide::-webkit-scrollbar {
          display: none;
        }`}
      </style>
    </div>
  );
};
