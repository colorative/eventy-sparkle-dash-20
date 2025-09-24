import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileSpreadsheet, FileDown, Clock, Calendar, Users, PieChart, Database, Download, Check, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
const Export = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>(["name", "company", "email", "phone", "title", "interest_level"]);
  const toggleField = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };
  return <PageLayout>
      <div className="flex flex-col p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-4">
            
          </Button>
          <h1 className="text-2xl font-bold">Export Data</h1>
        </div>
        
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-4">
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
          </TabsList>
          
          {/* Contacts Export Tab */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Export Contacts</CardTitle>
                <CardDescription>Download your contacts as CSV or Excel file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Range</h3>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">All Contacts</Button>
                    <Button variant="outline">New Leads</Button>
                    <Button variant="outline">Interested</Button>
                    <Button variant="outline">Meetings Scheduled</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Fields to Export</h3>
                    <Button variant="link" className="text-blue-600">Select All</Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="name" checked={selectedFields.includes("name")} onCheckedChange={() => toggleField("name")} />
                      <Label htmlFor="name">Name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="company" checked={selectedFields.includes("company")} onCheckedChange={() => toggleField("company")} />
                      <Label htmlFor="company">Company</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email" checked={selectedFields.includes("email")} onCheckedChange={() => toggleField("email")} />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="phone" checked={selectedFields.includes("phone")} onCheckedChange={() => toggleField("phone")} />
                      <Label htmlFor="phone">Phone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="title" checked={selectedFields.includes("title")} onCheckedChange={() => toggleField("title")} />
                      <Label htmlFor="title">Job Title</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="country" checked={selectedFields.includes("country")} onCheckedChange={() => toggleField("country")} />
                      <Label htmlFor="country">Country</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="interest_level" checked={selectedFields.includes("interest_level")} onCheckedChange={() => toggleField("interest_level")} />
                      <Label htmlFor="interest_level">Interest Level</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notes" checked={selectedFields.includes("notes")} onCheckedChange={() => toggleField("notes")} />
                      <Label htmlFor="notes">Notes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="last_contacted" checked={selectedFields.includes("last_contacted")} onCheckedChange={() => toggleField("last_contacted")} />
                      <Label htmlFor="last_contacted">Last Contacted</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Export Format</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Input type="radio" id="csv" name="format" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="csv">CSV</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="radio" id="excel" name="format" className="h-4 w-4" />
                      <Label htmlFor="excel">Excel</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Selected {selectedFields.length} fields</p>
                  <div className="flex space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>
                      <FileDown className="mr-2 h-4 w-4" />
                      Export Contacts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Meetings Export Tab */}
          <TabsContent value="meetings">
            <Card>
              <CardHeader>
                <CardTitle>Export Meetings & Schedules</CardTitle>
                <CardDescription>Download your meeting history and schedules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Date Range</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input type="date" id="start-date" defaultValue="2026-06-15" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input type="date" id="end-date" defaultValue="2026-06-18" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Export Options</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <Checkbox id="scheduled-meetings" defaultChecked />
                      <div className="space-y-1">
                        <Label htmlFor="scheduled-meetings">Scheduled Meetings</Label>
                        <p className="text-sm text-gray-500">All confirmed meetings with attendees</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <Checkbox id="canceled-meetings" />
                      <div className="space-y-1">
                        <Label htmlFor="canceled-meetings">Canceled Meetings</Label>
                        <p className="text-sm text-gray-500">Meetings that were scheduled but later canceled</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <Checkbox id="personal-schedule" defaultChecked />
                      <div className="space-y-1">
                        <Label htmlFor="personal-schedule">Personal Schedule</Label>
                        <p className="text-sm text-gray-500">Your daily agenda including personal blocks</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <Checkbox id="team-schedule" />
                      <div className="space-y-1">
                        <Label htmlFor="team-schedule">Team Schedule</Label>
                        <p className="text-sm text-gray-500">Combined schedule of all team members</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Format & Delivery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calendar-format">Calendar Format</Label>
                      <Select defaultValue="excel">
                        <SelectTrigger id="calendar-format">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="ics">iCalendar (.ics)</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="delivery-method">Delivery Method</Label>
                      <Select defaultValue="download">
                        <SelectTrigger id="delivery-method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="download">Direct Download</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Export Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Export Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Export Analytics & Reports</CardTitle>
                <CardDescription>Download event analytics and detailed reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Report Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <PieChart className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Lead Generation Summary</h4>
                          <p className="text-sm text-gray-500 mt-1">Overview of all leads collected with conversion metrics</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" variant="outline">Select</Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Attendee Engagement</h4>
                          <p className="text-sm text-gray-500 mt-1">Detailed analysis of attendee interactions and interests</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" variant="outline">Select</Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Meeting Performance</h4>
                          <p className="text-sm text-gray-500 mt-1">Statistics on meetings scheduled, completed, and canceled</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" variant="outline">Select</Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                          <FileSpreadsheet className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Custom Report</h4>
                          <p className="text-sm text-gray-500 mt-1">Build a custom report with your selected metrics</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Export Format</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Input type="radio" id="analytics-excel" name="analytics-format" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="analytics-excel">Excel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="radio" id="analytics-pdf" name="analytics-format" className="h-4 w-4" />
                      <Label htmlFor="analytics-pdf">PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="radio" id="analytics-csv" name="analytics-format" className="h-4 w-4" />
                      <Label htmlFor="analytics-csv">CSV</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">CRM Integration</h3>
                    <Switch defaultChecked />
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M8 17a5 5 0 0 1 0-10h8a5 5 0 0 1 0 10h-8" /><line x1="12" y1="17" x2="12" y2="7" /></svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Salesforce CRM</h4>
                          <p className="text-sm text-gray-500">Data will also be synced to Salesforce</p>
                        </div>
                      </div>
                      <Button variant="link" className="text-blue-600">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <Database className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Scheduled Exports Tab */}
          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Exports</CardTitle>
                <CardDescription>Configure recurring automatic exports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Active Schedules</h3>
                  <Button>
                    <Clock className="mr-2 h-4 w-4" />
                    Create New Schedule
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Weekly Leads Report</h4>
                          <p className="text-sm text-gray-500">Every Monday at 9:00 AM</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Pause</DropdownMenuItem>
                            <DropdownMenuItem>Run Now</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-500">Export Type</p>
                          <p>Contacts + New Leads</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Format</p>
                          <p>Excel (.xlsx)</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Delivery</p>
                          <p>Email to john.doe@example.com</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Last Run</p>
                          <p>June 10, 2026 (Successful)</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Next Run</p>
                          <p>June 17, 2026</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Created By</p>
                          <p>John Doe</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Monthly Analytics Summary</h4>
                          <p className="text-sm text-gray-500">Last day of each month</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Pause</DropdownMenuItem>
                            <DropdownMenuItem>Run Now</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-500">Export Type</p>
                          <p>Lead Generation Summary</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Format</p>
                          <p>PDF</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Delivery</p>
                          <p>Email to team@example.com</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Last Run</p>
                          <p>May 31, 2026 (Successful)</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Next Run</p>
                          <p>June 30, 2026</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Created By</p>
                          <p>Sarah Connor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Export History</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Export</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">Weekly Leads Report</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">June 10, 2026</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">Excel</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">Monthly Analytics</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">May 31, 2026</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">PDF</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">Weekly Leads Report</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">June 3, 2026</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">Excel</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>;
};
export default Export;