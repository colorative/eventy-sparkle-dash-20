
import * as React from "react"

export interface Step {
  title: string
  short_description: string
  full_description: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  media?: {
    type: "image" | "video"
    src: string
    alt?: string
  }
  content?: React.ReactNode
}

export interface FeatureDisclosureProps {
  steps: Step[]
  featureId: string
  onComplete?: () => void
  onSkip?: () => void
  showProgressBar?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  forceVariant?: "mobile" | "desktop"
}

export interface StepContentProps {
  steps: Step[]
  currentStep: number
  onSkip: () => void
  onNext: () => void
  onPrevious: () => void
  hideFeature: () => void
  completedSteps: number[]
  onStepSelect: (index: number) => void
  direction: 1 | -1
  isDesktop: boolean
  stepRef: React.RefObject<HTMLButtonElement>
}
