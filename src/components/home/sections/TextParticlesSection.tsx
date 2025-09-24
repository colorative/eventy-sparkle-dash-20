
import React from "react";
import { TextParticle } from "@/components/ui/text-particle";

export const TextParticlesSection: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-2">
      <div className="h-24 w-full overflow-hidden">
        <TextParticle 
          text="Ai Summit 2026" 
          fontSize={92} 
          particleColor="#6b7280" 
          particleSize={1} 
          particleDensity={5} 
          textAlign="left"
        />
      </div>
      <div className="h-24 w-full overflow-hidden">
        <TextParticle 
          text="San Francisco" 
          fontSize={92} 
          particleColor="#6b7280" 
          particleSize={1} 
          particleDensity={5} 
          textAlign="left"
        />
      </div>
    </div>
  );
};
