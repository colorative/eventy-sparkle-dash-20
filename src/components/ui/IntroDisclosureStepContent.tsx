
import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ExternalLinkIcon } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { type Step, type StepContentProps } from "./intro-disclosure.types"
import { slideInOut } from "./intro-disclosure.animations"
import { IntroDisclosureStepTab } from "./IntroDisclosureStepTab"

export function IntroDisclosureStepContent({
  steps,
  currentStep,
  onSkip,
  onNext,
  onPrevious,
  hideFeature,
  completedSteps,
  onStepSelect,
  direction,
  isDesktop,
  stepRef,
}: StepContentProps) {
  const [skipNextTime, setSkipNextTime] = React.useState(false)

  const renderActionButton = React.useCallback((action: Step["action"]) => {
    if (!action) return null

    if (action.href) {
      return (
        <Button asChild className="w-full" size="sm" variant="link">
          <a href={action.href} target="_blank" rel="noopener noreferrer">
            <span className="flex items-center gap-2">
              {action.label}
              <ExternalLinkIcon className="w-4 h-4" />
            </span>
          </a>
        </Button>
      )
    }

    return (
      <Button className="w-full rounded-full" size="sm" variant="secondary" onClick={action.onClick}>
        {action.label}
      </Button>
    )
  }, [])

  const handleNextWithSkip = React.useCallback(() => {
    if (skipNextTime) {
      hideFeature()
    }
    onNext()
  }, [skipNextTime, hideFeature, onNext])

  return (
    <div className="flex h-full flex-col max-w-3xl mx-auto">
      {isDesktop && (
        <div className="flex-1 px-2 py-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="space-y-2 flex flex-col justify-center items-center px-1"
          >
            {steps.map((step, index) => (
              <IntroDisclosureStepTab
                key={index}
                step={step}
                isActive={currentStep === index}
                onClick={() => onStepSelect(index)}
                isCompleted={completedSteps.includes(index)}
              />
            ))}
          </motion.div>
        </div>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={currentStep} {...slideInOut(direction)} className="mt-6 space-y-4">
          {!isDesktop && steps[currentStep]?.media && (
            <AspectRatio ratio={16 / 9} className="lg:overflow-hidden rounded-lg bg-muted">
              {steps[currentStep]?.media?.type === "image" ? (
                <img
                  src={steps[currentStep]?.media?.src || "/placeholder.svg"}
                  alt={steps[currentStep]?.media?.alt || ""}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video src={steps[currentStep]?.media?.src} controls className="h-full w-full object-cover" />
              )}
            </AspectRatio>
          )}

          {steps[currentStep]?.action ? (
            <div className="px-2">{renderActionButton(steps[currentStep]?.action)}</div>
          ) : (
            <div className="h-10" />
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pr-4">
            <Button variant="ghost" onClick={onSkip} className="text-muted-foreground hover:bg-card rounded-full">
              Skip this Step
            </Button>
            <div className="space-x-2">
              {currentStep > 0 && (
                <Button onClick={onPrevious} size="sm" variant="ghost" className="rounded-full hover:bg-transparent">
                  Previous
                </Button>
              )}
              <Button onClick={handleNextWithSkip} size="sm" ref={stepRef} className="rounded-full">
                {currentStep === steps.length - 1 ? "Done" : "Next"}
              </Button>
            </div>
          </div>
          {/* Don't show again checkbox */}
          <div className="flex items-center space-x-2 pb-4 px-4">
            <Checkbox
              id="skipNextTime"
              checked={skipNextTime}
              onCheckedChange={(checked) => setSkipNextTime(checked as boolean)}
            />
            <label htmlFor="skipNextTime" className="text-sm text-muted-foreground">
              Don't show this again
            </label>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
