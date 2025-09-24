
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Image, FileVideo, X, FileUp, Plus } from "lucide-react";

export const MediaTab = () => {
  const [activeTab, setActiveTab] = useState("photos");
  
  // Updated photos with direct Unsplash URLs that are more reliable
  const photos = [
    { id: 1, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&q=80", title: "Exhibition Booth", description: "Our main booth at AI Summit 2026" },
    { id: 2, url: "https://images.unsplash.com/photo-1552581234-26160f608093?w=300&h=200&q=80", title: "Team Photo", description: "Our team at the product launch" },
    { id: 3, url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&q=80", title: "Product Demo", description: "Live demo of our latest software" },
    { id: 4, url: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?w=300&h=200&q=80", title: "Conference Hall", description: "Speaking session at the main hall" },
    { id: 5, url: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=300&h=200&q=80", title: "Award Ceremony", description: "Receiving the innovation award" },
    { id: 6, url: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=300&h=200&q=80", title: "Tech Display", description: "Our technology showcase" },
    { id: 7, url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=200&q=80", title: "Annual Event", description: "Our annual industry event" },
    { id: 8, url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=300&h=200&q=80", title: "Team Meeting", description: "Planning session for Q3" },
    { id: 9, url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&q=80", title: "Office Space", description: "Our headquarters" },
  ];
  
  // Updated video thumbnails with direct Unsplash URLs
  const videos = [
    { id: 1, url: "https://example.com/video1.mp4", thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=200&q=80", title: "Product Introduction", duration: "2:15" },
    { id: 2, url: "https://example.com/video2.mp4", thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&q=80", title: "CEO's Keynote", duration: "15:32" },
    { id: 3, url: "https://example.com/video3.mp4", thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=300&h=200&q=80", title: "Live Demo", duration: "5:47" },
    { id: 4, url: "https://example.com/video4.mp4", thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=200&q=80", title: "Customer Interview", duration: "8:21" },
    { id: 5, url: "https://example.com/video5.mp4", thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&q=80", title: "Tutorial", duration: "10:05" },
  ];

  const handleUpload = (type) => {
    // In a real app, this would open a file picker
    console.log(`Uploading new ${type}`);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="photos" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="photos" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Photo Gallery</h2>
            <Button className="gap-2" onClick={() => handleUpload('photo')}>
              <PlusCircle className="h-4 w-4" />
              <span>Upload Photos</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden group relative border-slate-200">
                <CardContent className="p-0">
                  <div className="aspect-square relative bg-slate-100 overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt={photo.title} 
                      className="object-cover h-full w-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                      <div className="self-end">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 bg-white/20 hover:bg-white/30 rounded-full"
                        >
                          <X className="h-3 w-3 text-white" />
                        </Button>
                      </div>
                      <div className="text-white">
                        <h3 className="font-medium text-xs truncate">{photo.title}</h3>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="overflow-hidden border-dashed border-2 border-slate-200 bg-slate-50/50">
              <CardContent className="p-0">
                <div className="aspect-square flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleUpload('photo')}>
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mb-1">
                    <Image className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-xs font-medium text-slate-600">Add Photo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Video Gallery</h2>
            <Button className="gap-2" onClick={() => handleUpload('video')}>
              <PlusCircle className="h-4 w-4" />
              <span>Upload Videos</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden group relative border-slate-200">
                <CardContent className="p-0">
                  <div className="aspect-video relative bg-slate-800 overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="object-cover h-full w-full opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-8 w-8 rounded-full bg-black/50 flex items-center justify-center">
                        <div className="h-0 w-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-white ml-1"></div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 py-0.5 px-2 rounded text-xs text-white">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                      <div className="self-end">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 bg-white/20 hover:bg-white/30 rounded-full"
                        >
                          <X className="h-3 w-3 text-white" />
                        </Button>
                      </div>
                      <div className="text-white">
                        <h3 className="font-medium text-xs">{video.title}</h3>
                        <p className="text-xs text-white/80">{video.duration}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="overflow-hidden border-dashed border-2 border-slate-200 bg-slate-50/50">
              <CardContent className="p-0">
                <div className="aspect-video flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleUpload('video')}>
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mb-1">
                    <FileVideo className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-xs font-medium text-slate-600">Add Video</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
