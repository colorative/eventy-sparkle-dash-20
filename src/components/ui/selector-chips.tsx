
"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type SelectorChipsProps = {
  options: string[];
  onChange?: (selected: string[]) => void;
  onMoreClick?: () => void;
};

const SelectorChips: React.FC<SelectorChipsProps> = ({
  options,
  onChange,
  onMoreClick
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleChip = (option: string) => {
    if (option === "More" && onMoreClick) {
      onMoreClick();
      return;
    }
    
    const updated = selected.includes(option) 
      ? selected.filter(o => o !== option) 
      : [...selected, option];
    setSelected(updated);
    onChange?.(updated);
  };

  return (
    <div className="flex flex-wrap gap-2 w-full bg-background">
      {options.map(option => {
        const isSelected = selected.includes(option);
        const isMoreButton = option === "More";
        
        return (
          <motion.button
            key={option}
            onClick={() => toggleChip(option)}
            initial={false}
            animate={{
              backgroundColor: isMoreButton 
                ? "#f9fafb" 
                : isSelected ? "hsl(var(--primary))" : "#fff",
              borderColor: isMoreButton
                ? "#d1d5db"
                : isSelected ? "hsl(var(--primary))" : "#d1d5db",
              transition: {
                backgroundColor: { duration: 0.15 },
                borderColor: { duration: 0.15 }
              }
            }}
            className={`flex items-center justify-center px-3 py-1.5 rounded-full text-sm font-medium border transition overflow-hidden cursor-pointer dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 ${
              isMoreButton 
                ? "text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700" 
                : isSelected 
                  ? "text-white" 
                  : "text-gray-900"
            }`}
            style={{ minWidth: 80 }}
          >
            <div className="flex items-center w-full justify-center relative">
              <span className="mx-auto">{option}</span>
              {isMoreButton ? (
                <ArrowRight className="h-4 w-4 ml-2" />
              ) : (
                <motion.span
                  animate={{
                    width: isSelected ? 16 : 0,
                    marginLeft: isSelected ? 6 : 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden"
                  }}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        key="tick"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 20
                        }}
                        style={{ pointerEvents: "none" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                          <motion.path
                            d="M5 10.5L9 14.5L15 7.5"
                            stroke="#fff"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.25 }}
                          />
                        </svg>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export { SelectorChips };
