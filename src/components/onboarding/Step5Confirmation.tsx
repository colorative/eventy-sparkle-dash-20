
import { CheckCircle2 } from "lucide-react"

export function Step5Confirmation() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-xl font-bold mb-2">You're All Set!</h2>
      <p className="text-sm text-muted-foreground">
        Thank you for setting up your profile. You're ready to make the most of AI Summit 2026. Enjoy the event!
      </p>
    </div>
  )
}
