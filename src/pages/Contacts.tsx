import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, Filter, Download, Plus, MoreHorizontal, Mail, Calendar, 
  Phone, MessageSquare, Tag, ArrowUpDown, User, Clock
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BoringAvatar from "boring-avatars";

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const contacts = [
    {
      id: 1,
      name: "Jennifer Kim",
      company: "Tech Innovations Inc",
      position: "Marketing Director",
      email: "jennifer.kim@example.com",
      phone: "+1 (555) 123-4567",
      tags: ["Lead", "Follow-Up"],
      status: "active",
      lastContact: "2026-03-15",
      notes: "Interested in our premium package, follow up next week",
      meetingCount: 2
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Global Solutions Ltd",
      position: "CTO",
      email: "michael.chen@example.com",
      phone: "+1 (555) 987-6543",
      tags: ["VIP", "Decision Maker"],
      status: "active",
      lastContact: "2026-04-02",
      notes: "Wants a product demo in May, very promising lead",
      meetingCount: 3
    },
    {
      id: 3,
      name: "Sarah Johnson",
      company: "Innovative Systems",
      position: "CEO",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 234-5678",
      tags: ["Lead", "VIP"],
      status: "inactive",
      lastContact: "2026-02-28",
      notes: "Send follow-up email with pricing details",
      meetingCount: 1
    },
    {
      id: 4,
      name: "David Williams",
      company: "Future Tech Corp",
      position: "Product Manager",
      email: "david.williams@example.com",
      phone: "+1 (555) 345-6789",
      tags: ["Potential Partner"],
      status: "active",
      lastContact: "2026-04-01",
      notes: "Discussed partnership opportunities, very interested",
      meetingCount: 4
    },
    {
      id: 5,
      name: "Emily Davis",
      company: "Smart Solutions",
      position: "Sales Director",
      email: "emily.davis@example.com",
      phone: "+1 (555) 456-7890",
      tags: ["Lead"],
      status: "inactive",
      lastContact: "2026-03-10",
      notes: "Send product catalog and schedule demo",
      meetingCount: 0
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchQuery === "" || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filter === "all" ||
      (filter === "active" && contact.status === "active") ||
      (filter === "inactive" && contact.status === "inactive") ||
      (filter === "leads" && contact.tags.includes("Lead")) ||
      (filter === "vip" && contact.tags.includes("VIP"));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <PageLayout>
      <div className="flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Tags</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <ArrowUpDown className="h-3.5 w-3.5" />
                  <span>Sort</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Contacts</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="vip">VIP</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Meetings</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <BoringAvatar
                                size={40}
                                name={contact.name}
                                variant="marble"
                                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-sm text-slate-500">{contact.position}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {contact.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span>{new Date(contact.lastContact).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={contact.meetingCount > 0 ? "secondary" : "outline"}>
                            {contact.meetingCount}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <User className="mr-2 h-4 w-4" />
                                  <span>View Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  <span>Schedule Meeting</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Tag className="mr-2 h-4 w-4" />
                                  <span>Add Tags</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredContacts.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <User className="h-12 w-12 text-slate-300 mb-3" />
                    <h3 className="text-lg font-medium">No contacts found</h3>
                    <p className="text-slate-500 mb-4 mt-1">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button>Add New Contact</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Meetings</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.filter(contact => contact.status === "active").map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <BoringAvatar
                                size={40}
                                name={contact.name}
                                variant="marble"
                                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-sm text-slate-500">{contact.position}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {contact.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span>{new Date(contact.lastContact).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={contact.meetingCount > 0 ? "secondary" : "outline"}>
                            {contact.meetingCount}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <User className="mr-2 h-4 w-4" />
                                  <span>View Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  <span>Schedule Meeting</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Tag className="mr-2 h-4 w-4" />
                                  <span>Add Tags</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredContacts.filter(contact => contact.status === "active").length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <User className="h-12 w-12 text-slate-300 mb-3" />
                    <h3 className="text-lg font-medium">No active contacts found</h3>
                    <p className="text-slate-500 mb-4 mt-1">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button>Add New Contact</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leads" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Meetings</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.filter(contact => contact.tags.includes("Lead")).map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <BoringAvatar
                                size={40}
                                name={contact.name}
                                variant="marble"
                                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-sm text-slate-500">{contact.position}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {contact.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span>{new Date(contact.lastContact).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={contact.meetingCount > 0 ? "secondary" : "outline"}>
                            {contact.meetingCount}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <User className="mr-2 h-4 w-4" />
                                  <span>View Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  <span>Schedule Meeting</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Tag className="mr-2 h-4 w-4" />
                                  <span>Add Tags</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredContacts.filter(contact => contact.tags.includes("Lead")).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <User className="h-12 w-12 text-slate-300 mb-3" />
                    <h3 className="text-lg font-medium">No lead contacts found</h3>
                    <p className="text-slate-500 mb-4 mt-1">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button>Add New Contact</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vip" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Meetings</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.filter(contact => contact.tags.includes("VIP")).map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <BoringAvatar
                                size={40}
                                name={contact.name}
                                variant="marble"
                                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-sm text-slate-500">{contact.position}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {contact.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span>{new Date(contact.lastContact).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={contact.meetingCount > 0 ? "secondary" : "outline"}>
                            {contact.meetingCount}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <User className="mr-2 h-4 w-4" />
                                  <span>View Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  <span>Schedule Meeting</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Tag className="mr-2 h-4 w-4" />
                                  <span>Add Tags</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredContacts.filter(contact => contact.tags.includes("VIP")).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <User className="h-12 w-12 text-slate-300 mb-3" />
                    <h3 className="text-lg font-medium">No VIP contacts found</h3>
                    <p className="text-slate-500 mb-4 mt-1">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button>Add New Contact</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Meetings</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.filter(contact => contact.status === "inactive").map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <BoringAvatar
                                size={40}
                                name={contact.name}
                                variant="marble"
                                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-sm text-slate-500">{contact.position}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {contact.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span>{new Date(contact.lastContact).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={contact.meetingCount > 0 ? "secondary" : "outline"}>
                            {contact.meetingCount}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <User className="mr-2 h-4 w-4" />
                                  <span>View Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  <span>Schedule Meeting</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Tag className="mr-2 h-4 w-4" />
                                  <span>Add Tags</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredContacts.filter(contact => contact.status === "inactive").length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <User className="h-12 w-12 text-slate-300 mb-3" />
                    <h3 className="text-lg font-medium">No inactive contacts found</h3>
                    <p className="text-slate-500 mb-4 mt-1">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button>Add New Contact</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Contacts;
