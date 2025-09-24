
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Grid2X2, List } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export const MyProductsContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample user products
  const myProducts = [
    {
      id: 1,
      name: "Smart Analytics Platform",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300",
      description: "An AI-powered analytics platform for business intelligence.",
      category: "Software",
      tags: ["analytics", "AI", "business intelligence"]
    },
    {
      id: 2,
      name: "SecureCloud Storage",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300",
      description: "Enterprise-grade secure cloud storage solution with end-to-end encryption.",
      category: "Cloud Services",
      tags: ["storage", "security", "cloud"]
    },
    {
      id: 3,
      name: "DevOps Pipeline Manager",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300",
      description: "Streamline your CI/CD pipeline with our comprehensive management tool.",
      category: "Development Tools",
      tags: ["devops", "CI/CD", "automation"]
    }
  ];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    toast({
      title: "Product Added",
      description: "Your new product has been successfully added.",
    });
  };

  const filteredProducts = myProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white flex flex-col overflow-auto items-stretch flex-1 p-6">
      <Card className="shadow-sm bg-white w-full overflow-hidden flex-1 rounded-lg border-0">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">My Products</h1>
              <p className="text-slate-500 text-sm">Manage your company's product catalog</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Upload New Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddProduct} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="cloud">Cloud Services</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter product description" 
                      className="min-h-[100px]"
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="e.g. cloud, security, analytics" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Product Image</Label>
                    <Input id="image" type="file" accept="image/*" />
                    <p className="text-xs text-slate-500">Recommended size: 800x600px, max 5MB</p>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Add Product
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <div className="relative md:w-64 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
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
          
          {filteredProducts.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col space-y-4"}>
              {filteredProducts.map(product => (
                <Card key={product.id} className={viewMode === "list" ? "overflow-hidden" : ""}>
                  {viewMode === "grid" ? (
                    <div className="flex flex-col h-full">
                      <div className="w-full aspect-video bg-slate-100 rounded-t-lg overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="flex-1 p-4">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                        <div className="flex items-center mt-2">
                          <Badge variant="outline" className="text-xs bg-slate-50">
                            {product.category}
                          </Badge>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </div>
                  ) : (
                    <div className="flex p-0">
                      <div className="w-32 h-24 bg-slate-100 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-slate-500 mt-1">{product.description}</p>
                            <div className="flex items-center mt-2">
                              <Badge variant="outline" className="text-xs bg-slate-50 mr-2">
                                {product.category}
                              </Badge>
                              {product.tags.slice(0, 2).map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-slate-50 mr-2">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-slate-50 inline-flex rounded-full p-4 mb-4">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-slate-500 mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
