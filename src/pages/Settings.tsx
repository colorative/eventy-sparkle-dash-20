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
import { ArrowLeft, User, Lock, Bell, Database, LanguagesIcon, Moon, Sun, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  return <PageLayout>
      <div className="flex flex-col p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-4">
            
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          {/* Account Settings Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <div className="h-20 w-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      JD
                    </div>
                    <div>
                      <h3 className="font-medium">Profile Picture</h3>
                      <p className="text-sm text-gray-500">JPG, GIF or PNG. 1MB max size.</p>
                      <div className="mt-2 flex space-x-2">
                        <Button size="sm" variant="outline">Upload</Button>
                        <Button size="sm" variant="outline" className="text-red-600">Remove</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="md:col-span-2">
                      <Separator />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Meeting Requests</Label>
                        <p className="text-sm text-gray-500">Receive email when someone requests a meeting</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">New Leads</Label>
                        <p className="text-sm text-gray-500">Receive email when you get new leads</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Schedule Changes</Label>
                        <p className="text-sm text-gray-500">Receive email when your schedule is updated</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Event Updates</Label>
                        <p className="text-sm text-gray-500">Receive email about event updates and news</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Real-time Alerts</Label>
                        <p className="text-sm text-gray-500">Show notifications in real-time within the app</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Sound Alerts</Label>
                        <p className="text-sm text-gray-500">Play sound when new notifications arrive</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Connected Apps and Integrations</CardTitle>
                <CardDescription>Manage third-party apps and services connected to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Connected Apps</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M8 17a5 5 0 0 1 0-10h8a5 5 0 0 1 0 10h-8" /><line x1="12" y1="17" x2="12" y2="7" /></svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Salesforce CRM</h4>
                          <p className="text-sm text-gray-500">Connected on June 12, 2026</p>
                        </div>
                      </div>
                      <Button variant="outline" className="text-red-600">Disconnect</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Google Calendar</h4>
                          <p className="text-sm text-gray-500">Connected on May 28, 2026</p>
                        </div>
                      </div>
                      <Button variant="outline" className="text-red-600">Disconnect</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Available Integrations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                        </div>
                        <div>
                          <h4 className="font-medium">GitHub</h4>
                          <p className="text-sm text-gray-500">Connect your GitHub account</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">Connect</Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="M22 8a10 10 0 0 1-5 8.5c-1.5 1-2.5 2.5-2.5 4.1v.4H9.5v-.4c0-1.6-1-3.1-2.5-4.1A10 10 0 0 1 2 8c0-4.4 4.5-8 10-8s10 3.6 10 8Z" /><path d="M6 8h12" /><path d="M9 12h6" /><path d="M11 16h2" /></svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Zapier</h4>
                          <p className="text-sm text-gray-500">Connect automation workflows</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">Connect</Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M21 12 3 12" /><path d="m16 7 5 5-5 5" /></svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Slack</h4>
                          <p className="text-sm text-gray-500">Get notifications in Slack</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">Connect</Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-sky-100 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600"><path d="M4 16v-2.65a2.5 2.5 0 0 1 .7-1.7l.9-.9a2.114 2.114 0 0 0 0-3L4.7 7a2.5 2.5 0 0 1-.7-1.75v-.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.5A2.5 2.5 0 0 1 19.3 7l-.9.85a2.114 2.114 0 0 0 0 3l.9.9a2.5 2.5 0 0 1 .7 1.7v2.65a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm10-4a2.5 2.5 0 1 0 0-5 2.5 2.5 0 1 0 0 5zm0 0v3" /></svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Zoom</h4>
                          <p className="text-sm text-gray-500">Schedule meetings with Zoom</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">Connect</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Language & Region Tab */}
          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle>Language & Time Zone</CardTitle>
                <CardDescription>Set your preferred language and regional settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English (US)</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="chinese">Chinese (Simplified)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        <SelectItem value="mt">Mountain Time (MT)</SelectItem>
                        <SelectItem value="ct">Central Time (CT)</SelectItem>
                        <SelectItem value="et">Eastern Time (ET)</SelectItem>
                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                
                
                
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the dashboard looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        <Label className="text-base">{darkMode ? "Dark Mode" : "Light Mode"}</Label>
                      </div>
                      <p className="text-sm text-gray-500">Switch between light and dark mode</p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Accent Color</h3>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-8 w-8 rounded-full bg-blue-500 border-2 border-white outline outline-2 outline-blue-500 cursor-pointer"></div>
                      <span className="text-xs">Blue</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-8 w-8 rounded-full bg-indigo-500 cursor-pointer"></div>
                      <span className="text-xs">Indigo</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer"></div>
                      <span className="text-xs">Purple</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer"></div>
                      <span className="text-xs">Green</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-8 w-8 rounded-full bg-red-500 cursor-pointer"></div>
                      <span className="text-xs">Red</span>
                    </div>
                  </div>
                </div>
                
                
                
                
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>;
};
export default Settings;