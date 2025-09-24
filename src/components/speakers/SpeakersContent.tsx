
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid, List, MapPin, Calendar, MessageSquare, ExternalLink, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { SpeakerProfile } from "./SpeakerProfile";

// Featured speakers data with overlay text
const featuredSpeakers = [
  {
    id: 1,
    name: "Dominic Sauer",
    position: "Network Administrator",
    company: "NetGenius",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    avatar: "DS",
    bio: "Leading expert in network infrastructure and cybersecurity with over 12 years of experience",
    sessions: ["Network Security Best Practices", "Future of Cloud Infrastructure"],
    topics: ["Network Security", "Cloud Computing", "Infrastructure"],
    social: {
      twitter: "@dominicsauer",
      linkedin: "dominicsauer"
    }
  },
  {
    id: 2,
    name: "Meredith Murazik",
    position: "Network Administrator",
    company: "NetGenius",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    avatar: "MM",
    bio: "Specialized in network automation and AI-driven infrastructure management",
    sessions: ["Network Automation Revolution", "AI in Network Management"],
    topics: ["Network Automation", "AI", "Infrastructure Management"],
    social: {
      twitter: "@meredithm",
      linkedin: "meredithmurazik"
    }
  },
  {
    id: 3,
    name: "Alfred Okun",
    position: "Network Administrator",
    company: "NetGenius",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    avatar: "AO",
    bio: "Expert in enterprise network solutions and digital transformation strategies",
    sessions: ["Enterprise Network Solutions", "Digital Transformation"],
    topics: ["Enterprise Solutions", "Digital Transformation", "Network Architecture"],
    social: {
      twitter: "@alfredokun",
      linkedin: "alfredokun"
    }
  },
  {
    id: 10,
    name: "Rachel Kim",
    position: "Cloud Solutions Architect",
    company: "CloudTech Inc.",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80",
    avatar: "RK",
    bio: "Expert in cloud infrastructure design and migration strategies",
    sessions: ["Cloud Migration Best Practices", "Serverless Architecture"],
    topics: ["Cloud Computing", "DevOps", "Infrastructure"],
    social: {
      twitter: "@rachelkim",
      linkedin: "rachelkim"
    }
  },
  {
    id: 11,
    name: "Marcus Thompson",
    position: "Data Engineer",
    company: "DataFlow Systems",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    avatar: "MT",
    bio: "Specializing in big data processing and analytics platforms",
    sessions: ["Big Data Analytics", "Real-time Data Processing"],
    topics: ["Data Engineering", "Analytics", "Machine Learning"],
    social: {
      twitter: "@marcust",
      linkedin: "marcusthompson"
    }
  },
  {
    id: 12,
    name: "Elena Rodriguez",
    position: "DevOps Engineer",
    company: "AutoDeploy Solutions",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    avatar: "ER",
    bio: "Expert in CI/CD pipelines and infrastructure automation",
    sessions: ["DevOps Best Practices", "Container Orchestration"],
    topics: ["DevOps", "Kubernetes", "Automation"],
    social: {
      twitter: "@elenarod",
      linkedin: "elenarodriguez"
    }
  },
  {
    id: 13,
    name: "James Wilson",
    position: "Security Analyst",
    company: "CyberGuard Tech",
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
    avatar: "JW",
    bio: "Cybersecurity expert with focus on threat detection and prevention",
    sessions: ["Cybersecurity Trends", "Threat Intelligence"],
    topics: ["Cybersecurity", "Threat Detection", "Security Analysis"],
    social: {
      twitter: "@jameswilson",
      linkedin: "jameswilson"
    }
  },
  {
    id: 14,
    name: "Sophia Chen",
    position: "AI Research Scientist",
    company: "Neural Networks Lab",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    avatar: "SC",
    bio: "Leading research in artificial intelligence and machine learning",
    sessions: ["AI in Healthcare", "Future of Machine Learning"],
    topics: ["Artificial Intelligence", "Machine Learning", "Research"],
    social: {
      twitter: "@sophiachen",
      linkedin: "sophiachen"
    }
  }
];

