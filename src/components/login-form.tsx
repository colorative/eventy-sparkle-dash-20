
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
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("example@email.com");
  const [password, setPassword] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 2-second delay before navigation
    setTimeout(() => {
      setIsLoading(false);
      navigate("/home");
    }, 2000);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    // Simple alert for now - in a real app this would open a modal or navigate to reset page
    alert("Password reset functionality would be implemented here. Please contact the event organizer for assistance.");
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
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    onClick={handleForgotPassword}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
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
              <Button variant="outline" className="w-full" disabled={isLoading}>
                Login with SSO
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
        </CardContent>
      </Card>
    </div>
  )
}
