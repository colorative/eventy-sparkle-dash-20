import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Avatar from "boring-avatars";
import { Trophy } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Define the type for attendee objects to include the optional isCurrentUser property
type Attendee = {
  id: number;
  name: string;
  points: number;
  position: number;
  isCurrentUser?: boolean;
};
type Team = {
  id: number;
  name: string;
  points: number;
  position: number;
};
const topAttendees: Attendee[] = [{
  id: 1,
  name: "Daniel",
  points: 1250,
  position: 1
}, {
  id: 2,
  name: "Lynne",
  points: 978,
  position: 2
}, {
  id: 3,
  name: "Terri",
  points: 513,
  position: 3
}];
const attendees: Attendee[] = [{
  id: 4,
  name: "Sheldon King",
  points: 495,
  position: 4
}, {
  id: 5,
  name: "Dominic Sauer",
  points: 472,
  position: 5
}, {
  id: 6,
  name: "Meredith Murazik",
  points: 397,
  position: 6
}, {
  id: 7,
  name: "Alfred Okuneva MD",
  points: 380,
  position: 7
}, {
  id: 8,
  name: "Eileen Altenwerth",
  points: 327,
  position: 8
}, {
  id: 9,
  name: "Wallace D'Amore",
  points: 315,
  position: 9
}, {
  id: 10,
  name: "Jessica Parker",
  points: 303,
  position: 10
}, {
  id: 11,
  name: "Michael Johnson",
  points: 295,
  position: 11
}, {
  id: 12,
  name: "Daniel Miller",
  points: 282,
  position: 12
}, {
  id: 13,
  name: "Sarah Williams",
  points: 275,
  position: 13
}, {
  id: 14,
  name: "Robert Brown",
  points: 268,
  position: 14
}, {
  id: 15,
  name: "Emily Davis",
  points: 256,
  position: 15
}, {
  id: 16,
  name: "David Wilson",
  points: 244,
  position: 16
}, {
  id: 17,
  name: "Jennifer Taylor",
  points: 238,
  position: 17
}, {
  id: 18,
  name: "Andrew Thomas",
  points: 227,
  position: 18
}, {
  id: 19,
  name: "Elizabeth Martin",
  points: 215,
  position: 19
}, {
  id: 20,
  name: "Steven Anderson",
  points: 208,
  position: 20
}];

// Add more users for pagination
const attendeesPage2: Attendee[] = [{
  id: 21,
  name: "Lisa Martinez",
  points: 196,
  position: 21
}, {
  id: 22,
  name: "Kevin Thompson",
  points: 187,
  position: 22
}, {
  id: 23,
  name: "Amanda Garcia",
  points: 175,
  position: 23
}, {
  id: 24,
  name: "Brian Rodriguez",
  points: 168,
  position: 24
}, {
  id: 25,
  name: "Stephanie Wilson",
  points: 160,
  position: 25
}, {
  id: 26,
  name: "Matthew Lewis",
  points: 152,
  position: 26
}, {
  id: 27,
  name: "Laura Walker",
  points: 147,
  position: 27
}, {
  id: 28,
  name: "Joshua Hall",
  points: 139,
  position: 28
}, {
  id: 29,
  name: "Melissa Young",
  points: 133,
  position: 29
}, {
  id: 30,
  name: "Christopher Allen",
  points: 128,
  position: 30
}, {
  id: 31,
  name: "Kimberly Scott",
  points: 125,
  position: 31
}, {
  id: 32,
  name: "Brandon Green",
  points: 118,
  position: 32
}, {
  id: 33,
  name: "You",
  points: 112,
  position: 33,
  isCurrentUser: true
}];
const teams: Team[] = [{
  id: 101,
  name: "Team Alpha",
  points: 2150,
  position: 1
}, {
  id: 102,
  name: "Team Beta",
  points: 1875,
  position: 2
}, {
  id: 103,
  name: "Team Gamma",
  points: 1540,
  position: 3
}, {
  id: 104,
  name: "Team Delta",
  points: 1390,
  position: 4
}, {
  id: 105,
  name: "Team Epsilon",
  points: 1275,
  position: 5
}, {
  id: 106,
  name: "Team Zeta",
  points: 1190,
  position: 6
}, {
  id: 107,
  name: "Team Eta",
  points: 1145,
  position: 7
}, {
  id: 108,
  name: "Team Theta",
  points: 1080,
  position: 8
}, {
  id: 109,
  name: "Team Iota",
  points: 990,
  position: 9
}, {
  id: 110,
  name: "Team Kappa",
  points: 945,
  position: 10
}, {
  id: 111,
  name: "Team Lambda",
  points: 850,
  position: 11
}, {
  id: 112,
  name: "Team Mu",
  points: 780,
  position: 12
}, {
  id: 113,
  name: "Team Nu",
  points: 720,
  position: 13
}, {
  id: 114,
  name: "Team Xi",
  points: 650,
  position: 14
}, {
  id: 115,
  name: "Team Omicron",
  points: 580,
  position: 15
}];
const CoinIcon = () => <svg className="w-4 h-4 mr-1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <circle cx="256" cy="256" fill="#ffb703" r="256"></circle>
    <circle cx="256" cy="256" fill="#ffcc29" r="183.75"></circle>
    <g fill="none" strokeMiterlimit="10">
      <circle cx="256" cy="256" r="183.75" stroke="#f99300" strokeWidth="32.32"></circle>
      <path d="m341.31 468.54a227.51 227.51 0 0 0 142.15-210.92" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
      <path d="m142.26 59a226.34 226.34 0 0 1 113.74-30.46" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
      <path d="m64.77 132.76a228.18 228.18 0 0 1 39.64-46.37" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
      <path d="m56.22 364.84a226.58 226.58 0 0 1 -27.68-108.84" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
    </g>
    <path d="m303.53 237.67-44.85-64.91a3.25 3.25 0 0 0 -5.36 0l-44.85 64.91a3.26 3.26 0 0 1 -4 1.14l-63.64-28.27a3.27 3.27 0 0 0 -4.46 3.89l36.9 126.36a3.26 3.26 0 0 0 3.13 2.35h159.21a3.26 3.26 0 0 0 3.13-2.35l36.9-126.36a3.27 3.27 0 0 0 -4.46-3.89l-63.64 28.27a3.29 3.29 0 0 1 -4.01-1.14z" fill="#f99300"></path>
  </svg>;
