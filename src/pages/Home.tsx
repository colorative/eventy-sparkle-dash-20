
import React, { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { HomeContent } from "@/components/home/HomeContent";
import { OnboardingModal } from "@/components/home/OnboardingModal";

const Home = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem("ai-summit-onboarding");
    if (!hasSeenOnboarding || hasSeenOnboarding !== "false") {
      // Small delay to ensure page loads smoothly before showing modal
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <PageLayout>
      <HomeContent />
      <OnboardingModal 
        open={showOnboarding} 
        setOpen={setShowOnboarding} 
      />
    </PageLayout>
  );
};

export default Home;
