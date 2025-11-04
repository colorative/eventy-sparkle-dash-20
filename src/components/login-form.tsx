
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("example@email.com");
  const [password, setPassword] = useState("admin");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setTermsError("");
    
    if (!termsAccepted) {
      setTermsError("You must accept the terms and conditions to continue");
      return;
    }
    
    setStep(2);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 2-second delay before navigation
    setTimeout(() => {
      setIsLoading(false);
      navigate("/home");
    }, 2000);
  };

  const handleContactOrganizer = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real app, this would open a contact form or email client
    alert("Contact event organizer functionality would be implemented here.");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <img
              src="/lovable-uploads/f3a6544b-2304-40a7-b580-54f250614975.png"
              alt="AI Summit 2026"
              className="h-20 object-contain"
            />
          </div>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            {step === 1 
              ? "Enter your email below to login to your account"
              : "Enter your passcode to continue"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <form onSubmit={handleContinue}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => {
                        setTermsAccepted(checked as boolean);
                        setTermsError("");
                      }}
                      className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-normal cursor-pointer"
                      >
                        I accept the terms and conditions
                      </Label>
                    </div>
                  </div>
                  {termsError && (
                    <p className="text-sm text-destructive">{termsError}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Need help?{" "}
                <a 
                  href="#" 
                  onClick={handleContactOrganizer}
                  className="underline underline-offset-4"
                >
                  Contact Event Organizer
                </a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="password">Passcode</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    placeholder="Enter your passcode"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Need help?{" "}
                <a 
                  href="#" 
                  onClick={handleContactOrganizer}
                  className="underline underline-offset-4"
                >
                  Contact Event Organizer
                </a>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