const LeaderboardTab = () => {
  const [activeTab, setActiveTab] = useState("individual");
  const [individualPage, setIndividualPage] = useState(1);
  const [teamPage, setTeamPage] = useState(1);
  const getPagedIndividualItems = () => {
    return individualPage === 1 ? attendees : attendeesPage2;
  };
  const getPagedTeamItems = () => {
    return teams.slice((teamPage - 1) * 20, teamPage * 20);
  };
  return <div className="bg-white border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Leaderboard</h3>
      </div>
      
      <Tabs defaultValue="individual" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="individual" className="mt-4">
          {/* Top 3 attendees with podium style - increased height and proper spacing */}
          <div className="h-[250px] mb-6 relative mt-8">
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
              {/* 2nd place */}
              <div className="flex flex-col items-center mx-4">
                <div className="relative mb-2">
                  <Avatar size={50} name={topAttendees[1].name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                </div>
                <div className="text-center mb-2">
                  <div className="font-medium">{topAttendees[1].name}</div>
                  <div className="flex items-center justify-center text-sm bg-slate-200 rounded-full px-2 py-0.5">
                    <CoinIcon />
                    <span>{topAttendees[1].points}</span>
                  </div>
                </div>
                <div className="bg-slate-200 h-20 w-20 rounded-t-md flex items-center justify-center">
                  <span className="text-4xl font-bold text-slate-400">2</span>
                </div>
              </div>
              
              {/* 1st place */}
              <div className="flex flex-col items-center mx-4 mb-4">
                <div className="relative mb-2">
                  <Avatar size={60} name={topAttendees[0].name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                  
                </div>
                <div className="text-center mb-2">
                  <div className="font-medium">{topAttendees[0].name}</div>
                  <div className="flex items-center justify-center text-sm bg-amber-200 rounded-full px-2 py-0.5">
                    <CoinIcon />
                    <span className="text-amber-800">{topAttendees[0].points}</span>
                  </div>
                </div>
                <div className="bg-amber-400 h-28 w-20 rounded-t-md flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">1</span>
                </div>
              </div>
              
              {/* 3rd place */}
              <div className="flex flex-col items-center mx-4">
                <div className="relative mb-2">
                  <Avatar size={45} name={topAttendees[2].name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                </div>
                <div className="text-center mb-2">
                  <div className="font-medium">{topAttendees[2].name}</div>
                  <div className="flex items-center justify-center text-sm bg-slate-200 rounded-full px-2 py-0.5">
                    <CoinIcon />
                    <span>{topAttendees[2].points}</span>
                  </div>
                </div>
                <div className="bg-slate-200 h-16 w-20 rounded-t-md flex items-center justify-center">
                  <span className="text-3xl font-bold text-slate-400">3</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Other attendees list - more compact and without borders */}
          <div className="space-y-1 mt-4">
            {getPagedIndividualItems().map(attendee => <div key={attendee.id} className={`flex items-center p-1.5 rounded-lg ${attendee.isCurrentUser ? "bg-blue-50" : "bg-white"}`}>
                <div className="text-xs font-medium w-6 text-center text-gray-500">{attendee.position}</div>
                <div className="ml-2 flex-shrink-0">
                  <Avatar size={24} name={attendee.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                </div>
                <div className="ml-2 flex-1 truncate">
                  <div className="font-medium text-sm">{attendee.name}</div>
                </div>
                <div className="flex items-center text-amber-500">
                  <CoinIcon />
                  <span className="font-medium text-xs">{attendee.points}</span>
                </div>
              </div>)}
          </div>
          
          {/* Pagination */}
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setIndividualPage(1)} className={individualPage === 1 ? "pointer-events-none opacity-50" : ""} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setIndividualPage(1)} isActive={individualPage === 1}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setIndividualPage(2)} isActive={individualPage === 2}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => setIndividualPage(2)} className={individualPage === 2 ? "pointer-events-none opacity-50" : ""} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>
        
        <TabsContent value="teams" className="mt-4">
          <div className="space-y-1 mt-4">
            {getPagedTeamItems().map(team => <div key={team.id} className="flex items-center p-1.5 rounded-lg bg-white">
                <div className="text-xs font-medium w-6 text-center text-gray-500">{team.position}</div>
                
                <div className="ml-2 flex-1 truncate">
                  <div className="font-medium text-sm">{team.name}</div>
                </div>
                <div className="flex items-center text-blue-600">
                  <CoinIcon />
                  <span className="font-medium text-xs">{team.points}</span>
                </div>
              </div>)}
          </div>
          
          {/* Pagination */}
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setTeamPage(Math.max(1, teamPage - 1))} className={teamPage === 1 ? "pointer-events-none opacity-50" : ""} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setTeamPage(1)} isActive={teamPage === 1}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setTeamPage(2)} isActive={teamPage === 2}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => setTeamPage(Math.min(2, teamPage + 1))} className={teamPage === 2 ? "pointer-events-none opacity-50" : ""} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>
      </Tabs>
    </div>;
};
export default LeaderboardTab;
