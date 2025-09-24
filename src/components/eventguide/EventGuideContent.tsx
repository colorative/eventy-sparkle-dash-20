
import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SearchViewToggle } from "./SearchViewToggle";
import { GuideCard } from "./GuideCard";
import { GuideList } from "./GuideList";
import { FormattedGuideContent } from "./FormattedGuideContent";

interface Guide {
  id: string;
  type: "text" | "attachment" | "webview";
  title: string;
  description: string;
  category: string;
  content?: string;
  attachmentUrl?: string;
  webUrl?: string;
  iconColor?: string;
}

// Array of icon colors for randomization
const iconColors = [
  "text-blue-600", "text-green-600", "text-indigo-600", "text-purple-600", 
  "text-red-600", "text-amber-500", "text-pink-600", "text-teal-600",
  "text-violet-600", "text-emerald-600", "text-cyan-600", "text-rose-600"
];

export const EventGuideContent: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isWebviewOpen, setIsWebviewOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const guides: Guide[] = [
    // Event Guide category
    {
      id: "1",
      type: "text",
      title: "Getting Started",
      description: "Essential information for first-time attendees",
      category: "Event Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      content: `
        # Welcome to AI Summit 2026 🎉
        
        ## Getting Started 🚀
        
        Thank you for joining us at AI Summit 2026! This guide will help you navigate the event and make the most of your experience.
        
        ### Before You Arrive ✅
        
        - **Download the Mobile App**: Access the schedule, maps, and networking features.
        - **Set Up Your Profile**: Complete your attendee profile to connect with other participants.
        - **Plan Your Schedule**: Browse sessions and add them to your personal agenda.
        
        ### During the Event 🗓️
        
        - **Check-In**: Visit the registration desk located in the main lobby.
        - **WiFi Access**: Connect to "AISummit26" network using the password provided in your welcome email.
        - **Help Desk**: Located near the main entrance for any questions or assistance.
        
        ### Networking Opportunities 🤝
        
        - **Welcome Reception**: Day 1, 6:00 PM - 8:00 PM, Grand Hall
        - **Networking Lounges**: Located throughout the venue
        - **AI Matchmaking**: Use the app feature to find attendees with similar interests
        
        We hope you have an insightful and productive experience at AI Summit 2026! 🌟
      `
    },
    {
      id: "2",
      type: "text",
      title: "Event Code of Conduct",
      description: "Guidelines for all event participants",
      category: "Event Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      content: `
        # AI Summit 2026 Code of Conduct 📜
        
        The AI Summit is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, or religion.
        
        ## Expected Behavior ✨
        
        - **Be respectful** of different viewpoints and experiences
        - **Gracefully accept** constructive criticism
        - **Focus on what is best** for the community
        - **Show courtesy and respect** towards other community members
        
        ## Unacceptable Behavior ⛔
        
        Harassment includes, but is not limited to:
        - Offensive verbal comments
        - Deliberate intimidation, stalking, or following
        - Photography or recording without consent
        - Sustained disruption of talks or other events
        - Inappropriate physical contact
        - Unwelcome sexual attention
        
        ## Reporting 🛡️
        
        If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a member of staff immediately. Event staff will be happy to help participants contact venue security or local law enforcement, provide escorts, or otherwise assist those experiencing harassment.
        
        Thank you for helping make this a welcoming, friendly event for all! 🙏
      `
    },
    {
      id: "3",
      type: "attachment",
      title: "Event Schedule PDF",
      description: "Downloadable full schedule of all sessions",
      category: "Event Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      attachmentUrl: "#schedule.pdf"
    },
    {
      id: "10",
      type: "webview",
      title: "Event Registration Portal",
      description: "Access your registration details and make changes",
      category: "Event Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      webUrl: "https://google.com"
    },
    {
      id: "11",
      type: "text",
      title: "FAQ",
      description: "Answers to commonly asked questions",
      category: "Event Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      content: `
        # Frequently Asked Questions ❓
        
        ## General Questions 🔍
        
        **Q: When and where is AI Summit 2026 taking place?**
        
        A: AI Summit 2026 will be held on May 15-17, 2026, at the Innovation Convention Center.
        
        **Q: What are the event hours?**
        
        A: The event runs from 9:00 AM to 6:00 PM each day, with networking events in the evenings.
        
        **Q: Is there a dress code?**
        
        A: Business casual attire is recommended for all event days.
        
        ## Registration Questions 📝
        
        **Q: Can I transfer my registration to a colleague?**
        
        A: Yes, registration transfers are permitted up to 14 days before the event.
        
        **Q: How do I request special accommodations?**
        
        A: Please indicate any special requirements during registration or contact our support team.
        
        ## Technical Questions 💻
        
        **Q: Will there be WiFi available?**
        
        A: Yes, complimentary high-speed WiFi will be available throughout the venue.
        
        **Q: Can I charge my devices at the event?**
        
        A: Charging stations will be available in designated areas around the venue.
      `
    },
    {
      id: "12",
      type: "attachment",
      title: "Speaker Profiles",
      description: "Learn more about our keynote speakers",
      category: "Event Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      attachmentUrl: "#speakers.pdf"
    },
    {
      id: "15",
      type: "text",
      title: "First-Time Attendee Tips",
      description: "Make your first AI Summit experience count",
      category: "Event Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      content: `
        # First-Time Attendee Tips 🌱
        
        ## Before the Event 📋
        
        **Plan Your Schedule** 📅
        
        Review the agenda beforehand and mark sessions that interest you. The AI Summit features parallel tracks, so planning ahead ensures you don't miss important talks.
        
        **Connect Early** 🤝
        
        Use the event app to start connecting with other attendees before the event begins. Many valuable connections are made before day one!
        
        ## During the Event 🎯
        
        **Don't Overpack Your Schedule** ⏱️
        
        Leave room for impromptu meetings and conversations. Some of the most valuable connections happen in the hallways between sessions.
        
        **Take Breaks** 🧘
        
        Conference fatigue is real. Schedule short breaks to recharge and process what you've learned.
        
        **Participate Actively** 🙋‍♂️
        
        Ask questions, join workshops, and engage with exhibitors. Active participation leads to better retention and more meaningful connections.
        
        ## After the Event 📈
        
        **Follow Up Quickly** ✉️
        
        Connect with new contacts within 48 hours while the conversation is still fresh.
        
        **Share Your Learnings** 📝
        
        Consider writing a summary of your key takeaways to solidify your learning and share with colleagues.
      `
    },
    {
      id: "16",
      type: "attachment",
      title: "Networking Guide",
      description: "Tips for effective networking at AI Summit",
      category: "Event Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      attachmentUrl: "#networking.pdf"
    },
    
    // Venue Guide category
    {
      id: "4",
      type: "text",
      title: "Venue Map",
      description: "Detailed floor plan and key locations",
      category: "Venue Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      content: `
        # Venue Map and Information 🗺️
        
        ## Main Areas 🏢
        
        ### Exhibition Hall (Ground Floor)
        - 200+ exhibitor booths
        - Innovation Showcases
        - Demo Zones
        
        ### Conference Rooms (Level 1)
        - Main Stage: Keynote presentations
        - Rooms A-F: Breakout sessions
        - Workshop Areas: Hands-on activities
        
        ### Amenities ✨
        
        - **Information Desks**: Located at each entrance
        - **First Aid Station**: Near the east entrance
        - **Charging Stations**: Throughout the venue
        - **Quiet Rooms**: Level 2, Rooms Q1-Q3
        - **Prayer Room**: Level 2, Room P1
        - **Mother's Room**: Level 2, Room M1
        
        ### Dining 🍽️
        
        - **Food Court**: Central Hall, Ground Floor
        - **Café**: Level 1, next to Room C
        - **VIP Lounge**: Level 2 (invitation only)
        
        ### Accessibility ♿
        
        - Elevators available at all corners of the venue
        - Accessible restrooms on all levels
        - Wheelchair assistance available at information desks
      `
    },
    {
      id: "5",
      type: "webview",
      title: "Interactive Venue Tour",
      description: "Explore the venue with our 3D interactive tour",
      category: "Venue Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      webUrl: "https://google.com"
    },
    {
      id: "6",
      type: "attachment",
      title: "Accessibility Guide",
      description: "Complete information about venue accessibility",
      category: "Venue Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      attachmentUrl: "#accessibility.pdf"
    },
    {
      id: "13",
      type: "text",
      title: "Parking Information",
      description: "Parking options and directions",
      category: "Venue Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      content: `
        # Parking Information 🚗
        
        ## On-Site Parking 🅿️
        
        The Innovation Convention Center offers on-site parking for attendees at $25 per day. The parking garage entrance is located on Innovation Avenue.
        
        ## Hours of Operation ⏰
        
        - **Event Days**: 7:00 AM - 10:00 PM
        - **Pre-Event Setup**: 8:00 AM - 6:00 PM
        
        ## Alternative Parking Options 🚶‍♂️
        
        ### City Center Garage
        - 5-minute walk to venue
        - $18 per day
        - Address: 123 Downtown Street
        
        ### Metro Park & Ride 🚌
        - Free parking with valid event badge
        - Shuttle service every 15 minutes
        - Multiple locations around the city
        
        ## Valet Parking 🔑
        
        Valet parking is available at the main entrance for $35 per day.
        
        ## Electric Vehicle Charging ⚡
        
        10 EV charging stations are available in the main parking garage on level P1.
      `
    },
    {
      id: "14",
      type: "webview",
      title: "Transportation Guide",
      description: "Public transit and shuttle information",
      category: "Venue Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      webUrl: "https://google.com"
    },
    {
      id: "17",
      type: "text",
      title: "Nearby Restaurants",
      description: "Best dining options near the venue",
      category: "Venue Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      content: `
        # Nearby Restaurants 🍔
        
        ## Within Walking Distance 👟
        
        ### Innovation Bistro
        - **Distance**: Inside venue
        - **Cuisine**: Modern American
        - **Price**: $$
        - **Highlights**: Quick service, healthy options, tech-themed cocktails
        
        ### Bytes & Bites
        - **Distance**: 2-minute walk
        - **Cuisine**: Fusion
        - **Price**: $$$
        - **Highlights**: Popular for business meetings, reservation recommended
        
        ## Short Drive/Taxi 🚕
        
        ### Data Diner
        - **Distance**: 5-minute drive
        - **Cuisine**: International buffet
        - **Price**: $$
        - **Highlights**: All-you-can-eat options, great for groups
        
        ### Algorithm Alehouse
        - **Distance**: 8-minute drive
        - **Cuisine**: Gastro pub
        - **Price**: $$
        - **Highlights**: Craft beers, casual atmosphere
        
        ## Delivery Options 📦
        
        Most local restaurants offer delivery to the convention center through major food delivery apps. Look for the "AI Summit Special" discounts.
      `
    },
    {
      id: "18",
      type: "attachment",
      title: "Local Attractions",
      description: "Tourist information for visiting attendees",
      category: "Venue Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      attachmentUrl: "#attractions.pdf"
    },
    {
      id: "19",
      type: "text",
      title: "Health & Safety Protocols",
      description: "COVID-19 and general safety information",
      category: "Venue Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      content: `
        # Health & Safety Protocols 🛡️
        
        ## COVID-19 Measures 🦠
        
        ### Before the Event
        - **Vaccination**: Proof of vaccination or negative test required
        - **Health Declaration**: Complete online form 24 hours before arrival
        
        ### At the Venue
        - **Masks**: Optional but recommended in crowded spaces
        - **Sanitization**: 200+ sanitizing stations throughout the venue
        - **Air Filtration**: Enhanced HVAC systems with HEPA filters
        
        ## General Safety 🚨
        
        ### Emergency Procedures
        - **Emergency Exits**: Clearly marked throughout the venue
        - **Assembly Points**: Located in the north and south parking lots
        - **First Aid**: Medical staff on-site during all event hours
        
        ### Security
        - **Bag Checks**: All bags will be screened upon entry
        - **Security Personnel**: Present throughout the venue 24/7
        - **Lost & Found**: Located at the main information desk
        
        ## Contact Information ☎️
        
        - **Emergency**: Dial 0 from any venue phone
        - **Non-Emergency**: Text "HELP" to 55555
        - **Medical Assistance**: Visit any information desk or call venue extension 1119
      `
    },
    {
      id: "20",
      type: "webview",
      title: "Convention Center Amenities",
      description: "Explore all services available at the venue",
      category: "Venue Guide",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)],
      webUrl: "https://google.com"
    }
  ];

  // Filter guides based on search term
  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique categories in the order they appear in the guides array
  const categories = Array.from(new Set(guides.map(guide => guide.category)));

  const handleGuideClick = (guide: Guide) => {
    setSelectedGuide(guide);
    
    switch(guide.type) {
      case "text":
        setIsDialogOpen(true);
        break;
      case "attachment":
        window.open(guide.attachmentUrl, "_blank");
        break;
      case "webview":
        setIsWebviewOpen(true);
        break;
    }
  };
  
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white flex flex-col items-stretch p-6 max-md:p-4">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">Event Guide</h1>
              <p className="text-gray-500">Helpful resources for navigating the event</p>
            </div>
            <SearchViewToggle 
              viewMode={viewMode} 
              setViewMode={setViewMode} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          </div>

          <div className="space-y-8">
            {categories.map((category) => {
              const categoryGuides = filteredGuides.filter((guide) => guide.category === category);
              
              if (categoryGuides.length === 0) return null;
              
              return (
                <div key={category} className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">{category}</h2>
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {categoryGuides.map((guide) => (
                        <GuideCard 
                          key={guide.id} 
                          guide={guide} 
                          onClick={() => handleGuideClick(guide)} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {categoryGuides.map((guide) => (
                        <GuideList
                          key={guide.id}
                          guide={guide}
                          onClick={() => handleGuideClick(guide)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Text Guide Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">{selectedGuide?.title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Scroll down to read the full guide content.
            </DialogDescription>
          </DialogHeader>
          {selectedGuide?.content && (
            <FormattedGuideContent content={selectedGuide.content} />
          )}
        </DialogContent>
      </Dialog>

      {/* Webview Dialog */}
      <Dialog open={isWebviewOpen} onOpenChange={setIsWebviewOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-6">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">{selectedGuide?.title}</DialogTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.open(selectedGuide?.webUrl, "_blank")}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Open in new tab</span>
              </Button>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              External content is displayed below.
            </DialogDescription>
          </DialogHeader>
          <div className="h-[65vh] w-full border rounded-md overflow-hidden">
            {selectedGuide?.webUrl && (
              <iframe 
                src={selectedGuide.webUrl} 
                className="w-full h-full border-0" 
                title={selectedGuide.title}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
