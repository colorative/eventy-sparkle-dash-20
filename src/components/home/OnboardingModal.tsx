
"use client"

import { useToast } from "@/hooks/use-toast"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { IntroDisclosure } from "@/components/ui/intro-disclosure"
import { Step1Form } from "@/components/onboarding/Step1Form"
import { Step2Form } from "@/components/onboarding/Step2Form"
import { Step3Interests } from "@/components/onboarding/Step3Interests"
import { Step4Form } from "@/components/onboarding/Step4Form"
import { Step5Confirmation } from "@/components/onboarding/Step5Confirmation"

const onboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  role: z.string().min(1, "Please select your role"),
  industry: z.string().min(1, "Please select an industry"),
  primaryFunction: z.string().min(1, "Please select your primary function"),
  interests: z.record(z.any()).refine(val => Object.keys(val).length > 0, {
    message: "Please select at least one interest.",
  }),
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(),
  countries: z.array(z.string()).min(1, "Please select at least one country"),
})

const steps = [
  {
    title: "Personal Information",
    short_description: "Let's start with the basics.",
    full_description:
      "Provide your personal details to help others connect with you during the event. Your profile picture and name are essential for networking.",
    content: <Step1Form />,
  },
  {
    title: "Personalize Your Profile",
    short_description: "Tell us more about you.",
    full_description:
      "Help us tailor your event experience by providing details about your professional background and goals. This information will help in recommending relevant sessions and connections.",
    content: <Step2Form />,
  },
  {
    title: "Select Your Interests",
    short_description: "What are you passionate about?",
    full_description:
      "Choose topics you are interested in. This will help us connect you with the right people and content. Select as many as you like.",
    content: <Step3Interests />,
  },
  {
    title: "Tell Others About Yourself",
    short_description: "Share your story.",
    full_description:
      "A short bio and your areas of operation can significantly increase your networking opportunities. Let people know who you are and what you do.",
    content: <Step4Form />,
  },
  {
    title: "You're All Set!",
    short_description: "Ready to explore?",
    full_description:
      "You're all set! Explore the floor plans, check the agenda, manage your calendar, and dive into everything AI Summit 2026 has to offer.",
    content: <Step5Confirmation />,
  },
]

interface OnboardingModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function OnboardingModal({ open, setOpen }: OnboardingModalProps) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      jobTitle: "",
      interests: {},
      bio: "",
      countries: [],
    },
  })

  const onSubmit = (data: z.infer<typeof onboardingSchema>) => {
    console.log("Onboarding data submitted:", data)
    toast({ title: "Welcome!", description: "Onboarding completed successfully" })
    setOpen(false)
    localStorage.setItem("feature_ai-summit-onboarding-v2", JSON.stringify(false))
  }

  return (
    <FormProvider {...form}>
      <IntroDisclosure
        open={open}
        setOpen={setOpen}
        steps={steps}
        featureId="ai-summit-onboarding-v2"
        showProgressBar={true}
        onComplete={form.handleSubmit(onSubmit, (errors) => {
          console.log("Onboarding form errors:", errors)
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Please check the form for errors before completing.",
          })
        })}
        onSkip={() => {
          toast({ title: "Skipped", description: "You can complete your profile anytime from settings." })
          setOpen(false)
        }}
      />
    </FormProvider>
  )
}
