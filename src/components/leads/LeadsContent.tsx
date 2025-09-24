import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Download, Plus, Star, CheckCircle, Clock, Heart, MessageSquare, Mail, Phone, Calendar, ExternalLink, Building, MoreHorizontal, TagIcon, Edit, UserPlus, Bookmark, Settings, ArrowRight, Check, X, RefreshCw, MapPin, Users, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperTitle, StepperDescription, StepperSeparator } from "@/components/ui/stepper";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { LeadsAnalytics } from "./LeadsAnalytics";

// Import CRM logos
import hubspotLogo from "@/assets/hubspot-logo.png";
import salesforceLogo from "@/assets/salesforce-logo.png";
import zohoLogo from "@/assets/zoho-logo.png";
import pipedriveLogo from "@/assets/pipedrive-logo.png";


export const LeadsContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showCrmModal, setShowCrmModal] = useState(false);
  const [crmStep, setCrmStep] = useState(0);
  const [selectedCrm, setSelectedCrm] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [syncConfig, setSyncConfig] = useState({
    direction: "one-way",
    leadTypes: "all",
    syncTrigger: "creation"
  });
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState("");

  // CRM platforms data
  const crmPlatforms = [
    {
      id: "hubspot",
      name: "HubSpot",
      description: "All-in-one CRM platform",
      logo: hubspotLogo,
      popular: true
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "World's #1 CRM platform",
      logo: salesforceLogo,
      popular: true
    },
    {
      id: "zoho",
      name: "Zoho CRM",
      description: "Complete CRM solution",
      logo: zohoLogo,
      popular: false
    },
    {
      id: "pipedrive",
      name: "Pipedrive",
      description: "Sales-focused CRM",
      logo: pipedriveLogo,
      popular: false
    }
  ];

  const leads = [{
    id: 1,
    name: "Michael Johnson",
    company: "TechCorp",
    position: "CTO",
    email: "michael@techcorp.com",
    phone: "+1 (555) 123-4567",
    status: "New",
    priority: "Hot",
    lastContact: "2023-06-10",
    tags: ["AI", "Enterprise"],
    notes: "Met at the AI panel discussion. Interested in our enterprise solutions.",
    avatar: "MJ",
    leadFormInputs: {
      fullName: "Michael Johnson",
      email: "michael@techcorp.com", 
      company: "TechCorp",
      phoneNumber: "+1 (555) 123-4567",
      emailAddress: "michael@techcorp.com",
      interestedIn: "Enterprise AI Solutions",
      budgetRange: "$50K - $100K",
      timeframe: "Q1 2024",
      decisionMaker: "Yes",
      currentSolution: "Legacy system",
      painPoints: "Scalability issues",
      message: "Looking for scalable AI solutions for our enterprise needs."
    },
    meetings: [{
      id: 1,
      date: "2023-06-15",
      time: "10:00 AM",
      status: "Scheduled"
    }]
  }, {
    id: 2,
    name: "Sarah Williams",
    company: "Innovation Labs",
    position: "Head of Research",
    email: "sarah@innovationlabs.com",
    phone: "+1 (555) 987-6543",
    status: "In Progress",
    priority: "Warm",
    lastContact: "2023-06-08",
    tags: ["Research", "Machine Learning"],
    notes: "Discussed potential partnership for ML research. Follow up next week.",
    avatar: "SW",
    leadFormInputs: {
      fullName: "Sarah Williams",
      email: "sarah@innovationlabs.com",
      company: "Innovation Labs",
      phoneNumber: "+1 (555) 987-6543",
      emailAddress: "sarah@innovationlabs.com",
      interestedIn: "ML Research Partnership",
      budgetRange: "$25K - $50K",
      timeframe: "Q2 2024",
      decisionMaker: "Partial",
      currentSolution: "In-house development",
      painPoints: "Resource constraints",
      message: "Interested in collaborating on machine learning research projects."
    },
    meetings: []
  }, {
    id: 3,
    name: "David Kim",
    company: "Global Solutions",
    position: "CEO",
    email: "david@globalsolutions.com",
    phone: "+1 (555) 456-7890",
    status: "Qualified",
    priority: "Hot",
    lastContact: "2023-06-12",
    tags: ["Executive", "Decision Maker"],
    notes: "Very interested in our platform. Requested a detailed proposal by end of month.",
    avatar: "DK",
    leadFormInputs: {
      fullName: "David Kim",
      email: "david@globalsolutions.com",
      company: "Global Solutions",
      phoneNumber: "+1 (555) 456-7890",
      emailAddress: "david@globalsolutions.com",
      interestedIn: "Complete Platform Solution",
      budgetRange: "$100K+",
      timeframe: "Immediate",
      decisionMaker: "Yes",
      currentSolution: "Multiple vendors",
      painPoints: "Integration complexity",
      message: "Need a comprehensive solution to replace multiple vendors and simplify our tech stack."
    },
    meetings: [{
      id: 2,
      date: "2023-06-20",
      time: "2:00 PM",
      status: "Pending"
    }]
  }, {
    id: 4,
    name: "Jennifer Lee",
    company: "DataTech",
    position: "Director of Operations",
    email: "jennifer@datatech.com",
    phone: "+1 (555) 234-5678",
    status: "New",
    priority: "Cold",
    lastContact: "2023-06-07",
    tags: ["Data Science", "Infrastructure"],
    notes: "Briefly discussed at the networking event. Might be interested in our data solutions.",
    avatar: "JL",
    leadFormInputs: {
      fullName: "Jennifer Lee",
      email: "jennifer@datatech.com",
      company: "DataTech",
      phoneNumber: "+1 (555) 234-5678",
      emailAddress: "jennifer@datatech.com",
      interestedIn: "Data Analytics Tools",
      budgetRange: "$10K - $25K",
      timeframe: "Q3 2024",
      decisionMaker: "No",
      currentSolution: "Basic tools",
      painPoints: "Data quality issues",
      message: "Exploring options to improve our data analytics capabilities."
    },
    meetings: []
  }, {
    id: 5,
    name: "Robert Chen",
    company: "FutureTech",
    position: "VP of Engineering",
    email: "robert@futuretech.com",
    phone: "+1 (555) 876-5432",
    status: "Qualified",
    priority: "Warm",
    lastContact: "2023-06-11",
    tags: ["Engineering", "Cloud"],
    notes: "Had a detailed discussion about our cloud offerings. Very promising lead.",
    avatar: "RC",
    leadFormInputs: {
      fullName: "Robert Chen",
      email: "robert@futuretech.com",
      company: "FutureTech",
      phoneNumber: "+1 (555) 876-5432",
      emailAddress: "robert@futuretech.com",
      interestedIn: "Cloud Infrastructure",
      budgetRange: "$75K - $100K",
      timeframe: "Q4 2023",
      decisionMaker: "Partial",
      currentSolution: "AWS",
      painPoints: "Cost optimization",
      message: "Looking for more cost-effective cloud solutions while maintaining performance."
    },
    meetings: [{
      id: 3,
      date: "2023-06-18",
      time: "11:30 AM",
      status: "Confirmed"
    }]
  }];

  const filteredLeads = leads.filter(lead => {
    const searchString = searchQuery.toLowerCase();
    return lead.name.toLowerCase().includes(searchString) || 
           lead.company.toLowerCase().includes(searchString) || 
           lead.position.toLowerCase().includes(searchString) || 
           lead.email.toLowerCase().includes(searchString) || 
           lead.tags.some(tag => tag.toLowerCase().includes(searchString));
  });

  const handleBookmark = (id, name) => {
    toast({
      title: "Bookmarked",
      description: `${name} has been bookmarked.`
    });
  };

  const handleScheduleMeeting = (id, name) => {
    toast({
      title: "Schedule meeting",
      description: `Opening scheduler for ${name}.`
    });
  };

  const handleSendMessage = (id, name) => {
    toast({
      title: "Send message",
      description: `Opening message composer for ${name}.`
    });
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setNotesValue(lead.notes);
    setEditingNotes(false);
  };

  const handleAddLead = () => {
    setShowAddLeadModal(true);
  };

  const handleSaveNotes = () => {
    setEditingNotes(false);
    toast({
      title: "Notes Updated",
      description: "Lead notes have been saved successfully."
    });
  };

  // CRM Integration handlers
  const handleCrmIntegration = () => {
    setShowCrmModal(true);
    // For demo purposes, let's show connected state
    const demoConnectedCrm = crmPlatforms[0]; // HubSpot as example
    if (localStorage.getItem('crm-connected')) {
      setSelectedCrm(demoConnectedCrm);
      setIsConnected(true);
      setCrmStep(2); // Show connected status
    } else {
      setCrmStep(0);
      setSelectedCrm(null);
      setIsConnected(false);
      setIsConnecting(false);
    }
  };

  const handleCrmSelection = (crm) => {
    setSelectedCrm(crm);
    setCrmStep(1);
  };

  const handleCrmConnect = async () => {
    setIsConnecting(true);
    
    // Simulate OAuth flow
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setCrmStep(2);
      // Persist connection state
      localStorage.setItem('crm-connected', 'true');
      localStorage.setItem('connected-crm', JSON.stringify(selectedCrm));
      toast({
        title: "Connected Successfully",
        description: `Connected to ${selectedCrm.name} successfully.`
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedCrm(null);
    setCrmStep(0);
    localStorage.removeItem('crm-connected');
    localStorage.removeItem('connected-crm');
    toast({
      title: "Disconnected",
      description: "CRM integration has been disconnected."
    });
  };

  const handleSyncConfiguration = () => {
    setCrmStep(3);
  };

  const handleFinalizeCrmSetup = () => {
    setShowCrmModal(false);
    localStorage.setItem('crm-setup-complete', 'true');
    toast({
      title: "CRM Integration Complete",
      description: `${selectedCrm.name} integration has been set up successfully. Leads will now sync automatically.`
    });
  };

  const statusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "In Progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "Qualified":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Closed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Lost":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "Hot":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Warm":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "Cold":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityDot = (priority) => {
    switch (priority) {
      case "Hot":
        return <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>;
      case "Warm":
        return <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>;
      case "Cold":
        return <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>;
    }
  };

  const formatDate = (dateString) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex h-full">
      <div className="bg-white dark:bg-gray-900 flex min-w-60 flex-col overflow-auto items-stretch flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Leads</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your potential customers and opportunities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleCrmIntegration}>
            <Settings className="h-4 w-4" />
            CRM Integration
          </Button>
          <Button className="gap-2" onClick={handleAddLead}>
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search leads by name, company, tag, or email" 
            className="pl-9 border-gray-200 dark:border-gray-700" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1">
          <TabsTrigger value="all" className="text-sm">All Leads</TabsTrigger>
          <TabsTrigger value="hot" className="text-sm flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            Hot
          </TabsTrigger>
          <TabsTrigger value="warm" className="text-sm flex items-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
            Warm
          </TabsTrigger>
          <TabsTrigger value="cold" className="text-sm flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            Cold
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredLeads.map(lead => (
          <Card 
            key={lead.id} 
            className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 cursor-pointer"
            onClick={() => handleViewLead(lead)}
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row p-4">
                <div className="md:flex-1">
                  <div className="flex items-start">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarFallback className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                        {lead.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-lg dark:text-white">{lead.name}</h3>
                        <Badge className={`${priorityColor(lead.priority)}`}>
                          {lead.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Building className="h-3.5 w-3.5 mr-1" />
                        <span>{lead.company}</span>
                        <span className="mx-1">•</span>
                        <span>{lead.position}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {lead.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex md:flex-col justify-between md:items-end mt-4 md:mt-0 gap-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Last Contact: {formatDate(lead.lastContact)}</span>
                  </div>
                  
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => handleBookmark(lead.id, lead.name)}>
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => handleScheduleMeeting(lead.id, lead.name)}>
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => handleSendMessage(lead.id, lead.name)}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="h-8" onClick={() => handleViewLead(lead)}>
                      Lead Details
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Meetings Section */}
              {lead.meetings.length > 0 && (
                <div className="p-4 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700" onClick={(e) => e.stopPropagation()}>
                  <div className="text-sm font-medium mb-2 dark:text-white">Upcoming Meetings</div>
                  <div className="space-y-2">
                    {lead.meetings.map(meeting => (
                      <div key={meeting.id} className="flex justify-between items-center bg-white dark:bg-gray-750 p-2 rounded border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                          <span className="text-sm dark:text-white">{meeting.date} at {meeting.time}</span>
                        </div>
                        <Badge className={meeting.status === "Confirmed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"}>
                          {meeting.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium dark:text-white">No leads found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1 mb-4">Try adjusting your search or filters</p>
            <Button onClick={handleAddLead}>Add New Lead</Button>
          </div>
        )}
      </div>
      
      {/* Lead Detail Dialog */}
      {selectedLead && (
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Lead Details</DialogTitle>
              <DialogDescription>
                View and manage lead information
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-20 w-20 mb-2">
                          <AvatarFallback className="text-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                            {selectedLead.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-medium dark:text-white">{selectedLead.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedLead.position} at {selectedLead.company}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <a href={`mailto:${selectedLead.email}`} className="text-sm hover:underline text-indigo-600 dark:text-indigo-400">
                            {selectedLead.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <a href={`tel:${selectedLead.phone}`} className="text-sm hover:underline text-indigo-600 dark:text-indigo-400">
                            {selectedLead.phone}
                          </a>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button className="w-full">Schedule Meeting</Button>
                        <Button variant="outline" className="w-full mt-2">Send Message</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium dark:text-white">Lead Qualification</h4>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-medium dark:text-white">Priority</div>
                      <Select defaultValue={selectedLead.priority}>
                        <SelectTrigger className={`${
                          selectedLead.priority === 'Hot' ? 'border-red-200 bg-red-50 dark:bg-red-900/10' :
                          selectedLead.priority === 'Warm' ? 'border-amber-200 bg-amber-50 dark:bg-amber-900/10' :
                          'border-blue-200 bg-blue-50 dark:bg-blue-900/10'
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-50">
                          <SelectItem value="Hot">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                              Hot
                            </div>
                          </SelectItem>
                          <SelectItem value="Warm">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                              Warm
                            </div>
                          </SelectItem>
                          <SelectItem value="Cold">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                              Cold
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium dark:text-white mb-3">Lead Form Inputs</h4>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Full Name*</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.fullName}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Email*</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.email}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Company</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.company}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Phone Number</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.phoneNumber}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Email Address</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.emailAddress}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Interested in</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.interestedIn}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Budget Range</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.budgetRange}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Timeframe</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.timeframe}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Decision Maker</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.decisionMaker}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Current Solution</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.currentSolution}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Pain Points</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.painPoints}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">Message</Label>
                            <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm dark:text-white">
                              {selectedLead.leadFormInputs?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium dark:text-white">Notes</h4>
                        {!editingNotes && (
                          <Button variant="outline" size="sm" onClick={() => setEditingNotes(true)}>
                            Edit Notes
                          </Button>
                        )}
                      </div>
                      {editingNotes ? (
                        <div className="space-y-2">
                          <Textarea 
                            value={notesValue}
                            onChange={(e) => setNotesValue(e.target.value)}
                            className="min-h-[100px]"
                            placeholder="Add your notes here..."
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSaveNotes}>Save</Button>
                            <Button variant="outline" size="sm" onClick={() => setEditingNotes(false)}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="border rounded-md p-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                          <p className="text-sm text-gray-700 dark:text-gray-300">{notesValue}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="sticky bottom-0 bg-white dark:bg-gray-900 border-t pt-4 mt-6">
              <Button variant="outline" onClick={() => setSelectedLead(null)}>Close</Button>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* CRM Integration Modal */}
      <Dialog open={showCrmModal} onOpenChange={setShowCrmModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>CRM Integration</DialogTitle>
            <DialogDescription>
              Connect your leads with popular CRM platforms
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto">
            <Stepper value={crmStep} onValueChange={setCrmStep} className="mb-8 w-full" orientation="horizontal">
              <StepperItem step={0} className="flex-1">
                <StepperTrigger 
                  className="w-full cursor-pointer disabled:cursor-default" 
                  disabled={!selectedCrm}
                  onClick={() => setCrmStep(0)}
                >
                  <div className="flex flex-col items-center gap-2 min-w-0">
                    <StepperIndicator />
                    <StepperTitle className="text-xs sm:text-sm text-center">Select CRM</StepperTitle>
                  </div>
                </StepperTrigger>
                <StepperSeparator />
              </StepperItem>
              
              <StepperItem step={1} className="flex-1">
                <StepperTrigger 
                  className="w-full cursor-pointer disabled:cursor-default" 
                  disabled={!selectedCrm}
                  onClick={() => selectedCrm && setCrmStep(1)}
                >
                  <div className="flex flex-col items-center gap-2 min-w-0">
                    <StepperIndicator />
                    <StepperTitle className="text-xs sm:text-sm text-center">Authentication</StepperTitle>
                  </div>
                </StepperTrigger>
                <StepperSeparator />
              </StepperItem>
              
              <StepperItem step={2} className="flex-1">
                <StepperTrigger 
                  className="w-full cursor-pointer disabled:cursor-default" 
                  disabled={!isConnected}
                  onClick={() => isConnected && setCrmStep(2)}
                >
                  <div className="flex flex-col items-center gap-2 min-w-0">
                    <StepperIndicator />
                    <StepperTitle className="text-xs sm:text-sm text-center">Confirmation</StepperTitle>
                  </div>
                </StepperTrigger>
                <StepperSeparator />
              </StepperItem>
              
              <StepperItem step={3} className="flex-1">
                <StepperTrigger 
                  className="w-full cursor-pointer disabled:cursor-default" 
                  disabled={!isConnected}
                  onClick={() => isConnected && setCrmStep(3)}
                >
                  <div className="flex flex-col items-center gap-2 min-w-0">
                    <StepperIndicator />
                    <StepperTitle className="text-xs sm:text-sm text-center">Configuration</StepperTitle>
                  </div>
                </StepperTrigger>
              </StepperItem>
            </Stepper>

            {/* Step 1: CRM Selection */}
            {crmStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Choose Your CRM Platform</h3>
                  <p className="text-gray-500 text-sm mb-6">Select the CRM platform you want to integrate with your leads.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {crmPlatforms.map((crm) => (
                    <Card 
                      key={crm.id} 
                      className={`cursor-pointer hover:shadow-md transition-all border-2 ${
                        selectedCrm?.id === crm.id ? 'border-primary' : 'border-gray-200'
                      }`}
                      onClick={() => handleCrmSelection(crm)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4">
                            <img 
                              src={crm.logo} 
                              alt={`${crm.name} logo`}
                              className="w-[109px] h-[32px] object-contain"
                            />
                          </div>
                          <h4 className="font-medium flex items-center gap-2 mb-2">
                            {crm.name}
                            {crm.popular && (
                              <Badge variant="secondary" className="text-xs">Popular</Badge>
                            )}
                          </h4>
                          <p className="text-sm text-gray-500">{crm.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Authentication */}
            {crmStep === 1 && selectedCrm && (
              <div className="space-y-6 text-center">
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
                  <div className="mb-6">
                    <img 
                      src={selectedCrm.logo} 
                      alt={`${selectedCrm.name} logo`}
                      className="w-[109px] h-[32px] object-contain mx-auto"
                    />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Connect to {selectedCrm.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    You'll be redirected to {selectedCrm.name} to authorize the connection.
                  </p>
                  
                  <Button 
                    onClick={handleCrmConnect} 
                    disabled={isConnecting}
                    className="px-8"
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Connect to {selectedCrm.name}
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500">
                  <p>By connecting, you agree to share lead data with {selectedCrm.name}.</p>
                  <p>Your data will be handled according to their privacy policy.</p>
                </div>
              </div>
            )}

            {/* Step 3: Connection Confirmation */}
            {crmStep === 2 && selectedCrm && isConnected && (
              <div className="space-y-6 text-center">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-1 text-green-800 dark:text-green-300">
                    Connected!
                  </h3>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    {selectedCrm.name} connected successfully.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="space-y-2 text-left text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">CRM Platform:</span>
                      <span className="font-medium">{selectedCrm.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account:</span>
                      <span className="font-medium">john.doe@company.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleSyncConfiguration}>
                  Configure Sync Settings
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 4: Sync Configuration */}
            {crmStep === 3 && selectedCrm && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Sync Configuration</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Configure how your leads will be synchronized with {selectedCrm.name}.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {/* Sync Direction */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Sync Direction</h4>
                    <RadioGroup 
                      value={syncConfig.direction} 
                      onValueChange={(value) => setSyncConfig({...syncConfig, direction: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-way" id="one-way" />
                        <Label htmlFor="one-way" className="text-sm">
                          One-way (Push leads to CRM only)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="two-way" id="two-way" />
                        <Label htmlFor="two-way" className="text-sm">
                          Two-way (Bi-directional sync)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Lead Types */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Lead Types to Sync</h4>
                    <RadioGroup 
                      value={syncConfig.leadTypes} 
                      onValueChange={(value) => setSyncConfig({...syncConfig, leadTypes: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all-leads" />
                        <Label htmlFor="all-leads" className="text-sm">
                          Sync all leads
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="qualified" id="qualified-only" />
                        <Label htmlFor="qualified-only" className="text-sm">
                          Sync only qualified leads
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hot-warm" id="hot-warm" />
                        <Label htmlFor="hot-warm" className="text-sm">
                          Sync hot and warm leads only
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Sync Trigger */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Sync Trigger</h4>
                    <RadioGroup 
                      value={syncConfig.syncTrigger} 
                      onValueChange={(value) => setSyncConfig({...syncConfig, syncTrigger: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="creation" id="on-creation" />
                        <Label htmlFor="on-creation" className="text-sm">
                          Sync on lead creation
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="update" id="on-update" />
                        <Label htmlFor="on-update" className="text-sm">
                          Sync on lead creation and updates
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manual" id="manual" />
                        <Label htmlFor="manual" className="text-sm">
                          Manual sync only
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Field Mapping Preview */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Field Mapping</h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Default field mapping (can be customized later):
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Lead Name</span>
                          <ArrowRight className="h-3 w-3" />
                          <span>Contact Name</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email</span>
                          <ArrowRight className="h-3 w-3" />
                          <span>Email</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Company</span>
                          <ArrowRight className="h-3 w-3" />
                          <span>Company</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Phone</span>
                          <ArrowRight className="h-3 w-3" />
                          <span>Phone</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Priority</span>
                          <ArrowRight className="h-3 w-3" />
                          <span>Lead Status</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="sticky bottom-0 bg-white dark:bg-gray-900 border-t pt-4 mt-6">
            <Button variant="outline" onClick={() => setShowCrmModal(false)}>
              Cancel
            </Button>
            {crmStep === 0 && selectedCrm && (
              <Button onClick={() => setCrmStep(1)}>
                Continue with {selectedCrm.name}
              </Button>
            )}
            {crmStep === 3 && (
              <Button onClick={handleFinalizeCrmSetup}>
                Save & Enable Sync
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Lead Modal */}
      <Dialog open={showAddLeadModal} onOpenChange={setShowAddLeadModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>
              Manually add a new lead to your pipeline
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <Label htmlFor="fullName">Full Name*</Label>
              <Input id="fullName" placeholder="Enter full name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email*</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Enter company name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="position">Position</Label>
              <Input id="position" placeholder="Enter job title" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter phone number" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hot">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      Hot
                    </div>
                  </SelectItem>
                  <SelectItem value="Warm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                      Warm
                    </div>
                  </SelectItem>
                  <SelectItem value="Cold">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Cold
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-1">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Add any notes about this lead..." className="min-h-[100px]" />
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowAddLeadModal(false)}>Cancel</Button>
            <Button onClick={() => {
              setShowAddLeadModal(false);
              toast({
                title: "Lead Added",
                description: "New lead has been added successfully."
              });
            }}>Add Lead</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
      
      <LeadsAnalytics />
    </div>
  );
};
