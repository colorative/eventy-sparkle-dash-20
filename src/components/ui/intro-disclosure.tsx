
"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Stepper, StepperIndicator, StepperItem, StepperSeparator, StepperTrigger } from "@/components/ui/stepper";
import { useMediaQuery, useFeatureVisibility, useSwipe } from "./intro-disclosure.hooks";
import { IntroDisclosureStepPreview } from "./IntroDisclosureStepPreview";
import { IntroDisclosureStepContent } from "./IntroDisclosureStepContent";
import { IntroDisclosureStepTab } from "./IntroDisclosureStepTab";
import type { FeatureDisclosureProps } from "./intro-disclosure.types";
import { X } from "lucide-react";

export function IntroDisclosure({
  steps,
  open,
  setOpen,
  featureId,
  onComplete,
  onSkip,
  showProgressBar = true,
  forceVariant
}: FeatureDisclosureProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([0]);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const isDesktopQuery = useMediaQuery("(min-width: 768px)");
  const isDesktop = forceVariant ? forceVariant === "desktop" : isDesktopQuery;
  const {
    isVisible,
    hideFeature
  } = useFeatureVisibility(featureId);
  const stepRef = React.useRef<HTMLButtonElement>(null);
  
  React.useEffect(() => {
    if (!isVisible) {
      setOpen(false);
    }
  }, [isVisible, setOpen]);
  
  React.useEffect(() => {
    if (open && stepRef.current) {
      stepRef.current.focus();
    }
  }, [open, currentStep]);

  const handleClose = React.useCallback(() => {
    setOpen(false);
    localStorage.setItem("ai-summit-onboarding", "false");
  }, [setOpen]);

  const handleNext = React.useCallback(() => {
    setDirection(1);
    setCompletedSteps(prev => prev.includes(currentStep) ? prev : [...prev, currentStep]);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
      onComplete?.();
    }
  }, [currentStep, steps.length, setOpen, onComplete]);
  
  const handlePrevious = React.useCallback(() => {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);
  
  const handleSkipStep = React.useCallback(() => {
    handleNext();
  }, [handleNext]);
  
  const handleStepSelect = React.useCallback((index: number) => {
    setDirection(index > currentStep ? 1 : -1);
    setCompletedSteps(prev => {
      const newCompletedSteps = new Set(prev);
      if (index > currentStep) {
        for (let i = currentStep; i <= index; i++) {
          newCompletedSteps.add(i);
        }
      }
      return Array.from(newCompletedSteps);
    });
    setCurrentStep(index);
  }, [currentStep]);
  
  const handleSwipe = React.useCallback((swipeDirection: "left" | "right") => {
    if (swipeDirection === "left") {
      handleNext();
    } else {
      handlePrevious();
    }
  }, [handleNext, handlePrevious]);
  
  const {
    handleDragEnd
  } = useSwipe(handleSwipe);
  
  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      handleNext();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      handlePrevious();
    }
  }, [handleNext, handlePrevious]);

  if (!isVisible || !open) {
    return null;
  }
  
  return <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-full max-h-full h-screen w-screen p-0 gap-0 m-0 overflow-hidden" onKeyDown={handleKeyDown}>
        <DialogHeader className="sr-only">
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>
        
        {/* Top-right close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="h-full flex flex-col">
          {/* Header with Step Title, Description, and Stepper - consistent width */}
          <div className="flex-shrink-0 bg-white pt-6 px-6">
            <div className="max-w-2xl mx-auto">
              {/* Step Title and Description */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">{steps[currentStep]?.title}</h2>
                <p className="text-gray-600">{steps[currentStep]?.full_description}</p>
              </div>
              
              {/* Stepper Component */}
              <div className="flex justify-center mb-6">
                <Stepper value={currentStep} onValueChange={handleStepSelect} className="w-full max-w-md">
                  {steps.map((step, index) => <StepperItem key={index} step={index} completed={completedSteps.includes(index)} className="[&:not(:last-child)]:flex-1">
                      <StepperTrigger>
                        <StepperIndicator className="size-4 data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:bg-transparent [&_span]:sr-only [&_svg]:size-3" />
                      </StepperTrigger>
                      {index < steps.length - 1 && <StepperSeparator />}
                    </StepperItem>)}
                </Stepper>
              </div>

              {/* Page Title */}
              <div className="text-center">
                
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full max-w-2xl mx-auto p-8 flex flex-col">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={currentStep} initial={{
                opacity: 0,
                x: direction > 0 ? 100 : -100
              }} animate={{
                opacity: 1,
                x: 0
              }} exit={{
                opacity: 0,
                x: direction > 0 ? -100 : 100
              }} transition={{
                duration: 0.3,
                ease: "easeInOut"
              }} className="h-full flex flex-col">
                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto">
                    {steps[currentStep]?.content && <div className="max-w-2xl mx-auto">
                        {steps[currentStep]?.content}
                      </div>}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Fixed Footer Navigation - consistent width */}
          <div className="bg-white p-6 flex-shrink-0">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={handleSkipStep} className="text-gray-500 hover:text-gray-700">
                  Skip this Step
                </Button>
                <div className="flex items-center gap-4">
                  {currentStep > 0 && <Button onClick={handlePrevious} variant="outline">
                      Previous
                    </Button>}
                  <Button onClick={handleNext} ref={stepRef} className="bg-blue-600 hover:bg-blue-700">
                    {currentStep === steps.length - 1 ? "Complete" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}
export default IntroDisclosure;
