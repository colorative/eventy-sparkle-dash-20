
"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const MorphingPopover = PopoverPrimitive.Root;

const MorphingPopoverTrigger = PopoverPrimitive.Trigger;

const MorphingPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <AnimatePresence>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn("z-50 outline-none", className)}
        asChild
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </PopoverPrimitive.Content>
    </AnimatePresence>
  </PopoverPrimitive.Portal>
));

MorphingPopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent };
