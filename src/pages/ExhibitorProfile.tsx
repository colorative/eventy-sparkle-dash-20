import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, Download, Calendar, User, Heart, Globe, 
  Mail, Phone, ArrowLeft, MessageSquare, 
  Facebook, Linkedin, Twitter, Video, FileText, 
  Tag, Clock, ChevronDown, ChevronUp, Edit, Plus,
  Share2, ExternalLink, PenBox
} from "lucide-react";
import BoringAvatar from "boring-avatars";

const ExhibitorProfile = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Mock data for a single exhibitor
  const exhibitor = {
    id: id,
    name: id === "alphacore" ? "Alphacore" : id || "Exhibitor",
    boothNumber: "242",
    location: "Main Hall, North Section",
    bgColor: "#0a4a87",
    bannerImage: "https://cdn.builder.io/api/v1/image/assets/4f5dcc361c1f41d3969c5785002c7d1e/671e1fb233dad8933d568aa0cbc0ecf0d24f93a7",
    logo: "α",
    description: "Alphacore is a leading innovator in AI and machine learning technologies. We provide cutting-edge solutions for businesses looking to implement artificial intelligence across their operations. Our flagship products include advanced natural language processing systems, computer vision applications, and predictive analytics platforms. Our team of experts has years of experience developing AI solutions that solve real-world problems efficiently and effectively.",
    countries: ["Austria", "Germany"],
    categories: ["Technology", "Software", "AI", "Machine Learning", "Hardware", "Mobile"],
    website: "https://www.alphacore.example",
    email: "info@alphacore.example",
    phone: "+1 (555) 123-4567",
    address: "101 Tech Lane, Long Beach, CA 90802",
    socialMedia: {
      facebook: "alphacore",
      twitter: "alphacore",
      linkedin: "alphacore-ai",
      whatsapp: "+15551234567"
    },
    teamMembers: [
      { name: "Bill Griffin", role: "CEO at Alphacore Ventures", image: "BG" },
      { name: "Grace Hunt", role: "VP Research at Alphacore Ventures", image: "GH" }
    ],
    products: [
      { 
        name: "Bladeless Mini Fan Electric Appliance", 
        description: "Sleek and modern design with quiet operation",
        price: "$154.99",
        image: "P",
        category: "Household, Appliances, Electronics"
      },
      { 
        name: "Bladeless Fan Electric Appliance", 
        description: "High-power model for large rooms",
        price: "$254.99",
        image: "P",
        category: "Household, Appliances, Electronics"
      },
      { 
        name: "Bladeless Desk Fan Electric Appliance", 
        description: "Compact model for office use",
        price: "$124.99",
        image: "P",
        category: "Household, Appliances, Electronics"
      }
    ],
    demoInfo: {
      title: "Watch the Demo",
      description: "Join us to see our newly launched product demo, too advanced that it'll change your everyday life.",
      date: "12:30 PM - 2 Dec 2023",
      platform: "Zoom"
    },
    photos: [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg",
      "https://example.com/photo3.jpg",
      "https://example.com/photo4.jpg"
    ],
    videos: [
      "https://example.com/video1.mp4",
      "https://example.com/video2.mp4"
    ],
    documents: [
      { name: "session_agenda.docx", type: "DOCX", size: "1.2 MB" },
      { name: "topic_paper.pdf", type: "PDF", size: "3.5 MB" },
      { name: "session_presentation.ppt", type: "PPT", size: "4.8 MB" }
    ],
    coupons: [
      {
        title: "Up to 70% off on Electronic Products",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed arcu magna.",
        code: "ELEC70",
        expiry: "Valid Until: 31 Dec 2023"
      },
      {
        title: "$100 Off on First Purchase",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed arcu magna.",
        code: "FIRST100",
        expiry: "Valid Until: 21 Dec 2023"
      }
    ]
  };

  return (
    <PageLayout>
      <div className="flex-1 overflow-auto">
        <div className="container px-6 pt-6">
          {/* Cover Photo Card */}
          <Card className="mb-6">
            <div 
              className="h-48 bg-cover bg-center relative rounded-t-lg" 
              style={{ 
                backgroundImage: `url(${exhibitor.bannerImage})`,
                backgroundSize: 'cover'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
            </div>
            
            {/* Profile Info and Actions */}
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left side: Profile photo, name, booth info */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                    <BoringAvatar
                      size={64}
                      name={exhibitor.name}
                      variant="marble"
                      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{exhibitor.name}</h1>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Booth #{exhibitor.boothNumber} - {exhibitor.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* Right side: Action buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <Button className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Enquiry
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    Drop eCard
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="container px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">About</h2>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {expanded ? exhibitor.description : `${exhibitor.description.substring(0, 150)}...`}
                  </p>
                  <Button 
                    variant="link" 
                    onClick={() => setExpanded(!expanded)} 
                    className="p-0 h-auto mt-1"
                  >
                    {expanded ? (
                      <span className="flex items-center">Read Less <ChevronUp className="h-3 w-3 ml-1" /></span>
                    ) : (
                      <span className="flex items-center">Read More <ChevronDown className="h-3 w-3 ml-1" /></span>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Operating Countries */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">Operating Countries</h2>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {exhibitor.countries.map((country, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 border px-3 py-1.5 rounded-md dark:border-gray-700">
                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                        <span>{country}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Industry Tags */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">Industry Tags</h2>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exhibitor.categories.map((category, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-50 hover:bg-blue-100 cursor-pointer">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Product Demo */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">Product Demo</h2>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{exhibitor.demoInfo.title}</h3>
                    <p className="text-gray-600 my-2">
                      {exhibitor.demoInfo.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="h-4 w-4 mr-1.5" />
                      <span>{exhibitor.demoInfo.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button className="gap-2">
                        <Video className="h-4 w-4" />
                        Join Zoom
                      </Button>
                      <Button variant="ghost" size="sm">
                        Host Demo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Products</h2>
                  </div>
                  <div className="space-y-4">
                    {exhibitor.products.map((product, idx) => (
                      <div key={idx} className="flex border rounded-lg p-3 gap-3">
                        <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                          {product.image}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{product.name}</h3>
                            <span className="text-blue-600 font-medium">{product.price}</span>
                          </div>
                          <p className="text-gray-500 text-sm">{product.category}</p>
                          <p className="text-sm mt-1">{product.description}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full gap-1.5">
                      <Plus className="h-4 w-4" />
                      Add a Product
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Photos & Videos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photos */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Photos</h2>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[1, 2, 3, 4].map((_, idx) => (
                        <div 
                          key={idx} 
                          className="aspect-video bg-gray-200 rounded-md"
                        ></div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full gap-1.5">
                      <Plus className="h-4 w-4" />
                      Add Photos
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Videos */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Videos</h2>
                    <div className="grid grid-cols-1 gap-2 mb-4">
                      {[1, 2].map((_, idx) => (
                        <div 
                          key={idx} 
                          className="aspect-video bg-gray-200 rounded-md flex items-center justify-center"
                        >
                          <Video className="h-8 w-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full gap-1.5">
                      <Plus className="h-4 w-4" />
                      Add Videos
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              {/* Documents */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Documents</h2>
                  <div className="space-y-3 mb-4">
                    {exhibitor.documents.map((doc, idx) => (
                      <div key={idx} className="flex justify-between items-center border rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 bg-blue-100 rounded flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full gap-1.5">
                    <Plus className="h-4 w-4" />
                    Add a File
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              {/* Booth Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Booth Information</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Number:</span>
                      <span className="font-medium">{exhibitor.boothNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">{exhibitor.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Size:</span>
                      <span className="font-medium">10 x 15 ft</span>
                    </div>

                    {/* Added QR Code */}
                    <div className="mt-4 flex flex-col items-center">
                      <div className="h-32 w-32 bg-gray-200 flex items-center justify-center mb-2 border">
                        <span className="text-sm text-gray-500">QR Code</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1.5 mt-1">
                        <Download className="h-3.5 w-3.5" />
                        Download QR
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
                
              {/* Contact Persons */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Persons</h2>
                  <div className="space-y-4">
                    {exhibitor.teamMembers.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <BoringAvatar
                            size={40}
                            name={member.name}
                            variant="marble"
                            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full gap-1.5 mt-2">
                      <Plus className="h-4 w-4" />
                      Add Contact Person
                    </Button>
                  </div>
                </CardContent>
              </Card>
                
              {/* Coupons & Deals */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Coupons & Deals</h2>
                  <div className="space-y-4">
                    {exhibitor.coupons.map((coupon, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <h3 className="font-medium text-blue-600">{coupon.title}</h3>
                        <p className="text-sm text-gray-600 my-2">{coupon.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{coupon.expiry}</span>
                          <Button size="sm" variant="outline">
                            <Download className="h-3.5 w-3.5 mr-1" />
                            Redeem
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full gap-1.5">
                      <Plus className="h-4 w-4" />
                      Add Coupon
                    </Button>
                  </div>
                </CardContent>
              </Card>
                
              {/* Social Links */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Social Links</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <Facebook className="h-4 w-4" />
                      </div>
                      <span className="text-sm">facebook.com/user/name</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center text-white">
                        <Twitter className="h-4 w-4" />
                      </div>
                      <span className="text-sm">twitter.com/username</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="h-8 w-8 bg-blue-700 rounded-full flex items-center justify-center text-white">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <span className="text-sm">linkedin.com/in/username</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span className="text-sm">+1 555-123-4567</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <span className="text-sm">{exhibitor.address}</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <Globe className="h-4 w-4" />
                      </div>
                      <span className="text-sm">{exhibitor.website}</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ExhibitorProfile;
