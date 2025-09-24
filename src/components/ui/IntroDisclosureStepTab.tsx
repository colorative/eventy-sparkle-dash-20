
import * as React from "react"
import { motion } from "framer-motion"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Step } from "./intro-disclosure.types"
import { fadeInScale, hoverScale } from "./intro-disclosure.animations"

interface StepTabProps {
  step: Step
  isActive: boolean
  onClick: () => void
  isCompleted: boolean
}

export function IntroDisclosureStepTab({ step, isActive, onClick, isCompleted }: StepTabProps) {
  return (
    <motion.button
      {...hoverScale}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start rounded-lg px-4 py-2 text-left transition-colors w-full",
        isActive ? "bg-muted border border-border" : "hover:bg-muted/70",
        "relative",
      )}
      aria-current={isActive ? "step" : undefined}
      aria-label={`${step.title}${isCompleted ? " (completed)" : ""}`}
    >
      <div className="mb-1 text-sm font-medium">{step.title}</div>
      <div className="text-xs hidden md:block text-muted-foreground line-clamp-2">{step.short_description}</div>
      {isCompleted && (
        <motion.div {...fadeInScale} className="absolute right-2 top-2">
          <div className="rounded-full bg-primary p-1">
            <CheckIcon className="w-2 h-2 text-primary-foreground" />
          </div>
        </motion.div>
      )}
    </motion.button>
  )
}
