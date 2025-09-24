
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import Banner from "@/components/gamification/Banner";
import ProfileSection from "@/components/gamification/ProfileSection";
import Challenges from "@/components/gamification/Challenges";
import LeaderboardTab from "@/components/gamification/Leaderboard";

const Gamification = () => {
  return (
    <PageLayout>
      <div className="container max-w-7xl mx-auto p-4">
        <Banner />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileSection />
            <Challenges />
          </div>
          
          <div className="lg:col-span-1">
            <LeaderboardTab />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Gamification;
