
import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would handle signout logic
    // Clear auth tokens, etc.
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000); // Auto-redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">You've been signed out</CardTitle>
          <CardDescription>
            Thank you for using the AI Summit 2026 Exhibitor Portal
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center p-6">
          <div className="mb-6 flex justify-center">
            <img
              src="/lovable-uploads/f3a6544b-2304-40a7-b580-54f250614975.png"
              alt="AI Summit 2026"
              className="h-16 object-contain"
            />
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            You have successfully signed out of your account. 
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Redirecting you to the login page...
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            className="w-full" 
            onClick={() => navigate("/login")}
          >
            Sign In Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signout;
