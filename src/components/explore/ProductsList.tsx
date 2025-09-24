
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

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
  isSaved: boolean;
}

interface ProductsListProps {
  products: Product[];
  viewMode: "grid" | "list";
}

export const ProductsList: React.FC<ProductsListProps> = ({ products, viewMode }) => {
  const toggleSaved = (id: string) => {
    toast({
      title: "Item saved",
      description: "The item has been added to your saved list.",
    });
  };

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800">
            <Link to={`/products/${product.id}`}>
              <div 
                className="h-40 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${product.image})`, 
                  backgroundColor: product.bgColor
                }}
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{product.company}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-6 w-6 ${product.isSaved ? "text-red-500" : "text-gray-400"}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSaved(product.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={product.isSaved ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </Button>
                </div>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-base dark:text-white">{product.name}</h3>
                  <span className="font-medium text-sm dark:text-white">{product.price}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {product.tags.slice(0, 3).map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-slate-100 dark:bg-gray-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <Link to={`/products/${product.id}`}>
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
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{product.company}</span>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <h3 className="font-medium dark:text-white mt-1">{product.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium dark:text-white">{product.price}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-6 w-6 ${product.isSaved ? "text-red-500" : "text-gray-400"}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSaved(product.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={product.isSaved ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 my-2">{product.description}</p>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-slate-100 dark:bg-gray-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};
