import React, { useState } from "react";
import { Users, Package, Tag } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { FilterPanel } from "./FilterPanel";
import { AttendeesList } from "./AttendeesList";
import { ProductsList } from "./ProductsList";
import { AllExhibitors } from "@/components/exhibitors/AllExhibitors";
import { EmptyState } from "./EmptyState";

export const ExploreContent = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchTerm, setSearchTerm] = useState("");
  
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
      isSaved: false,
      isConnected: false
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
      isSaved: true,
      isConnected: true
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
      isSaved: false,
      isConnected: false
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
      isSaved: false,
      isConnected: true
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
      isSaved: true,
      isConnected: false
    },
    {
      id: 6,
      name: "Aisha Khan",
      role: "Marketing Director",
      company: "GlobalReach",
      avatarInitials: "AK",
      interests: ["Digital Marketing", "Brand Strategy", "Content Creation"],
      location: "Seattle, WA",
      bio: "Marketing strategist with expertise in global campaign management and brand development.",
      connections: 15,
      isSaved: false,
      isConnected: false
    },
    {
      id: 7,
      name: "Mike Thompson",
      role: "Innovation Lead",
      company: "FutureTech",
      avatarInitials: "MT",
      interests: ["IoT", "Robotics", "Smart Cities"],
      location: "Portland, OR",
      bio: "Innovation strategist focused on emerging technologies and smart city solutions.",
      connections: 18,
      isSaved: false,
      isConnected: true
    },
    {
      id: 8,
      name: "Jessica Davis",
      role: "AI Engineer",
      company: "AI Dynamics",
      avatarInitials: "JD",
      interests: ["Artificial Intelligence", "Deep Learning", "Neural Networks"],
      location: "Los Angeles, CA",
      bio: "AI engineer specializing in deep learning and neural network architectures.",
      connections: 10,
      isSaved: true,
      isConnected: false
    },
    {
      id: 9,
      name: "Kevin Patel",
      role: "Cloud Architect",
      company: "CloudScale",
      avatarInitials: "KP",
      interests: ["Cloud Computing", "AWS", "Azure"],
      location: "Dallas, TX",
      bio: "Cloud architect with expertise in AWS and Azure cloud platforms.",
      connections: 14,
      isSaved: false,
      isConnected: true
    },
    {
      id: 10,
      name: "Samantha Rodriguez",
      role: "Cybersecurity Analyst",
      company: "SecureNet",
      avatarInitials: "SR",
      interests: ["Cybersecurity", "Network Security", "Data Protection"],
      location: "Atlanta, GA",
      bio: "Cybersecurity analyst focused on network security and data protection strategies.",
      connections: 11,
      isSaved: true,
      isConnected: false
    },
    {
      id: 11,
      name: "Brian Kim",
      role: "Software Developer",
      company: "CodeCraft",
      avatarInitials: "BK",
      interests: ["Software Development", "Web Development", "Mobile Apps"],
      location: "Miami, FL",
      bio: "Software developer specializing in web and mobile app development.",
      connections: 9,
      isSaved: false,
      isConnected: true
    },
    {
      id: 12,
      name: "Ashley Nguyen",
      role: "Data Analyst",
      company: "DataWise",
      avatarInitials: "AN",
      interests: ["Data Analysis", "Business Intelligence", "SQL"],
      location: "Denver, CO",
      bio: "Data analyst with expertise in business intelligence and SQL.",
      connections: 13,
      isSaved: true,
      isConnected: false
    },
    {
      id: 13,
      name: "Christopher Garcia",
      role: "Project Manager",
      company: "ProjectLead",
      avatarInitials: "CG",
      interests: ["Project Management", "Agile", "Scrum"],
      location: "Phoenix, AZ",
      bio: "Project manager specializing in Agile and Scrum methodologies.",
      connections: 16,
      isSaved: false,
      isConnected: true
    },
    {
      id: 14,
      name: "Tiffany Lewis",
      role: "UX Designer",
      company: "DesignMinds",
      avatarInitials: "TL",
      interests: ["UX Design", "UI Design", "User Research"],
      location: "Minneapolis, MN",
      bio: "UX designer focused on user-centered design and user research.",
      connections: 17,
      isSaved: true,
      isConnected: false
    },
    {
      id: 15,
      name: "Brandon Hall",
      role: "Sales Manager",
      company: "SalesForce Pro",
      avatarInitials: "BH",
      interests: ["Sales Management", "CRM", "Lead Generation"],
      location: "St. Louis, MO",
      bio: "Sales manager specializing in CRM and lead generation strategies.",
      connections: 19,
      isSaved: false,
      isConnected: true
    },
    {
      id: 16,
      name: "Stephanie Young",
      role: "Marketing Specialist",
      company: "MarketSmart",
      avatarInitials: "SY",
      interests: ["Marketing", "Social Media", "SEO"],
      location: "Tampa, FL",
      bio: "Marketing specialist with expertise in social media and SEO.",
      connections: 21,
      isSaved: true,
      isConnected: false
    },
    {
      id: 17,
      name: "Justin King",
      role: "Financial Analyst",
      company: "FinanceFirst",
      avatarInitials: "JK",
      interests: ["Finance", "Investment", "Analysis"],
      location: "Charlotte, NC",
      bio: "Financial analyst specializing in investment and financial analysis.",
      connections: 22,
      isSaved: false,
      isConnected: true
    },
    {
      id: 18,
      name: "Megan Wright",
      role: "HR Manager",
      company: "PeoplePower",
      avatarInitials: "MW",
      interests: ["Human Resources", "Recruiting", "Employee Relations"],
      location: "Nashville, TN",
      bio: "HR manager focused on recruiting and employee relations.",
      connections: 23,
      isSaved: true,
      isConnected: false
    },
    {
      id: 19,
      name: "Adam Scott",
      role: "Operations Manager",
      company: "OpEx Solutions",
      avatarInitials: "AS",
      interests: ["Operations Management", "Supply Chain", "Logistics"],
      location: "Indianapolis, IN",
      bio: "Operations manager specializing in supply chain and logistics.",
      connections: 24,
      isSaved: false,
      isConnected: true
    },
    {
      id: 20,
      name: "Lauren Green",
      role: "Legal Counsel",
      company: "LawSecure",
      avatarInitials: "LG",
      interests: ["Legal", "Compliance", "Contracts"],
      location: "Columbus, OH",
      bio: "Legal counsel specializing in compliance and contracts.",
      connections: 26,
      isSaved: true,
      isConnected: false
    },
    {
      id: 21,
      name: "Ryan Carter",
      role: "IT Director",
      company: "TechGlobal",
      avatarInitials: "RC",
      interests: ["IT Management", "Infrastructure", "Networking"],
      location: "Sacramento, CA",
      bio: "IT director with expertise in infrastructure and networking.",
      connections: 27,
      isSaved: false,
      isConnected: true
    },
    {
      id: 22,
      name: "Nicole Baker",
      role: "Quality Assurance Manager",
      company: "QualityFirst",
      avatarInitials: "NB",
      interests: ["Quality Assurance", "Testing", "Automation"],
      location: "Hartford, CT",
      bio: "Quality assurance manager specializing in testing and automation.",
      connections: 28,
      isSaved: true,
      isConnected: false
    },
    {
      id: 23,
      name: "Eric Reed",
      role: "Business Development Manager",
      company: "BizDev Pro",
      avatarInitials: "ER",
      interests: ["Business Development", "Sales", "Partnerships"],
      location: "Oklahoma City, OK",
      bio: "Business development manager focused on sales and partnerships.",
      connections: 29,
      isSaved: false,
      isConnected: true
    },
    {
      id: 24,
      name: "Melissa Morgan",
      role: "Communications Director",
      company: "CommunicateNow",
      avatarInitials: "MM",
      interests: ["Communications", "PR", "Media Relations"],
      location: "Salt Lake City, UT",
      bio: "Communications director with expertise in PR and media relations.",
      connections: 30,
      isSaved: true,
      isConnected: false
    },
    {
      id: 25,
      name: "Gregory Hill",
      role: "Research Scientist",
      company: "ScienceLab",
      avatarInitials: "GH",
      interests: ["Research", "Science", "Innovation"],
      location: "Albuquerque, NM",
      bio: "Research scientist focused on science and innovation.",
      connections: 31,
      isSaved: false,
      isConnected: true
    },
    {
      id: 26,
      name: "Katherine Ross",
      role: "Training Specialist",
      company: "TrainRight",
      avatarInitials: "KR",
      interests: ["Training", "Development", "Education"],
      location: "Las Vegas, NV",
      bio: "Training specialist focused on development and education.",
      connections: 32,
      isSaved: true,
      isConnected: false
    },
    {
      id: 27,
      name: "Patrick Butler",
      role: "Customer Service Manager",
      company: "ServiceFirst",
      avatarInitials: "PB",
      interests: ["Customer Service", "Support", "Relations"],
      location: "New Orleans, LA",
      bio: "Customer service manager focused on support and relations.",
      connections: 33,
      isSaved: false,
      isConnected: true
    },
    {
      id: 28,
      name: "Jacqueline Perry",
      role: "Logistics Coordinator",
      company: "LogisticsLink",
      avatarInitials: "JP",
      interests: ["Logistics", "Supply Chain", "Coordination"],
      location: "Milwaukee, WI",
      bio: "Logistics coordinator specializing in supply chain coordination.",
      connections: 34,
      isSaved: true,
      isConnected: false
    },
    {
      id: 29,
      name: "Jose Barnes",
      role: "Network Administrator",
      company: "NetAdmin Pro",
      avatarInitials: "JB",
      interests: ["Networking", "Administration", "IT"],
      location: "Richmond, VA",
      bio: "Network administrator with expertise in IT administration.",
      connections: 35,
      isSaved: false,
      isConnected: true
    },
    {
      id: 30,
      name: "Angela Gray",
      role: "Compliance Officer",
      company: "ComplianceNow",
      avatarInitials: "AG",
      interests: ["Compliance", "Legal", "Regulations"],
      location: "Kansas City, MO",
      bio: "Compliance officer specializing in legal regulations.",
      connections: 36,
      isSaved: true,
      isConnected: false
    },
    {
      id: 31,
      name: "Harold Hayes",
      role: "Technical Support Specialist",
      company: "TechSupport Inc",
      avatarInitials: "HH",
      interests: ["Technical Support", "IT", "Troubleshooting"],
      location: "Omaha, NE",
      bio: "Technical support specialist focused on IT troubleshooting.",
      connections: 37,
      isSaved: false,
      isConnected: true
    },
    {
      id: 32,
      name: "Carolyn Price",
      role: "Data Security Analyst",
      company: "SecureData Pro",
      avatarInitials: "CP",
      interests: ["Data Security", "Cybersecurity", "Encryption"],
      location: "Honolulu, HI",
      bio: "Data security analyst specializing in cybersecurity and encryption.",
      connections: 38,
      isSaved: true,
      isConnected: false
    },
    {
      id: 33,
      name: "Terry Long",
      role: "Web Designer",
      company: "WebDesign Masters",
      avatarInitials: "TL",
      interests: ["Web Design", "UI/UX", "Front-end Development"],
      location: "Anchorage, AK",
      bio: "Web designer specializing in UI/UX and front-end development.",
      connections: 39,
      isSaved: false,
      isConnected: true
    },
    {
      id: 34,
      name: "Beverly Sanders",
      role: "Database Administrator",
      company: "DataBase Solutions",
      avatarInitials: "BS",
      interests: ["Database Administration", "SQL", "Data Management"],
      location: "Boise, ID",
      bio: "Database administrator with expertise in SQL and data management.",
      connections: 40,
      isSaved: true,
      isConnected: false
    },
    {
      id: 35,
      name: "Lawrence Collins",
      role: "Systems Analyst",
      company: "Systematic Analysis",
      avatarInitials: "LC",
      interests: ["Systems Analysis", "IT", "Process Improvement"],
      location: "Jackson, MS",
      bio: "Systems analyst focused on IT and process improvement.",
      connections: 41,
      isSaved: false,
      isConnected: true
    },
    {
      id: 36,
      name: "Lisa Chen",
      role: "Research Director",
      company: "BioInnovate",
      avatarInitials: "LC",
      interests: ["Biotechnology", "Healthcare", "Research"],
      location: "San Diego, CA",
      bio: "Leading research initiatives in biotechnology and healthcare innovation.",
      connections: 25,
      isSaved: true,
      isConnected: false
    }
  ];
  
  const products = [
    {
      id: "1",
      name: "Smart Analytics Dashboard",
      company: "Alphacore",
      description: "Real-time data analytics platform with customizable dashboards and AI-powered insights.",
      price: "$1,299",
      category: "Software",
      tags: ["Analytics", "AI", "Dashboard"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#0a4a87",
      isSaved: true,
    },
    {
      id: "2",
      name: "NeuraMesh Learning Framework",
      company: "Mind Mesh",
      description: "Enterprise-grade machine learning framework optimized for large language models.",
      price: "$2,499",
      category: "AI",
      tags: ["Machine Learning", "Framework", "Enterprise"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#5e35b1",
      isSaved: false,
    },
    {
      id: "3",
      name: "Collekt Payment Gateway",
      company: "Collekt Payments",
      description: "Secure payment processing solution with multi-currency support and fraud protection.",
      price: "$599/mo",
      category: "Fintech",
      tags: ["Payments", "Security", "Gateway"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#2c1a4d",
      isSaved: false,
    },
    {
      id: "4",
      name: "IconStream Design Suite",
      company: "Fluid Icons",
      description: "Comprehensive icon design and management solution for design teams.",
      price: "$899",
      category: "Design",
      tags: ["Icons", "Design", "Creative"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#1976d2",
      isSaved: true,
    },
    {
      id: "5",
      name: "DataViz Pro",
      company: "Kinetica",
      description: "Advanced data visualization toolkit with 3D rendering and interactive elements.",
      price: "$1,899",
      category: "Software",
      tags: ["Visualization", "Data", "Charts"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#ff6d00",
      isSaved: false,
    },
    {
      id: "6",
      name: "SeasmePay Mobile POS",
      company: "Seasme Pay",
      description: "Mobile point-of-sale solution for small businesses with hardware and software bundle.",
      price: "$399",
      category: "Fintech",
      tags: ["Mobile", "POS", "Retail"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#00c853",
      isSaved: false,
    },
    {
      id: "7",
      name: "CloudSync Pro",
      company: "CloudTech Solutions",
      description: "Enterprise cloud synchronization and backup solution with advanced security features.",
      price: "$899/year",
      category: "Cloud Services",
      tags: ["Cloud", "Security", "Enterprise"],
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#2196f3",
      isSaved: false,
    },
    {
      id: "8",
      name: "AI Assistant",
      company: "IntelliAssist",
      description: "AI-powered virtual assistant for automating tasks and improving productivity.",
      price: "$49/month",
      category: "AI",
      tags: ["AI", "Assistant", "Productivity"],
      image: "https://images.unsplash.com/photo-1517299321609-e641395640c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#3f51b5",
      isSaved: true,
    },
    {
      id: "9",
      name: "SecureVPN",
      company: "CyberGuard",
      description: "Secure and private VPN service for protecting your online activity.",
      price: "$79/year",
      category: "Security",
      tags: ["VPN", "Security", "Privacy"],
      image: "https://images.unsplash.com/photo-1485291571150-772bcfc06961?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#607d8b",
      isSaved: false,
    },
    {
      id: "10",
      name: "ProjectFlow",
      company: "TaskMgt",
      description: "Project management software for teams to collaborate and track progress.",
      price: "$29/month",
      category: "Software",
      tags: ["Project Management", "Collaboration", "Productivity"],
      image: "https://images.unsplash.com/photo-1505373479-60b6ba1299cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#009688",
      isSaved: true,
    },
    {
      id: "11",
      name: "CodeAssist",
      company: "DevTools",
      description: "AI-powered code completion and debugging tool for developers.",
      price: "$99/year",
      category: "Development",
      tags: ["AI", "Coding", "Debugging"],
      image: "https://images.unsplash.com/photo-1542903660-d0a8e7c42771?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#795548",
      isSaved: false,
    },
    {
      id: "12",
      name: "DataSecure",
      company: "InfoProtect",
      description: "Data encryption and security solution for protecting sensitive information.",
      price: "$149/year",
      category: "Security",
      tags: ["Data Security", "Encryption", "Privacy"],
      image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#9c27b0",
      isSaved: true,
    },
    {
      id: "13",
      name: "CloudBackup",
      company: "Backup Solutions",
      description: "Automated cloud backup and recovery solution for businesses.",
      price: "$199/year",
      category: "Cloud Services",
      tags: ["Cloud", "Backup", "Recovery"],
      image: "https://images.unsplash.com/photo-1516116216624-53cf6ba9439b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#673ab7",
      isSaved: false,
    },
    {
      id: "14",
      name: "AI Translator",
      company: "LingoAI",
      description: "AI-powered language translation tool for accurate and fast translations.",
      price: "$59/month",
      category: "AI",
      tags: ["AI", "Translation", "Language"],
      image: "https://images.unsplash.com/photo-1507838153414-b4b79886a8a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#e91e63",
      isSaved: true,
    },
    {
      id: "15",
      name: "SecureEmail",
      company: "EmailGuard",
      description: "Encrypted email service for secure and private communication.",
      price: "$69/year",
      category: "Security",
      tags: ["Email", "Security", "Privacy"],
      image: "https://images.unsplash.com/photo-1494790108377-bef9c29bca4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#f44336",
      isSaved: false,
    },
    {
      id: "16",
      name: "TaskMaster",
      company: "Task Solutions",
      description: "Task management and collaboration tool for teams.",
      price: "$39/month",
      category: "Software",
      tags: ["Task Management", "Collaboration", "Productivity"],
      image: "https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#e64a19",
      isSaved: true,
    },
    {
      id: "17",
      name: "CodeVerifier",
      company: "DevTools",
      description: "Automated code review and verification tool for developers.",
      price: "$129/year",
      category: "Development",
      tags: ["Code Review", "Verification", "Development"],
      image: "https://images.unsplash.com/photo-1493723843750-57299e8918f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#ff5722",
      isSaved: false,
    },
    {
      id: "18",
      name: "DataMiner",
      company: "InfoExtract",
      description: "Data mining and extraction tool for extracting valuable insights.",
      price: "$179/year",
      category: "Analytics",
      tags: ["Data Mining", "Extraction", "Analytics"],
      image: "https://images.unsplash.com/photo-1488590528227-984c35dad8c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#6d4c41",
      isSaved: true,
    },
    {
      id: "19",
      name: "CloudMonitor",
      company: "Cloud Solutions",
      description: "Cloud monitoring and management tool for optimizing cloud resources.",
      price: "$249/year",
      category: "Cloud Services",
      tags: ["Cloud", "Monitoring", "Management"],
      image: "https://images.unsplash.com/photo-1518770660439-464ef5093ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#8d6e63",
      isSaved: false,
    },
    {
      id: "20",
      name: "AI Writer",
      company: "ContentAI",
      description: "AI-powered content generation tool for creating high-quality content.",
      price: "$79/month",
      category: "AI",
      tags: ["AI", "Content Generation", "Writing"],
      image: "https://images.unsplash.com/photo-1497034825429-c343dd07b358?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#a1887f",
      isSaved: true,
    },
    {
      id: "21",
      name: "SecureDrive",
      company: "DataGuard",
      description: "Encrypted cloud storage solution for secure file storage and sharing.",
      price: "$89/year",
      category: "Security",
      tags: ["Cloud Storage", "Encryption", "Privacy"],
      image: "https://images.unsplash.com/photo-1504328345606-18925a4c3e13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#bcaaa4",
      isSaved: false,
    },
    {
      id: "22",
      name: "TaskOrganizer",
      company: "Task Solutions",
      description: "Task organization and prioritization tool for individuals and teams.",
      price: "$49/month",
      category: "Software",
      tags: ["Task Organization", "Prioritization", "Productivity"],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#cddc39",
      isSaved: true,
    },
    {
      id: "23",
      name: "CodeOptimizer",
      company: "DevTools",
      description: "Automated code optimization tool for improving code performance.",
      price: "$139/year",
      category: "Development",
      tags: ["Code Optimization", "Performance", "Development"],
      image: "https://images.unsplash.com/photo-1493723843750-57299e8918f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#d4e157",
      isSaved: false,
    },
    {
      id: "24",
      name: "DataAnalyzer",
      company: "InfoExtract",
      description: "Data analysis and reporting tool for creating insightful reports.",
      price: "$189/year",
      category: "Analytics",
      tags: ["Data Analysis", "Reporting", "Analytics"],
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#e0f2f1",
      isSaved: true,
    },
    {
      id: "25",
      name: "CloudBalancer",
      company: "Cloud Solutions",
      description: "Cloud load balancing and scaling tool for optimizing cloud resources.",
      price: "$259/year",
      category: "Cloud Services",
      tags: ["Cloud", "Load Balancing", "Scaling"],
      image: "https://images.unsplash.com/photo-1486312339633-a5491698afc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#e0f2f1",
      isSaved: false,
    }
  ];
  
  const filteredAttendees = attendees.filter(attendee => 
    searchTerm === "" || 
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredProducts = products.filter(product => 
    searchTerm === "" || 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Explore</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Discover attendees, products, and exhibitors at AI Summit 2026</p>
      </div>
      
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 w-fit">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    activeTab === "products"
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  <span>Products</span>
                </button>
                <button
                  onClick={() => setActiveTab("exhibitors")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    activeTab === "exhibitors"
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <Tag className="h-4 w-4" />
                  <span>Exhibitors</span>
                </button>
                <button
                  onClick={() => setActiveTab("attendees")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    activeTab === "attendees"
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Attendees</span>
                  <span className="inline sm:hidden">People</span>
                </button>
              </div>
            </div>

            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              viewMode={viewMode}
              setViewMode={setViewMode}
              activeTab={activeTab}
            />
            
            <div className="mt-6">
              {activeTab === "attendees" && (
                filteredAttendees.length > 0 ? (
                  <AttendeesList attendees={filteredAttendees} viewMode={viewMode} />
                ) : (
                  <EmptyState type="attendees" />
                )
              )}
              
              {activeTab === "products" && (
                filteredProducts.length > 0 ? (
                  <ProductsList products={filteredProducts} viewMode={viewMode} />
                ) : (
                  <EmptyState type="products" />
                )
              )}
              
              {activeTab === "exhibitors" && (
                <AllExhibitors 
                  viewMode="list"
                  searchQuery={searchTerm}
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="w-80 shrink-0">
          <FilterPanel activeTab={activeTab} defaultExpanded={true} />
        </div>
      </div>
    </div>
  );
};
