
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { EventInfo } from "@/components/dashboard/EventInfo";
import { Alerts } from "./components/Alerts";
import { BoothCard } from "./components/BoothCard";
import { TeamCard } from "./components/TeamCard";
import { TaskList } from "./components/TaskList";
import { TicketsList } from "./components/TicketsList";
import { Stats } from "./components/Stats";
import { StoriesSection } from "./sections/StoriesSection";
import { QuicklinksSection } from "./sections/QuicklinksSection";
import { SuggestedContactsSection } from "./sections/SuggestedContactsSection";
import { SchedulesSection } from "./sections/SchedulesSection";
import { SpeakersSection } from "./sections/SpeakersSection";
import { CompleteProfileSection } from "./sections/CompleteProfileSection";
import { InterestsSection } from "./sections/InterestsSection";
import { MessagesSection } from "./sections/MessagesSection";
import { PromoteYourselfSection } from "./sections/PromoteYourselfSection";
import { ExhibitorsSection } from "./sections/ExhibitorsSection";
import { MapsSection } from "./sections/MapsSection";
import { SocialFeedSection } from "./sections/SocialFeedSection";
import { NewsSection } from "./sections/NewsSection";
import { SponsorsSection } from "./sections/SponsorsSection";
import { CountdownSection } from "./sections/CountdownSection";
import { GamificationSection } from "./sections/GamificationSection";
import { AdsSection } from "./sections/AdsSection";
import { TextParticlesSection } from "./sections/TextParticlesSection";

interface Task {
  id: string;
  label: string;
  completed: boolean;
  dueDate?: string;
  assignedTo?: Array<{
    id: string;
    name: string;
  }>;
  type: 'redirect' | 'agreement' | 'upload' | 'simple';
  redirectUrl?: string;
}

export const HomeContent: React.FC = () => {
  const [showTeamAlert, setShowTeamAlert] = useState(true);
  const [showProfileAlert, setShowProfileAlert] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([{
    id: "task-4",
    label: "Sign Booth Agreement",
    completed: false,
    dueDate: "Dec 15, 2024",
    type: "agreement",
    assignedTo: [{ id: "1", name: "Sarah Connor" }]
  }, {
    id: "task-6",
    label: "Upload Booth Graphics",
    completed: false,
    dueDate: "Dec 20, 2024",
    type: "upload",
    assignedTo: [{ id: "1", name: "Sarah Connor" }, { id: "3", name: "Alex Kim" }]
  }, {
    id: "task-10",
    label: "Submit Company Logo",
    completed: true,
    dueDate: "Dec 10, 2024",
    type: "upload",
    assignedTo: [{ id: "1", name: "Sarah Connor" }]
  }, {
    id: "task-12",
    label: "Prepare Marketing Materials",
    completed: false,
    dueDate: "Dec 25, 2024",
    type: "upload",
    assignedTo: [{ id: "2", name: "John Doe" }]
  }, {
    id: "task-1",
    label: "Complete Your Profile",
    completed: true,
    type: "simple"
  }, {
    id: "task-2",
    label: "Add Products (0/3)",
    completed: false,
    type: "simple"
  }, {
    id: "task-3",
    label: "Add Team Members",
    completed: true,
    type: "simple"
  }, {
    id: "task-5",
    label: "Manage Availability",
    completed: false,
    type: "simple"
  }, {
    id: "task-7",
    label: "Set Meeting Preferences",
    completed: false,
    type: "simple"
  }, {
    id: "task-8",
    label: "Review Event Schedule",
    completed: false,
    type: "simple"
  }]);

  const teamMembers = [{
    name: "Sarah Connor",
    role: "Marketing",
    status: "active",
    avatar: "SC"
  }, {
    name: "John Doe",
    role: "Sales",
    status: "pending",
    avatar: "JD"
  }, {
    name: "Alex Kim",
    role: "Tech",
    status: "active",
    avatar: "AK"
  }];

  const tickets = [{
    id: "T-1001",
    name: "AI Summit 2026 - VIP Pass",
    type: "VIP",
    date: "Jul 10-12, 2026",
    location: "Moscone Center, San Francisco",
    holder: "Sarah Connor",
    price: "$1,299",
    qrCode: "https://scanapp.org/assets/github_assets/qr-code.png",
    color: "bg-gradient-to-r from-indigo-500 to-purple-600"
  }, {
    id: "T-1002",
    name: "AI Summit Workshop Pass",
    type: "Workshop",
    date: "Jul 9, 2026",
    location: "Moscone Center, San Francisco",
    holder: "Sarah Connor",
    price: "$499",
    qrCode: "https://scanapp.org/assets/github_assets/qr-code.png",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500"
  }];

  const boothDetails = {
    boothNumber: "A-42",
    location: "Hall B, North Entrance",
    size: "10x10",
    representatives: teamMembers.filter(member => member.status === "active").length
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => task.id === taskId ? {
      ...task,
      completed: !task.completed
    } : task));
  };

  const generateQrCode = () => {
    alert("QR code downloaded successfully!");
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex min-w-60 flex-col overflow-auto items-stretch justify-start flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      {/* Fixed-width container with responsive behavior */}
      <div className="w-full max-w-[1024px] mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome to AI Summit 2026</h1>
        
        <div className="space-y-6">
          <Alerts
            showTeamAlert={showTeamAlert}
            showProfileAlert={showProfileAlert}
            onHideTeamAlert={() => setShowTeamAlert(false)}
            onHideProfileAlert={() => setShowProfileAlert(false)}
          />
          
          <div className="px-0 py-0">
            <EventInfo />
          </div>
          
          {/* Stories Section */}
          <StoriesSection />
          
          {/* Quick Links Section - added after Stories */}
          <QuicklinksSection />
          
          {/* Countdown Timer Section - added after Quick Links */}
          <CountdownSection />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BoothCard
                boothDetails={boothDetails}
                teamMembers={teamMembers}
                onGenerateQrCode={generateQrCode}
              />
            </div>
            <div>
              <TeamCard teamMembers={teamMembers} />  
            </div>
          </div>
          
          <TaskList tasks={tasks} onToggleTask={toggleTask} />
          <TicketsList tickets={tickets} />
          
          {/* New Sections */}
          <SuggestedContactsSection />
          <SchedulesSection />
          <SpeakersSection />
          
          {/* Add Complete Profile Section - placed after Speakers section */}
          <CompleteProfileSection />
          
          {/* Add Interests Section - placed after Complete Profile section */}
          <InterestsSection />
          
          {/* Add Messages Section - placed after Interests section */}
          <MessagesSection />
          
          {/* Add Promote Yourself Section - placed after Messages section */}
          <PromoteYourselfSection />
          
          <ExhibitorsSection />
          <MapsSection />
          
          {/* Social Feed Section - added after Maps section */}
          <SocialFeedSection />
          
          <NewsSection />
          <SponsorsSection />
          
          {/* Gamification Section - added after Sponsors */}
          <GamificationSection />
          
          {/* Fixed Event Summary section title */}
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Event Summary</h2>
          
          <Stats />
          
          {/* Add new Ads section after Event Summary */}
          <AdsSection />
          
          {/* Add 100px spacing after Ads section */}
          <div className="h-[100px]" />
        
          {/* Add TextParticles section */}
          <TextParticlesSection />
        </div>
      </div>
    </div>
  );
};