// Mock speakers data
const speakersData = [{
  id: 4,
  name: "Dr. Sophia Chen",
  position: "Director of AI Research",
  company: "NeuroTech Labs",
  avatar: "SC",
  bio: "Leading expert in neural networks and deep learning with over 15 years of experience",
  sessions: ["AI Ethics in Healthcare", "Future of Neural Networks"],
  topics: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
  social: {
    twitter: "@drsophiachen",
    linkedin: "sophiachen"
  }
}, {
  id: 5,
  name: "Michael Rodriguez",
  position: "Chief Innovation Officer",
  company: "FutureTech Industries",
  avatar: "MR",
  bio: "Pioneering innovation strategies for Fortune 500 companies",
  sessions: ["Digital Transformation Strategy", "Innovation at Scale"],
  topics: ["Innovation", "Digital Transformation", "Corporate Strategy"],
  social: {
    twitter: "@mrodriguez",
    linkedin: "michaelrodriguez"
  }
}, {
  id: 6,
  name: "Dr. James Wilson",
  position: "Quantum Computing Researcher",
  company: "Quantum Dynamics",
  avatar: "JW",
  bio: "Leading quantum computing research and algorithm development",
  sessions: ["Quantum Computing Applications", "The Future of Computation"],
  topics: ["Quantum Computing", "Quantum Algorithms", "Computational Physics"],
  social: {
    twitter: "@drjwilson",
    linkedin: "jameswilson"
  }
}, {
  id: 7,
  name: "Sarah Johnson",
  position: "Head of Product",
  company: "TechNova",
  avatar: "SJ",
  bio: "Product leader focused on user-centric design and innovation",
  sessions: ["Product Strategy in AI Era", "Building Products That Matter"],
  topics: ["Product Management", "UX Design", "AI Products"],
  social: {
    twitter: "@sarahjproduct",
    linkedin: "sarahjohnson"
  }
}, {
  id: 8,
  name: "Dr. Robert Chang",
  position: "Director of Robotics",
  company: "Automation Systems Inc.",
  avatar: "RC",
  bio: "Expert in robotics and automation systems integration",
  sessions: ["Industrial Automation", "Collaborative Robots"],
  topics: ["Robotics", "Automation", "AI in Manufacturing"],
  social: {
    twitter: "@drrobertc",
    linkedin: "robertchang"
  }
}, {
  id: 9,
  name: "Emma Davis",
  position: "Cybersecurity Analyst",
  company: "SecureNet Solutions",
  avatar: "ED",
  bio: "Specializing in threat detection and network security",
  sessions: ["Modern Cybersecurity Challenges", "AI in Security Systems"],
  topics: ["Cybersecurity", "Network Security", "Threat Intelligence"],
  social: {
    twitter: "@emmadcyber",
    linkedin: "emmadavis"
  }
}];

// Unsplash images for regular speakers
const speakerImages = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1577880216142-8549e9488dad?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80"
];

export const SpeakersContent = () => {
  const [viewType, setViewType] = useState("grid");
  const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  
  const handleSpeakerClick = (speaker: any) => {
    setSelectedSpeaker({
      ...speaker,
      imageUrl: speaker.imageUrl || speakerImages[speaker.id - 4] // Add image URL to speaker data
    });
    setShowProfile(true);
  };
  
  return (
    <>
      {showProfile ? (
        <SpeakerProfile 
          speaker={selectedSpeaker} 
          onBack={() => setShowProfile(false)} 
        />
      ) : (
        <div className="bg-white dark:bg-gray-900 flex min-w-60 flex-col overflow-auto items-stretch flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl font-bold dark:text-white">Speakers</h1>
              <p className="text-base text-gray-500 dark:text-gray-400">Meet our event's thought leaders and experts</p>
            </div>
          </div>


          <ScrollArea className="flex-1">
            {/* Featured Speakers Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Featured Speakers</h2>
                <div className="rounded-lg p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20">
                <HorizontalScroller>
                  {featuredSpeakers.map((speaker) => (
                    <Card 
                      key={speaker.id}
                      className="flex-shrink-0 w-40 overflow-hidden cursor-pointer hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                      onClick={() => handleSpeakerClick(speaker)}
                    >
                      <div className="relative">
                        <AspectRatio ratio={3 / 5} className="bg-gray-100 dark:bg-gray-800">
                          <img 
                            src={speaker.imageUrl} 
                            alt={speaker.name} 
                            className="object-cover w-full h-full" 
                          />
                          {/* Dark gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          {/* Text overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="font-semibold text-base mb-1">{speaker.name}</h3>
                            <div className="text-sm opacity-90">
                              <span>{speaker.position} at </span>
                              <span className="text-blue-300">{speaker.company}</span>
                            </div>
                          </div>
                        </AspectRatio>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="absolute top-2 right-2 bg-white border-gray-300 rounded-full h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Bookmark functionality would go here
                          }}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </HorizontalScroller>
              </div>
            </div>

            {/* All Speakers Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold dark:text-white">All Speakers</h2>
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search speakers by name, company, or topic" className="pl-9 text-base w-80" />
                  </div>
                  <Button variant="outline" className="gap-2 text-base">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Sort by Relevance</SelectItem>
                      <SelectItem value="name">Sort by Name</SelectItem>
                      <SelectItem value="company">Sort by Company</SelectItem>
                      <SelectItem value="sessions">Most Sessions</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="border rounded-md flex">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setViewType("list")} 
                      className={viewType === "list" ? "bg-slate-100 dark:bg-slate-800" : ""}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setViewType("grid")} 
                      className={viewType === "grid" ? "bg-slate-100 dark:bg-slate-800" : ""}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              {viewType === "list" ? (
                <div className="space-y-3">
                  {speakersData.map((speaker, index) => (
                    <Card 
                      key={speaker.id} 
                      className="overflow-hidden cursor-pointer hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                      onClick={() => handleSpeakerClick(speaker)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-16 h-20 overflow-hidden rounded-md">
                            <AspectRatio ratio={3 / 4} className="bg-gray-100 dark:bg-gray-800">
                              <img src={speakerImages[index]} alt={speaker.name} className="object-cover w-full h-full" />
                            </AspectRatio>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-base font-semibold dark:text-white">{speaker.name}</h3>
                            <p className="text-sm">
                              <span className="text-gray-600 dark:text-gray-400">{speaker.position} at </span>
                              <span className="text-blue-600 dark:text-blue-400">{speaker.company}</span>
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="rounded-md border-gray-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Bookmark functionality would go here
                              }}
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-gray-300 text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeakerClick(speaker);
                              }}
                            >
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                  {speakersData.map((speaker, index) => (
                    <Card 
                      key={speaker.id}
                      className="overflow-hidden cursor-pointer hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 flex flex-col"
                      onClick={() => handleSpeakerClick(speaker)}
                    >
                      <div className="relative">
                        <AspectRatio ratio={3 / 4} className="bg-gray-100 dark:bg-gray-800">
                          <img src={speakerImages[index]} alt={speaker.name} className="object-cover w-full h-full" />
                        </AspectRatio>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="absolute top-2 right-2 bg-white border-gray-300 rounded-full h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Bookmark functionality would go here
                          }}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4 flex flex-col flex-1">
                        <h3 className="font-semibold text-base dark:text-white">{speaker.name}</h3>
                        <div className="mb-4 h-10 text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{speaker.position} at </span>
                          <span className="text-blue-600 dark:text-blue-400">{speaker.company}</span>
                        </div>
                        
                        <div className="flex justify-center mt-auto">
                          <Button 
                            variant="outline"
                            size="sm"
                            className="text-sm border-gray-300 w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeakerClick(speaker);
                            }} 
                          >
                            View Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
};
