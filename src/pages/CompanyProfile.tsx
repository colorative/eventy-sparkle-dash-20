import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Building, Upload, Link as LinkIcon, Globe, Instagram, Twitter, Linkedin, Facebook, Tag, FileText, Plus, Trash, Edit, Image, Video, MapPin, Star, DollarSign, Percent, Clock, Calendar, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
const CompanyProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);
  const [tags, setTags] = useState(["AI", "Event Management", "SaaS"]);
  const [newTag, setNewTag] = useState("");
  const [countries, setCountries] = useState(["United States", "Canada", "United Kingdom"]);
  const [newCountry, setNewCountry] = useState("");

  // Mock product data
  const [products, setProducts] = useState([{
    id: 1,
    name: "Event Management Platform",
    description: "All-in-one solution for event organizers to manage registrations, ticketing, and analytics.",
    price: "$599/month",
    category: "Software",
    images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
    featured: true
  }, {
    id: 2,
    name: "Attendee Mobile App",
    description: "Customizable mobile app for event attendees to access schedules, networking, and content.",
    price: "$299/month",
    category: "Mobile App",
    images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
    featured: false
  }]);

  // Mock coupon data
  const [coupons, setCoupons] = useState([{
    id: 1,
    title: "Spring Special: 20% Off Annual Plans",
    code: "SPRING2026",
    discount: "20%",
    description: "Get 20% off any annual plan subscription. Valid for new customers only.",
    expiry: "2026-06-30"
  }, {
    id: 2,
    title: "Free Event Analytics Add-on",
    code: "ANALYTICS2026",
    discount: "Free Add-on",
    description: "Subscribe to our premium plan and get the Event Analytics add-on for free.",
    expiry: "2026-05-15"
  }]);
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  const handleAddCountry = () => {
    if (newCountry.trim() && !countries.includes(newCountry.trim())) {
      setCountries([...countries, newCountry.trim()]);
      setNewCountry("");
    }
  };
  const handleRemoveCountry = (country: string) => {
    setCountries(countries.filter(c => c !== country));
  };
  const handleAddProduct = () => {
    // This would open a form to add a new product in a real app
    console.log("Add product clicked");
  };
  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };
  const handleAddCoupon = () => {
    // This would open a form to add a new coupon in a real app
    console.log("Add coupon clicked");
  };
  const handleRemoveCoupon = (id: number) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
  };
  return <PageLayout>
      <div className="flex flex-col p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-4">
            
          </Button>
          <h1 className="text-2xl font-bold">Company Profile</h1>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full max-w-4xl grid-cols-7">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
          </TabsList>
          
          {/* General Information Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company's profile information visible to attendees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Banner Image */}
                <div className="space-y-2">
                  <Label htmlFor="banner">Banner Image</Label>
                  <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Company Banner" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" className="bg-white/70 hover:bg-white">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Banner
                        <input type="file" id="banner" className="hidden" accept="image/*" onChange={e => setSelectedBanner(e.target.files ? e.target.files[0] : null)} />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Logo */}
                <div className="space-y-2">
                  <Label htmlFor="logo">Company Logo</Label>
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold relative">
                      E
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                        <label htmlFor="logo" className="cursor-pointer text-xs text-white text-center p-2">
                          <Upload className="h-4 w-4 mx-auto mb-1" />
                          Upload Logo
                        </label>
                        <input type="file" id="logo" className="hidden" accept="image/*" onChange={e => setSelectedFile(e.target.files ? e.target.files[0] : null)} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Recommended size: 400x400px</p>
                      <p className="text-sm text-gray-500">Max file size: 5MB</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Company Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="Eventify" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                        <Globe className="h-4 w-4" />
                      </span>
                      <Input id="website" className="rounded-l-none" defaultValue="https://eventify.example.com" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea id="description" rows={4} defaultValue="Eventify is an AI-powered event management platform designed to help organizers create memorable and engaging experiences for attendees." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" type="email" defaultValue="contact@eventify.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Operating Countries Tab */}
          <TabsContent value="countries">
            <Card>
              <CardHeader>
                <CardTitle>Operating Countries</CardTitle>
                <CardDescription>Add countries where your company operates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {countries.map((country, index) => <Badge key={index} variant="secondary" className="gap-1 pr-1">
                      {country}
                      <Button variant="ghost" size="sm" className="h-auto p-0 px-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => handleRemoveCountry(country)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>)}
                </div>
                
                <div className="flex gap-2">
                  <Input placeholder="Add new country" value={newCountry} onChange={e => setNewCountry(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddCountry()} />
                  <Button onClick={handleAddCountry}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Suggested Countries</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <ul className="space-y-2">
                        {["Germany", "France", "Japan", "Australia"].map((country, idx) => <li key={idx} className="flex items-center justify-between">
                            <span>{country}</span>
                            <Button variant="ghost" size="sm" onClick={() => !countries.includes(country) && setCountries([...countries, country])} disabled={countries.includes(country)}>
                              {countries.includes(country) ? "Added" : "Add"}
                            </Button>
                          </li>)}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Social Media Tab */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Connect your company's social media accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      LinkedIn
                    </Label>
                    <Input id="linkedin" placeholder="https://linkedin.com/company/eventify" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-blue-400" />
                      Twitter
                    </Label>
                    <Input id="twitter" placeholder="https://twitter.com/eventify" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="flex items-center gap-2">
                      <Facebook className="h-4 w-4 text-blue-700" />
                      Facebook
                    </Label>
                    <Input id="facebook" placeholder="https://facebook.com/eventify" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-pink-600" />
                      Instagram
                    </Label>
                    <Input id="instagram" placeholder="https://instagram.com/eventify" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Additional Links</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input placeholder="Link Title" defaultValue="Product Demo" />
                      <Input placeholder="URL" defaultValue="https://eventify.example.com/demo" />
                      <Button variant="outline" size="icon">✕</Button>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Link Title" defaultValue="Video Showcase" />
                      <Input placeholder="URL" defaultValue="https://eventify.example.com/video" />
                      <Button variant="outline" size="icon">✕</Button>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Add Another Link
                  </Button>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Categories & Tags Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Categories & Tags</CardTitle>
                <CardDescription>Set product categories and industry tags for better discoverability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <select id="industry" className="w-full border border-gray-300 rounded-md py-2 px-3 dark:border-gray-600 dark:bg-gray-800">
                      <option value="technology">Technology</option>
                      <option value="software">Software</option>
                      <option value="events">Events Management</option>
                      <option value="saas">SaaS</option>
                      <option value="ai">Artificial Intelligence</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-size">Company Size</Label>
                    <select id="company-size" className="w-full border border-gray-300 rounded-md py-2 px-3 dark:border-gray-600 dark:bg-gray-800">
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="founded">Founded Year</Label>
                    <Input id="founded" type="number" placeholder="2020" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Product Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                        {tag}
                        <Button variant="ghost" size="sm" className="h-auto p-0 px-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => handleRemoveTag(tag)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>)}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input placeholder="Add new tag" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddTag()} />
                    <Button onClick={handleAddTag}>
                      <Tag className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>Manage your company's products and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-end">
                  <Button onClick={handleAddProduct} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Product
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map(product => <Card key={product.id} className="overflow-hidden">
                      <div className="relative">
                        <div className="aspect-video overflow-hidden">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
                        </div>
                        {product.featured && <Badge className="absolute top-3 right-3 bg-amber-500">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>}
                        <div className="absolute top-3 left-3 flex gap-1">
                          <Button variant="secondary" size="sm" className="h-8 w-8 p-0 shadow-md">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-red-100 hover:bg-red-200 text-red-600 shadow-md" onClick={() => handleRemoveProduct(product.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                          </div>
                          <Badge variant="outline" className="font-medium">
                            {product.price}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                          {product.description}
                        </p>
                        
                        <div className="mt-4 flex overflow-x-auto gap-2 pb-2">
                          {product.images.map((image, idx) => <div key={idx} className="h-16 w-24 shrink-0 rounded-md overflow-hidden">
                              <img src={image} alt={`${product.name} image ${idx + 1}`} className="h-full w-full object-cover" />
                            </div>)}
                          <Button variant="outline" className="h-16 w-24 shrink-0 flex flex-col items-center justify-center gap-1 border-dashed">
                            <Image className="h-4 w-4" />
                            <span className="text-xs">Add Image</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Media Tab */}
          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Photos & Videos</CardTitle>
                <CardDescription>Upload media to showcase your company and products</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Photos</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5].map((_, idx) => <div key={idx} className="aspect-square relative group">
                        <img src={`https://source.unsplash.com/random/${300 + idx}x${300 + idx}?event,tech`} alt={`Gallery item ${idx + 1}`} className="w-full h-full object-cover rounded-md" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>)}
                    <div className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md flex flex-col items-center justify-center">
                      <Button variant="ghost" className="h-full w-full flex flex-col gap-2">
                        <Plus className="h-6 w-6" />
                        <span>Add Photo</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Videos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2].map((_, idx) => <div key={idx} className="aspect-video relative group">
                        <img src={`https://source.unsplash.com/random/${400 + idx}x${225 + idx}?tech,screen`} alt={`Video thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-md" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button variant="secondary" size="lg" className="rounded-full h-12 w-12 p-0">
                            <Video className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>)}
                    <div className="aspect-video border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md flex flex-col items-center justify-center">
                      <Button variant="ghost" className="h-full w-full flex flex-col gap-2">
                        <Plus className="h-6 w-6" />
                        <span>Add Video</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Deals & Coupons Tab */}
          <TabsContent value="deals">
            <Card>
              <CardHeader>
                <CardTitle>Deals & Coupons</CardTitle>
                <CardDescription>Create special offers and discounts for attendees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-end">
                  <Button onClick={handleAddCoupon} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Coupon
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coupons.map(coupon => <Card key={coupon.id} className="relative">
                      <div className="absolute top-3 right-3 flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600" onClick={() => handleRemoveCoupon(coupon.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary" className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300">
                              {coupon.code}
                            </Badge>
                            <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                              {coupon.discount}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">{coupon.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {coupon.description}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>Valid until {new Date(coupon.expiry).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>)}
                  
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center h-full p-6">
                      <Button variant="ghost" onClick={handleAddCoupon} className="h-24 w-full flex flex-col gap-2">
                        <Percent className="h-6 w-6" />
                        <span>Create New Coupon</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Active Promotions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <p className="font-medium">Early Bird Special</p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Ends in 5 days</span>
                          </div>
                        </div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <Percent className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">Summer Bundle</p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Ends in 14 days</span>
                          </div>
                        </div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>;
};
export default CompanyProfile;