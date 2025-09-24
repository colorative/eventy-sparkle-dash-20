import React, { useState } from "react";
import { Search, Filter, Grid, List, User, Building, MessageSquare, Calendar, Heart, MapPin, MoreHorizontal, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Avatar from "boring-avatars";
import { FilterPanel } from "./FilterPanel";

export const AttendeesContent: React.FC = () => {
  const [viewType, setViewType] = useState("list");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const attendees = [
    {
      id: 1,
      name: "David Lee",
      role: "CTO",
      company: "InnovateX",
      avatarInitials: "DL",
      interests: ["AI", "Cloud Computing", "Cybersecurity"],
      location: "San Francisco, CA",
      bio: "Technology leader with 15+ years in software development and cloud architecture.",
      connections: 12,
      isConnected: false,
      isSaved: true
    },
    {
      id: 2,
      name: "Emily Chen",
      role: "Product Director",
      company: "TechSolutions",
      avatarInitials: "EC",
      interests: ["UX Design", "Product Management", "Analytics"],
      location: "New York, NY",
      bio: "Leading product innovation with a focus on user-centered design and data-driven decisions.",
      connections: 8,
      isConnected: true,
      isSaved: false
    },
    {
      id: 3,
      name: "James Wilson",
      role: "VP of Sales",
      company: "Enterprise Systems",
      avatarInitials: "JW",
      interests: ["Enterprise Software", "Sales Strategy", "Partnership"],
      location: "Chicago, IL",
      bio: "Experienced sales leader specializing in enterprise software solutions.",
      connections: 5,
      isConnected: false,
      isSaved: false
    },
    {
      id: 4,
      name: "Sophia Martinez",
      role: "Data Science Lead",
      company: "DataInsights",
      avatarInitials: "SM",
      interests: ["Machine Learning", "Data Analytics", "AI"],
      location: "Austin, TX",
      bio: "Data scientist passionate about turning complex data into actionable insights.",
      connections: 3,
      isConnected: true,
      isSaved: true
    },
    {
      id: 5,
      name: "Robert Johnson",
      role: "CEO",
      company: "StartupVision",
      avatarInitials: "RJ",
      interests: ["Entrepreneurship", "Venture Capital", "Emerging Tech"],
      location: "Boston, MA",
      bio: "Serial entrepreneur with multiple successful exits in the tech space.",
      connections: 20,
      isConnected: false,
      isSaved: false
    },
    {
      id: 6,
      name: "Sarah Kim",
      role: "Engineering Manager",
      company: "Microsoft",
      avatarInitials: "SK",
      interests: ["Software Engineering", "Team Leadership", "DevOps"],
      location: "Seattle, WA",
      bio: "Engineering leader focused on building scalable systems and high-performing teams.",
      connections: 15,
      isConnected: false,
      isSaved: false
    },
    {
      id: 7,
      name: "Marcus Rodriguez",
      role: "VP of Marketing",
      company: "Google",
      avatarInitials: "MR",
      interests: ["Digital Marketing", "Growth Strategy", "Brand Management"],
      location: "Mountain View, CA",
      bio: "Marketing executive with expertise in digital transformation and brand strategy.",
      connections: 18,
      isConnected: true,
      isSaved: true
    },
    {
      id: 8,
      name: "Lisa Thompson",
      role: "Head of Design",
      company: "Apple",
      avatarInitials: "LT",
      interests: ["UI/UX Design", "Design Systems", "User Research"],
      location: "Cupertino, CA",
      bio: "Design leader passionate about creating intuitive and beautiful user experiences.",
      connections: 22,
      isConnected: false,
      isSaved: false
    },
    {
      id: 9,
      name: "Alex Chen",
      role: "Senior Developer",
      company: "Meta",
      avatarInitials: "AC",
      interests: ["React", "JavaScript", "Open Source"],
      location: "Menlo Park, CA",
      bio: "Full-stack developer with a passion for building innovative web applications.",
      connections: 9,
      isConnected: true,
      isSaved: false
    },
    {
      id: 10,
      name: "Jennifer Davis",
      role: "Product Manager",
      company: "Amazon",
      avatarInitials: "JD",
      interests: ["Product Strategy", "E-commerce", "Customer Experience"],
      location: "Seattle, WA",
      bio: "Product manager focused on creating customer-centric solutions at scale.",
      connections: 14,
      isConnected: false,
      isSaved: true
    },
    {
      id: 11,
      name: "Michael Brown",
      role: "Data Engineer",
      company: "Netflix",
      avatarInitials: "MB",
      interests: ["Big Data", "Machine Learning", "Stream Processing"],
      location: "Los Gatos, CA",
      bio: "Data engineer specializing in large-scale data processing and analytics platforms.",
      connections: 11,
      isConnected: false,
      isSaved: false
    },
    {
      id: 12,
      name: "Rachel Green",
      role: "UX Researcher",
      company: "Airbnb",
      avatarInitials: "RG",
      interests: ["User Research", "Behavioral Psychology", "Design Thinking"],
      location: "San Francisco, CA",
      bio: "UX researcher dedicated to understanding user needs and improving digital experiences.",
      connections: 16,
      isConnected: true,
      isSaved: true
    },
    {
      id: 13,
      name: "Kevin Wang",
      role: "Solution Architect",
      company: "Salesforce",
      avatarInitials: "KW",
      interests: ["Cloud Architecture", "CRM Systems", "Enterprise Solutions"],
      location: "San Francisco, CA",
      bio: "Solution architect helping enterprises transform their customer relationship management.",
      connections: 19,
      isConnected: false,
      isSaved: false
    },
    {
      id: 14,
      name: "Amanda Foster",
      role: "Head of HR",
      company: "Spotify",
      avatarInitials: "AF",
      interests: ["People Operations", "Talent Management", "Diversity & Inclusion"],
      location: "New York, NY",
      bio: "HR leader focused on creating inclusive workplaces and developing talent strategies.",
      connections: 25,
      isConnected: true,
      isSaved: false
    },
    {
      id: 15,
      name: "Daniel Park",
      role: "Security Engineer",
      company: "Tesla",
      avatarInitials: "DP",
      interests: ["Cybersecurity", "Automotive Security", "IoT Security"],
      location: "Palo Alto, CA",
      bio: "Security engineer working on cutting-edge automotive cybersecurity solutions.",
      connections: 7,
      isConnected: false,
      isSaved: true
    },
    {
      id: 16,
      name: "Olivia Martinez",
      role: "Business Analyst",
      company: "IBM",
      avatarInitials: "OM",
      interests: ["Business Intelligence", "Data Visualization", "Process Optimization"],
      location: "Austin, TX",
      bio: "Business analyst specializing in data-driven decision making and process improvement.",
      connections: 13,
      isConnected: false,
      isSaved: false
    },
    {
      id: 17,
      name: "Ryan O'Connor",
      role: "DevOps Engineer",
      company: "GitHub",
      avatarInitials: "RO",
      interests: ["CI/CD", "Infrastructure", "Kubernetes"],
      location: "San Francisco, CA",
      bio: "DevOps engineer passionate about automation and scalable infrastructure solutions.",
      connections: 10,
      isConnected: true,
      isSaved: false
    },
    {
      id: 18,
      name: "Samantha Lee",
      role: "Content Strategist",
      company: "HubSpot",
      avatarInitials: "SL",
      interests: ["Content Marketing", "SEO", "Brand Strategy"],
      location: "Cambridge, MA",
      bio: "Content strategist helping businesses tell their stories and connect with audiences.",
      connections: 17,
      isConnected: false,
      isSaved: true
    },
    {
      id: 19,
      name: "Carlos Gutierrez",
      role: "Mobile Developer",
      company: "Uber",
      avatarInitials: "CG",
      interests: ["iOS Development", "Android", "Mobile UX"],
      location: "San Francisco, CA",
      bio: "Mobile developer creating seamless experiences for millions of users worldwide.",
      connections: 12,
      isConnected: true,
      isSaved: false
    },
    {
      id: 20,
      name: "Nina Patel",
      role: "AI Researcher",
      company: "OpenAI",
      avatarInitials: "NP",
      interests: ["Artificial Intelligence", "Natural Language Processing", "Ethics in AI"],
      location: "San Francisco, CA",
      bio: "AI researcher working on advancing artificial general intelligence safely and responsibly.",
      connections: 8,
      isConnected: false,
      isSaved: true
    },
    {
      id: 21,
      name: "Thomas Wilson",
      role: "VP of Engineering",
      company: "Stripe",
      avatarInitials: "TW",
      interests: ["Financial Technology", "Engineering Leadership", "API Design"],
      location: "San Francisco, CA",
      bio: "Engineering leader building the infrastructure that powers online commerce globally.",
      connections: 24,
      isConnected: false,
      isSaved: false
    },
    {
      id: 22,
      name: "Grace Liu",
      role: "Product Designer",
      company: "Figma",
      avatarInitials: "GL",
      interests: ["Product Design", "Design Tools", "Collaboration"],
      location: "San Francisco, CA",
      bio: "Product designer creating tools that empower designers and teams to collaborate better.",
      connections: 21,
      isConnected: true,
      isSaved: true
    },
    {
      id: 23,
      name: "Jordan Smith",
      role: "Growth Manager",
      company: "Slack",
      avatarInitials: "JS",
      interests: ["Growth Hacking", "User Acquisition", "Product Marketing"],
      location: "San Francisco, CA",
      bio: "Growth manager focused on scaling user acquisition and engagement strategies.",
      connections: 15,
      isConnected: false,
      isSaved: false
    },
    {
      id: 24,
      name: "Isabella Garcia",
      role: "Quality Engineer",
      company: "Adobe",
      avatarInitials: "IG",
      interests: ["Quality Assurance", "Test Automation", "Performance Testing"],
      location: "San Jose, CA",
      bio: "Quality engineer ensuring software reliability and performance at enterprise scale.",
      connections: 11,
      isConnected: true,
      isSaved: false
    },
    {
      id: 25,
      name: "Andrew Kim",
      role: "Cloud Architect",
      company: "Oracle",
      avatarInitials: "AK",
      interests: ["Cloud Computing", "Enterprise Architecture", "Database Systems"],
      location: "Redwood City, CA",
      bio: "Cloud architect designing scalable enterprise solutions for global organizations.",
      connections: 18,
      isConnected: false,
      isSaved: true
    },
    {
      id: 26,
      name: "Victoria Zhang",
      role: "Marketing Director",
      company: "Zoom",
      avatarInitials: "VZ",
      interests: ["B2B Marketing", "Event Marketing", "Customer Success"],
      location: "San Jose, CA",
      bio: "Marketing director specializing in B2B customer acquisition and retention strategies.",
      connections: 20,
      isConnected: false,
      isSaved: false
    },
    {
      id: 27,
      name: "Christopher Lee",
      role: "Backend Developer",
      company: "Twitter",
      avatarInitials: "CL",
      interests: ["Distributed Systems", "API Development", "Performance Optimization"],
      location: "San Francisco, CA",
      bio: "Backend developer building systems that handle billions of requests per day.",
      connections: 9,
      isConnected: true,
      isSaved: false
    },
    {
      id: 28,
      name: "Maya Patel",
      role: "Data Scientist",
      company: "LinkedIn",
      avatarInitials: "MP",
      interests: ["Data Science", "Predictive Analytics", "Social Networks"],
      location: "Sunnyvale, CA",
      bio: "Data scientist leveraging machine learning to create professional networking insights.",
      connections: 16,
      isConnected: false,
      isSaved: true
    },
    {
      id: 29,
      name: "Ethan Brown",
      role: "Frontend Developer",
      company: "Shopify",
      avatarInitials: "EB",
      interests: ["React", "E-commerce", "Web Performance"],
      location: "Toronto, Canada",
      bio: "Frontend developer creating exceptional e-commerce experiences for merchants worldwide.",
      connections: 14,
      isConnected: true,
      isSaved: false
    },
    {
      id: 30,
      name: "Sophia Wilson",
      role: "Technical Writer",
      company: "Atlassian",
      avatarInitials: "SW",
      interests: ["Technical Communication", "Developer Documentation", "Content Strategy"],
      location: "Sydney, Australia",
      bio: "Technical writer making complex software concepts accessible to developers and users.",
      connections: 12,
      isConnected: false,
      isSaved: false
    },
    {
      id: 31,
      name: "Lucas Johnson",
      role: "Platform Engineer",
      company: "Twilio",
      avatarInitials: "LJ",
      interests: ["Platform Engineering", "Communication APIs", "Developer Experience"],
      location: "San Francisco, CA",
      bio: "Platform engineer building communication infrastructure that powers global applications.",
      connections: 13,
      isConnected: false,
      isSaved: true
    },
    {
      id: 32,
      name: "Chloe Martinez",
      role: "Sales Director",
      company: "Zendesk",
      avatarInitials: "CM",
      interests: ["SaaS Sales", "Customer Relationship Management", "Team Leadership"],
      location: "San Francisco, CA",
      bio: "Sales director helping businesses improve their customer service and support operations.",
      connections: 22,
      isConnected: true,
      isSaved: false
    },
    {
      id: 33,
      name: "Benjamin Davis",
      role: "Site Reliability Engineer",
      company: "Dropbox",
      avatarInitials: "BD",
      interests: ["Site Reliability", "Infrastructure Monitoring", "Incident Response"],
      location: "San Francisco, CA",
      bio: "SRE ensuring high availability and performance of cloud storage systems.",
      connections: 10,
      isConnected: false,
      isSaved: false
    },
    {
      id: 34,
      name: "Zoe Chen",
      role: "Product Marketing Manager",
      company: "Square",
      avatarInitials: "ZC",
      interests: ["Product Marketing", "Fintech", "Small Business"],
      location: "San Francisco, CA",
      bio: "Product marketing manager focused on empowering small businesses with financial tools.",
      connections: 17,
      isConnected: true,
      isSaved: true
    },
    {
      id: 35,
      name: "Mason Rodriguez",
      role: "Machine Learning Engineer",
      company: "Pinterest",
      avatarInitials: "MR",
      interests: ["Machine Learning", "Computer Vision", "Recommendation Systems"],
      location: "San Francisco, CA",
      bio: "ML engineer developing recommendation algorithms that help users discover new ideas.",
      connections: 11,
      isConnected: false,
      isSaved: false
    },
    {
      id: 36,
      name: "Ava Thompson",
      role: "Operations Manager",
      company: "Lyft",
      avatarInitials: "AT",
      interests: ["Operations Management", "Logistics", "Process Improvement"],
      location: "San Francisco, CA",
      bio: "Operations manager optimizing transportation networks and rider experiences.",
      connections: 19,
      isConnected: false,
      isSaved: true
    },
    {
      id: 37,
      name: "Noah Garcia",
      role: "Security Analyst",
      company: "Cloudflare",
      avatarInitials: "NG",
      interests: ["Cybersecurity", "Network Security", "Threat Analysis"],
      location: "San Francisco, CA",
      bio: "Security analyst protecting internet infrastructure from cyber threats.",
      connections: 8,
      isConnected: true,
      isSaved: false
    },
    {
      id: 38,
      name: "Emma Lee",
      role: "Customer Success Manager",
      company: "Intercom",
      avatarInitials: "EL",
      interests: ["Customer Success", "Customer Experience", "Account Management"],
      location: "San Francisco, CA",
      bio: "Customer success manager helping businesses build better customer relationships.",
      connections: 15,
      isConnected: false,
      isSaved: false
    },
    {
      id: 39,
      name: "Liam Wilson",
      role: "Full Stack Developer",
      company: "Asana",
      avatarInitials: "LW",
      interests: ["Full Stack Development", "Productivity Tools", "Team Collaboration"],
      location: "San Francisco, CA",
      bio: "Full stack developer building tools that help teams work together more effectively.",
      connections: 12,
      isConnected: true,
      isSaved: true
    },
    {
      id: 40,
      name: "Mia Anderson",
      role: "Business Development",
      company: "Docker",
      avatarInitials: "MA",
      interests: ["Business Development", "Enterprise Sales", "Container Technology"],
      location: "San Francisco, CA",
      bio: "Business development professional driving adoption of containerization technologies.",
      connections: 16,
      isConnected: false,
      isSaved: false
    },
    {
      id: 41,
      name: "William Taylor",
      role: "Research Scientist",
      company: "NVIDIA",
      avatarInitials: "WT",
      interests: ["Computer Graphics", "GPU Computing", "AI Research"],
      location: "Santa Clara, CA",
      bio: "Research scientist advancing GPU technology for AI and high-performance computing.",
      connections: 7,
      isConnected: false,
      isSaved: true
    },
    {
      id: 42,
      name: "Charlotte Miller",
      role: "Legal Counsel",
      company: "Coinbase",
      avatarInitials: "CM",
      interests: ["Cryptocurrency Law", "Regulatory Compliance", "Financial Services"],
      location: "San Francisco, CA",
      bio: "Legal counsel navigating the complex regulatory landscape of cryptocurrency.",
      connections: 13,
      isConnected: true,
      isSaved: false
    },
    {
      id: 43,
      name: "James Harris",
      role: "Infrastructure Engineer",
      company: "HashiCorp",
      avatarInitials: "JH",
      interests: ["Infrastructure as Code", "Cloud Automation", "DevOps Tools"],
      location: "San Francisco, CA",
      bio: "Infrastructure engineer building tools that automate cloud infrastructure management.",
      connections: 14,
      isConnected: false,
      isSaved: false
    },
    {
      id: 44,
      name: "Harper Clark",
      role: "Revenue Operations",
      company: "Okta",
      avatarInitials: "HC",
      interests: ["Revenue Operations", "Sales Analytics", "Identity Management"],
      location: "San Francisco, CA",
      bio: "Revenue operations specialist optimizing sales processes and customer acquisition.",
      connections: 18,
      isConnected: true,
      isSaved: true
    },
    {
      id: 45,
      name: "Alexander Lewis",
      role: "Performance Engineer",
      company: "MongoDB",
      avatarInitials: "AL",
      interests: ["Database Performance", "Distributed Systems", "Query Optimization"],
      location: "New York, NY",
      bio: "Performance engineer optimizing database systems for large-scale applications.",
      connections: 9,
      isConnected: false,
      isSaved: false
    },
    {
      id: 46,
      name: "Scarlett Walker",
      role: "Community Manager",
      company: "Discord",
      avatarInitials: "SW",
      interests: ["Community Building", "Social Media", "Developer Relations"],
      location: "San Francisco, CA",
      bio: "Community manager fostering vibrant online communities and developer ecosystems.",
      connections: 21,
      isConnected: false,
      isSaved: true
    },
    {
      id: 47,
      name: "Henry Young",
      role: "Solutions Engineer",
      company: "Databricks",
      avatarInitials: "HY",
      interests: ["Data Engineering", "Apache Spark", "Machine Learning Platforms"],
      location: "San Francisco, CA",
      bio: "Solutions engineer helping organizations build data and AI platforms at scale.",
      connections: 11,
      isConnected: true,
      isSaved: false
    },
    {
      id: 48,
      name: "Luna Scott",
      role: "Design Operations",
      company: "Miro",
      avatarInitials: "LS",
      interests: ["Design Operations", "Design Systems", "Team Productivity"],
      location: "San Francisco, CA",
      bio: "Design operations specialist streamlining design workflows and collaboration processes.",
      connections: 16,
      isConnected: false,
      isSaved: false
    },
    {
      id: 49,
      name: "Sebastian Green",
      role: "Technical Product Manager",
      company: "Redis",
      avatarInitials: "SG",
      interests: ["Product Management", "Database Technology", "Developer Tools"],
      location: "Mountain View, CA",
      bio: "Technical product manager building developer tools and database solutions.",
      connections: 14,
      isConnected: true,
      isSaved: true
    },
    {
      id: 50,
      name: "Layla Adams",
      role: "Talent Acquisition",
      company: "Notion",
      avatarInitials: "LA",
      interests: ["Talent Acquisition", "People Operations", "Workplace Productivity"],
      location: "San Francisco, CA",
      bio: "Talent acquisition specialist building diverse and high-performing teams.",
      connections: 19,
      isConnected: false,
      isSaved: false
    },
    {
      id: 51,
      name: "Owen Baker",
      role: "Engineering Manager",
      company: "Vercel",
      avatarInitials: "OB",
      interests: ["Frontend Engineering", "Developer Experience", "Web Performance"],
      location: "San Francisco, CA",
      bio: "Engineering manager focused on developer experience and web performance optimization.",
      connections: 17,
      isConnected: false,
      isSaved: true
    },
    {
      id: 52,
      name: "Stella Nelson",
      role: "Data Analyst",
      company: "Snowflake",
      avatarInitials: "SN",
      interests: ["Data Analytics", "Business Intelligence", "Cloud Data Platforms"],
      location: "San Mateo, CA",
      bio: "Data analyst helping organizations unlock insights from their cloud data platforms.",
      connections: 12,
      isConnected: true,
      isSaved: false
    },
    {
      id: 53,
      name: "Jack Cooper",
      role: "Partner Engineer",
      company: "Segment",
      avatarInitials: "JC",
      interests: ["Partner Engineering", "Customer Data Platforms", "Integration"],
      location: "San Francisco, CA",
      bio: "Partner engineer building integrations that connect customer data across platforms.",
      connections: 10,
      isConnected: false,
      isSaved: false
    },
    {
      id: 54,
      name: "Aurora Phillips",
      role: "Brand Manager",
      company: "Canva",
      avatarInitials: "AP",
      interests: ["Brand Management", "Visual Design", "Creative Tools"],
      location: "Sydney, Australia",
      bio: "Brand manager making design accessible to everyone through intuitive creative tools.",
      connections: 15,
      isConnected: true,
      isSaved: true
    },
    {
      id: 55,
      name: "Grayson Wright",
      role: "Systems Administrator",
      company: "DigitalOcean",
      avatarInitials: "GW",
      interests: ["System Administration", "Cloud Infrastructure", "Developer Tools"],
      location: "New York, NY",
      bio: "Systems administrator managing cloud infrastructure for developers worldwide.",
      connections: 8,
      isConnected: false,
      isSaved: false
    }
  ];
  
  const suggestedConnections = [
    {
      id: 6,
      name: "Priya Sharma",
      role: "Marketing Director",
      company: "GlobalReach",
      avatarInitials: "PS",
      sharedInterests: ["Digital Marketing", "Brand Strategy"],
      sharedConnections: 3,
      reason: "Similar professional interests"
    },
    {
      id: 7,
      name: "Michael Thompson",
      role: "Lead Engineer",
      company: "CloudTech",
      avatarInitials: "MT",
      sharedInterests: ["Cloud Architecture", "DevOps"],
      sharedConnections: 2,
      reason: "Attended the same session"
    },
    {
      id: 8,
      name: "Amanda Garcia",
      role: "UX Director",
      company: "DesignHub",
      avatarInitials: "AG",
      sharedInterests: ["User Experience", "Design Systems"],
      sharedConnections: 4,
      reason: "You viewed similar profiles"
    }
  ];

  const toggleSaved = (id) => {
    console.log(`Toggle saved for attendee ${id}`);
    // In a real app, this would update state or make an API call
  };

  const connectWithAttendee = (id) => {
    console.log(`Connect with attendee ${id}`);
    // In a real app, this would update state or make an API call
  };

  return (
    <div className="bg-white flex min-w-60 flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Attendees</h1>
          <p className="text-gray-500">Discover and connect with event participants</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort by Relevance</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="company">Sort by Company</SelectItem>
              <SelectItem value="connections">Most Connections</SelectItem>
            </SelectContent>
          </Select>
          <div className="border rounded-md flex">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewType("list")} 
              className={viewType === "list" ? "bg-slate-100" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewType("grid")} 
              className={viewType === "grid" ? "bg-slate-100" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search attendees by name, company, or interests" className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2" onClick={() => setIsFilterOpen(true)}>
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Attendees</TabsTrigger>
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggested" className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Recommended Connections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {suggestedConnections.map((person) => (
              <Link to={`/attendees/${person.id}`} key={person.id}>
                <Card key={person.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="h-16 w-16 mb-3">
                        <Avatar
                          size={64}
                          name={person.name}
                          variant="marble"
                          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                        />
                      </div>
                      <h3 className="font-medium">{person.name}</h3>
                      <p className="text-sm text-gray-500">{person.role} at {person.company}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Why we suggested:</p>
                        <p className="text-sm">{person.reason}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Shared interests:</p>
                        <div className="flex flex-wrap gap-1">
                          {person.sharedInterests.map((interest, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{interest}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{person.sharedConnections} mutual connections</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <Button 
                        onClick={(e) => {
                          e.preventDefault();
                          connectWithAttendee(person.id);
                        }} 
                        className="w-full"
                      >
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <h2 className="text-lg font-semibold mt-6 mb-4">All Attendees</h2>
        </TabsContent>
      </Tabs>

      <ScrollArea className="flex-1">
        {viewType === "list" ? (
          <div className="space-y-3">
            {attendees.map((person) => (
              <Link to={`/attendees/${person.id}`} key={person.id} className="block mb-3">
                <Card key={person.id} className="p-0 overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12">
                          <Avatar
                            size={48}
                            name={person.name}
                            variant="marble"
                            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                          />
                        </div>
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{person.name}</h3>
                            <p className="text-sm text-gray-500">{person.role} at {person.company}</p>
                            
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {person.location}
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-2">
                              {person.interests.map((interest, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">{interest}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={person.isSaved ? "text-red-500" : "text-gray-500"}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleSaved(person.id);
                          }}
                        >
                          <Heart className="h-4 w-4" fill={person.isSaved ? "currentColor" : "none"} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        {!person.isConnected ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={(e) => {
                              e.preventDefault();
                              connectWithAttendee(person.id);
                            }}
                          >
                            Connect
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-green-700 bg-green-50">
                            Connected
                          </Badge>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-gray-500"
                              onClick={(e) => e.preventDefault()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
                            <DropdownMenuItem>View Company</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {person.isConnected && (
                              <DropdownMenuItem className="text-red-500">
                                Remove Connection
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {attendees.map((person) => (
              <Link to={`/attendees/${person.id}`} key={person.id} className="block">
                <Card key={person.id} className="overflow-hidden hover:shadow-md transition-all h-[380px] flex flex-col">
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-end mb-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-6 w-6 ${person.isSaved ? "text-red-500" : "text-gray-400"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSaved(person.id);
                        }}
                      >
                        <Heart className="h-4 w-4" fill={person.isSaved ? "currentColor" : "none"} />
                      </Button>
                    </div>
                    
                    <div className="flex flex-col items-center text-center mb-3">
                      <div className="h-14 w-14 mb-2">
                        <Avatar
                          size={56}
                          name={person.name}
                          variant="marble"
                          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                        />
                      </div>
                      <h3 className="font-medium text-sm">{person.name}</h3>
                      <p className="text-xs text-gray-500">{person.role} at {person.company}</p>
                      
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {person.location}
                      </div>
                    </div>
                    
                    <div className="text-xs text-center text-gray-600 mb-3 flex-1">
                      <p>{person.bio.substring(0, 60)}...</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-1 mb-4 min-h-[48px]">
                      {person.interests.slice(0, 3).map((interest, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{interest}</Badge>
                      ))}
                      {person.interests.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{person.interests.length - 3}</Badge>
                      )}
                    </div>
                    
                    <div className="flex justify-center gap-2 mt-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-xs px-2"
                        onClick={(e) => e.preventDefault()}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      
                      {!person.isConnected ? (
                        <Button 
                          size="sm" 
                          className="flex-1 text-xs px-2"
                          onClick={(e) => {
                            e.preventDefault();
                            connectWithAttendee(person.id);
                          }}
                        >
                          Connect
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-xs px-2"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Meet
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </ScrollArea>
      
      <FilterPanel isOpen={isFilterOpen} onOpenChange={setIsFilterOpen} />
    </div>
  );
};
