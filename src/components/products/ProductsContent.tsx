
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid2X2, List, Tag, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  company: string;
  description: string;
  price: string;
  category: string;
  tags: string[];
  image: string;
  bgColor: string;
}

export const ProductsContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");

  // Sample product data
  const products: Product[] = [
    {
      id: "1",
      name: "Smart Analytics Dashboard",
      company: "Alphacore",
      description: "Real-time data analytics platform with customizable dashboards and AI-powered insights.",
      price: "$1,299",
      category: "Software",
      tags: ["Analytics", "AI", "Dashboard"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#0a4a87"
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
      bgColor: "#5e35b1"
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
      bgColor: "#2c1a4d"
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
      bgColor: "#1976d2"
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
      bgColor: "#ff6d00"
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
      bgColor: "#00c853"
    },
    {
      id: "7",
      name: "Smart Hub Controller",
      company: "Blink",
      description: "Central IoT hub for managing smart home devices with advanced automation features.",
      price: "$299",
      category: "Hardware",
      tags: ["IoT", "Smart Home", "Automation"],
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#03a9f4"
    },
    {
      id: "8",
      name: "BlockGuard Security Suite",
      company: "Arnaborg",
      description: "Blockchain-based security solution for enterprise data protection and access control.",
      price: "$1,999/yr",
      category: "Security",
      tags: ["Blockchain", "Security", "Enterprise"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bgColor: "#26418f"
    },
  ];

  // Filter products based on search, category, and company
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesCompany = selectedCompany === 'all' || product.company === selectedCompany;
    
    return matchesSearch && matchesCategory && matchesCompany;
  });

  // Get unique categories and companies for filters
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const companies = ['all', ...Array.from(new Set(products.map(p => p.company)))];

  return (
    <div className="bg-white flex min-w-60 flex-col overflow-auto items-stretch justify-start flex-1 shrink basis-[0%] p-4 max-md:max-w-full">
      <Card className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full overflow-hidden flex-1 rounded-2xl max-md:max-w-full border-0">
        <CardContent className="w-full flex-1 p-6 max-md:max-w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex items-center gap-2">
              <Button className="gap-2">
                <Package className="h-4 w-4" />
                <span>My Products</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Companies" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company === 'all' ? 'All Companies' : company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
              
              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Package className="h-12 w-12 text-slate-300 mb-2" />
              <h3 className="text-lg font-medium mb-1">No products found</h3>
              <p className="text-slate-500">
                {searchQuery || selectedCategory !== 'all' || selectedCompany !== 'all'
                  ? "Try adjusting your filters"
                  : "No products are available"}
              </p>
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
              : "flex flex-col gap-4"
            }>
              {filteredProducts.map((product) => (
                <Card key={product.id} className={`overflow-hidden ${viewMode === "grid" ? "h-full" : ""}`}>
                  {viewMode === "grid" ? (
                    <div className="h-full flex flex-col">
                      <div 
                        className="h-48 bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(${product.image})`, 
                          backgroundColor: product.bgColor
                        }}
                      />
                      <CardContent className="flex-1 p-4 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-medium text-slate-500">{product.company}</span>
                          <span className="font-medium text-sm">{product.price}</span>
                        </div>
                        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex flex-wrap gap-1 mt-auto">
                          {product.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-slate-100">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  ) : (
                    <div className="flex">
                      <div 
                        className="w-32 h-auto bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(${product.image})`,
                          backgroundColor: product.bgColor
                        }}
                      />
                      <CardContent className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-medium text-slate-500">{product.company}</span>
                            <h3 className="font-medium text-lg">{product.name}</h3>
                          </div>
                          <span className="font-medium">{product.price}</span>
                        </div>
                        <p className="text-sm text-slate-600 my-2">{product.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {product.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-slate-100">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
