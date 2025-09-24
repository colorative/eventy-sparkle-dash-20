
import React, { useState } from "react";
import { Search, Filter, Grid, List as ListIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { newsArticles } from "@/utils/newsData";

export const NewsContent: React.FC = () => {
  const [viewType, setViewType] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Extract unique categories from news articles
  const categories = ["all", ...Array.from(new Set(newsArticles.map(article => article.category.toLowerCase())))];
  
  // Filter articles based on search query and selected category
  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || article.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white dark:bg-gray-800 flex min-w-60 flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] p-6 max-md:p-4 max-md:max-w-full">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">News & Updates</h1>
          <p className="text-gray-500 dark:text-gray-400">The latest news and updates from AI Summit 2026</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="border rounded-md flex dark:border-gray-600">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewType("grid")} 
              className={viewType === "grid" ? "bg-slate-100 dark:bg-gray-700" : "hover:bg-slate-100 dark:hover:bg-gray-700"}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewType("list")} 
              className={viewType === "list" ? "bg-slate-100 dark:bg-gray-700" : "hover:bg-slate-100 dark:hover:bg-gray-700"}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search articles, topics, or authors" 
            className="pl-9 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Advanced
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-gray-100 dark:bg-gray-700 p-1">
          <TabsTrigger value="all" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">All Articles</TabsTrigger>
          <TabsTrigger value="featured" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Featured</TabsTrigger>
          <TabsTrigger value="technology" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Technology</TabsTrigger>
          <TabsTrigger value="events" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Events</TabsTrigger>
          <TabsTrigger value="saved" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Saved</TabsTrigger>
        </TabsList>
      </Tabs>

      <ScrollArea className="flex-1 pr-4">
        {filteredArticles.length > 0 ? (
          viewType === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link to={`/news/${article.slug}`} key={article.id} className="block h-full">
                  <Card className="overflow-hidden hover:shadow-md transition-all h-full border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <Badge variant="secondary" className="w-fit mb-2">
                        {article.category}
                      </Badge>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 dark:text-white">{article.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{article.publishDate} • By {article.author}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="px-5 pb-5 pt-0">
                      <Button variant="outline" className="w-full">
                        Read More
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <Link to={`/news/${article.slug}`} key={article.id} className="block">
                  <Card className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 h-48 md:h-auto">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="secondary" className="w-fit">
                              {article.category}
                            </Badge>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{article.publishDate}</p>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 dark:text-white">{article.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">By {article.author}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow">{article.excerpt}</p>
                          <Button variant="outline" className="w-fit">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2 dark:text-white">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
