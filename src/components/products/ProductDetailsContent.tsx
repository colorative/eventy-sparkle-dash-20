import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { 
  Download, Share2, Heart, ArrowLeft, Tag, Building, Calendar, 
  FileText, List, MapPin, User, Package, Globe, Link2 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductDetailsContentProps {
  id?: string;
}

// Sample product data - in a real app, this would come from an API
const productData = [
  {
    id: "1",
    name: "Smart Analytics Dashboard",
    company: "Alphacore",
    description: "Real-time data analytics platform with customizable dashboards and AI-powered insights.",
    fullDescription: "The Smart Analytics Dashboard is a powerful enterprise-level analytics platform designed to transform your raw data into actionable insights. Built with AI at its core, it offers customizable dashboards, automated reporting, and predictive analytics capabilities. Our platform seamlessly integrates with your existing data sources, providing real-time visualizations and intelligence that drive better business decisions.",
    specifications: [
      { name: "Deployment", value: "Cloud-based / On-premise" },
      { name: "Integrations", value: "REST API, GraphQL, Webhooks" },
      { name: "Data Sources", value: "SQL, NoSQL, APIs, Flat Files" },
      { name: "Visualization Types", value: "Charts, Graphs, Maps, Tables, Custom" },
      { name: "Support Level", value: "24/7 Enterprise Support" }
    ],
    price: "$1,299",
    category: "Software",
    tags: ["Analytics", "AI", "Dashboard", "Business Intelligence", "Data Visualization"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    bgColor: "#0a4a87",
    contactPerson: {
      name: "Michael Chen",
      position: "Product Manager",
      email: "michael.chen@alphacore.com",
      phone: "+1 (555) 123-4567",
      avatar: "MC"
    },
    boothLocation: "Hall A, Booth #203",
    availableForDemo: true,
    website: "https://alphacore.com/smart-analytics",
    releaseDate: "2023-06-15",
    features: [
      "Real-time data processing",
      "Custom dashboard creation",
      "AI-driven insights and anomaly detection",
      "Multi-user collaboration",
      "Export to multiple formats",
      "Role-based access control",
      "White-labeling options"
    ]
  },
  {
    id: "2",
    name: "NeuraMesh Learning Framework",
    company: "Mind Mesh",
    description: "Enterprise-grade machine learning framework optimized for large language models.",
    fullDescription: "NeuraMesh is a cutting-edge machine learning framework designed specifically for enterprise applications involving large language models. It simplifies the implementation of complex neural network architectures while providing industry-leading performance and scalability. With built-in support for distributed training and serving, NeuraMesh enables organizations to deploy state-of-the-art AI solutions with minimal engineering overhead.",
    specifications: [
      { name: "Supported Models", value: "Transformer, LSTM, CNN, GAN, RL" },
      { name: "Languages", value: "Python, C++, Java API" },
      { name: "Hardware Support", value: "CUDA, TPU, CPU" },
      { name: "Scaling", value: "Single Node to Multi-Cluster" },
      { name: "Model Export", value: "ONNX, TensorFlow, TorchScript" }
    ],
    price: "$2,499",
    category: "AI",
    tags: ["Machine Learning", "Framework", "Enterprise", "NLP", "Neural Networks"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    bgColor: "#5e35b1",
    contactPerson: {
      name: "Dr. Sarah Wang",
      position: "Chief AI Officer",
      email: "sarah@mindmesh.ai",
      phone: "+1 (555) 987-6543",
      avatar: "SW"
    },
    boothLocation: "Hall B, Booth #122",
    availableForDemo: true,
    website: "https://mindmesh.ai",
    releaseDate: "2023-09-01",
    features: [
      "Optimized for large language models",
      "Automated hyperparameter tuning",
      "Federated learning capabilities",
      "Memory-efficient training",
      "Model compression techniques",
      "Explainability tools",
      "Enterprise security features"
    ]
  },
  {
    id: "3",
    name: "Collekt Payment Gateway",
    company: "Collekt Payments",
    description: "Secure payment processing solution with multi-currency support and fraud protection.",
    fullDescription: "Collekt Payment Gateway is an enterprise-grade payment processing solution that enables businesses to accept payments worldwide with confidence. Our platform supports multiple currencies, payment methods, and includes advanced fraud detection algorithms. With industry-leading uptime and processing speeds, Collekt ensures your customers enjoy a smooth checkout experience while providing your business with robust security and comprehensive analytics.",
    specifications: [
      { name: "Payment Methods", value: "Credit/Debit Cards, Digital Wallets, Bank Transfers" },
      { name: "Supported Currencies", value: "150+ global currencies" },
      { name: "Integration Options", value: "API, SDK, Hosted Checkout" },
      { name: "Compliance", value: "PCI DSS Level 1, GDPR, ISO 27001" },
      { name: "Processing Time", value: "~1.2 seconds average" }
    ],
    price: "$599/mo",
    category: "Fintech",
    tags: ["Payments", "Security", "Gateway", "Multi-currency", "Fraud Protection"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    bgColor: "#2c1a4d",
    contactPerson: {
      name: "Raj Patel",
      position: "Sales Director",
      email: "raj@collekt.com",
      phone: "+1 (555) 222-3333",
      avatar: "RP"
    },
    boothLocation: "Hall C, Booth #78",
    availableForDemo: true,
    website: "https://collekt.com",
    releaseDate: "2023-04-10",
    features: [
      "Real-time fraud detection",
      "Multi-currency support",
      "Subscription billing",
      "Customizable checkout",
      "Comprehensive reporting",
      "Payment routing optimization",
      "Chargeback protection"
    ]
  }
];

export const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({ id }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  
  // Find the product with the matching ID
  const product = productData.find(p => p.id === id) || productData[0];
  
  // Dummy related products (excluding the current product)
  const relatedProducts = productData.filter(p => p.id !== id).slice(0, 2);
  
  const handleContactRequest = () => {
    toast({
      title: "Contact request sent",
      description: "A representative will get back to you shortly.",
    });
  };
  
  const handleScheduleDemo = () => {
    navigate('/meetings/new', { 
      state: { 
        company: product.company,
        product: product.name 
      } 
    });
  };
  
  const toggleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Added to saved products",
      description: isSaved ? 
        "Product has been removed from your saved list" : 
        "Product has been added to your saved list",
    });
  };

  return (
    <div className="bg-white flex min-w-60 flex-col overflow-auto items-stretch flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Button>
        
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800">
                {product.category}
              </Badge>
              {product.availableForDemo && (
                <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
                  Available for Demo
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-1">
              <Link to={`/exhibitors/${product.company.toLowerCase()}`} className="text-blue-600 hover:underline">
                {product.company}
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" onClick={toggleSave}>
              <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Request Info
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.galleryImages.map((image, idx) => (
                    <button
                      key={idx}
                      className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 ring-primary"
                      onClick={() => {
                        const newProduct = {...product};
                        newProduct.image = image;
                        // Update current image
                      }}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} view ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {product.category}
                    </Badge>
                    {product.availableForDemo && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Available for Demo
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <Link to={`/exhibitors/${product.company.toLowerCase()}`} className="text-blue-600 hover:underline">
                    {product.company}
                  </Link>
                  <div className="mt-4">
                    <p className="text-3xl font-bold text-gray-900">{product.price}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full" onClick={handleScheduleDemo}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Demo
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleContactRequest}>
                    <User className="h-4 w-4 mr-2" />
                    Contact Representative
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Quick Overview</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-slate-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-slate-600">{product.fullDescription}</p>
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {product.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-slate-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
                <div className="space-y-2">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-3 py-2 border-b border-slate-100">
                      <span className="font-medium">{spec.name}</span>
                      <span className="col-span-2 text-slate-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <List className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Product Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {product.galleryImages.map((image, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-video bg-cover bg-center rounded-md overflow-hidden"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          
          {relatedProducts.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Related Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedProducts.map((relatedProduct) => (
                    <Card key={relatedProduct.id} className="overflow-hidden">
                      <Link to={`/products/${relatedProduct.id}`} className="flex h-full">
                        <div 
                          className="w-1/3 bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url(${relatedProduct.image})`,
                            backgroundColor: relatedProduct.bgColor
                          }}
                        />
                        <CardContent className="p-4 w-2/3">
                          <h3 className="font-medium text-base">{relatedProduct.name}</h3>
                          <p className="text-sm text-slate-500 line-clamp-2 mt-1">{relatedProduct.description}</p>
                          <Badge variant="outline" className="mt-2 text-xs">{relatedProduct.category}</Badge>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Product Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Tag className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Category</p>
                    <p className="font-medium">{product.category}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Company</p>
                    <p className="font-medium">{product.company}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Release Date</p>
                    <p className="font-medium">{new Date(product.releaseDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Website</p>
                    <a 
                      href={product.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline flex items-center"
                    >
                      Visit Website
                      <Link2 className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Contact Person</h3>
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200">
                    {product.contactPerson.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{product.contactPerson.name}</p>
                  <p className="text-sm text-slate-500">{product.contactPerson.position}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="text-sm">
                    <p className="text-slate-500">Email</p>
                    <p className="font-medium">{product.contactPerson.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-sm">
                    <p className="text-slate-500">Phone</p>
                    <p className="font-medium">{product.contactPerson.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Find at the Event</h3>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Booth Location</p>
                  <p className="font-medium">{product.boothLocation}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/floorplan">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Floor Map
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
