
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, Edit, Trash2, ChevronRight, ShoppingCart, Tag, DollarSign, 
  Camera, Upload, ExternalLink, MoreVertical, ImagePlus
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock product data
const initialProducts = [
  {
    id: 1,
    name: "AI-Powered Smart Analytics Platform",
    price: "$999/month",
    category: "Software, Analytics, AI",
    description: "Enterprise-grade analytics platform with artificial intelligence capabilities for real-time data processing and visualization.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300",
    ],
    featured: true
  },
  {
    id: 2,
    name: "Edge Computing Hardware Solution",
    price: "$1,499",
    category: "Hardware, IoT, Edge Computing",
    description: "High-performance edge computing device designed for low-latency processing in industrial IoT applications.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300",
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=300",
    ],
    featured: false
  },
  {
    id: 3,
    name: "Enterprise Security Suite",
    price: "$2,999/year",
    category: "Software, Security, Enterprise",
    description: "Comprehensive cybersecurity package with threat detection, prevention, and response capabilities for large organizations.",
    images: [
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=300",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300",
    ],
    featured: false
  }
];

export const ProductsTab = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products & Services</h2>
        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add details about your product or service to showcase at the event.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="product-name" className="text-sm font-medium">Product Name</label>
                <Input id="product-name" placeholder="Enter product name..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="product-price" className="text-sm font-medium">Price</label>
                  <Input id="product-price" placeholder="e.g. $999/month" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="product-category" className="text-sm font-medium">Category</label>
                  <Input id="product-category" placeholder="e.g. Software, AI" />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="product-description" className="text-sm font-medium">Description</label>
                <Textarea id="product-description" placeholder="Enter product description..." rows={4} />
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">Product Images</span>
                <div className="flex gap-3 flex-wrap">
                  <div className="border-2 border-dashed rounded-md border-gray-300 dark:border-gray-600 flex items-center justify-center h-24 w-24">
                    <Button variant="ghost" size="sm" className="h-full w-full rounded-md">
                      <ImagePlus className="h-6 w-6 text-gray-400" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingProduct(false)}>Cancel</Button>
              <Button>Save Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden transition-all hover:shadow-md border-slate-200 dark:border-slate-700">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 flex-shrink-0">
                  <div className="relative h-full min-h-[200px] bg-gray-100 dark:bg-gray-800">
                    {product.images.length > 0 ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    {product.featured && (
                      <Badge className="absolute top-2 left-2 bg-amber-500 text-white hover:bg-amber-600">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="font-normal">
                          {product.price}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>
                  
                  {product.images.length > 1 && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Product Gallery</p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {product.images.map((img, i) => (
                          <div key={i} className="h-14 w-14 flex-shrink-0 rounded overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img src={img} alt={`${product.name} ${i+1}`} className="h-full w-full object-cover" />
                          </div>
                        ))}
                        <Button variant="outline" size="icon" className="h-14 w-14 rounded flex-shrink-0">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Tag className="h-4 w-4 mr-2" />
                      Mark as Featured
                    </Button>
                    <Button size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
