
import React from "react";
import { LoginForm } from "@/components/login-form";
import { BackgroundPaths } from "@/components/ui/background-paths";

const Login = () => {
  return (
    <div className="relative min-h-screen">
      {/* Animated background */}
      <div className="absolute inset-0">
        <BackgroundPaths title="" />
      </div>
      
      {/* Login form overlay */}
      <div className="relative z-20 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
