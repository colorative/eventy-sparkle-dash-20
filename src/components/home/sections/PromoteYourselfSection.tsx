
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { BannerGeneratorModal } from "../components/BannerGeneratorModal";

export const PromoteYourselfSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Promote Yourself</h2>
      <Card className="overflow-hidden">
        {/* Main Content */}
        <div className="flex items-center gap-6 p-6">
          {/* Square Image Section with Border Beam and Animation */}
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Professional person portrait"
                className="w-full h-full object-cover rounded-md"
              />
              <motion.div
                className="absolute top-0 left-0 size-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                style={{ willChange: 'transform' }}
              />
              <BorderBeam size={120} duration={12} delay={0} />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Promote Yourself
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
              Quickly promote yourself on social media with our pre-made banners, 
              just a few clicks away.
            </p>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Get Banners
            </Button>
          </div>
        </div>
      </Card>

      <BannerGeneratorModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  );
};
