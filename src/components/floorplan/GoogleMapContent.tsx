
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Locate, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface GoogleMapContentProps {
  mapId?: string;
}

export const GoogleMapContent: React.FC<GoogleMapContentProps> = ({
  mapId
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  // Sample data to simulate Google Maps info based on mapId
  const mapDetails = {
    "3": {
      title: "Venue Location",
      address: "123 Convention Center Way, Tech City, CA 94043",
      description: "The main convention center where the event is being held. The venue features parking facilities, accessible entrances, and multiple exhibit halls."
    },
    "4": {
      title: "Nearby Accommodations",
      address: "Area surrounding Convention Center",
      description: "Hotels, lodging options, and accommodations within walking distance of the main venue. These locations offer special rates for event attendees."
    }
  };

  const currentMap = mapId && mapId in mapDetails ? mapDetails[mapId as keyof typeof mapDetails] : null;

  // Load the Google Maps script only once
  useEffect(() => {
    if (window.google?.maps) {
      initMap();
      return;
    }
    
    // Define the initMap function in the global scope
    window.initMap = () => {
      initMap();
    };

    // Create script only if it doesn't exist
    if (!document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?callback=initMap`;
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);
      scriptRef.current = script;
    } else {
      // If script already exists but map hasn't initialized yet
      initMap();
    }

    return () => {
      // Clean up only if we created this script
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
      // Clean up global function
      delete window.initMap;
    };
  }, []);

  // Initialize the map
  const initMap = () => {
    if (!mapRef.current || !window.google?.maps) return;
    
    console.log("Initializing Google Map");
    
    try {
      const googleMap = new google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
      });
      
      mapInstanceRef.current = googleMap;
      
      const infoWindow = new google.maps.InfoWindow();
      
      // Add "Pan to Current Location" button to the map
      const locationButton = document.createElement("button");
      locationButton.textContent = "Pan to Current Location";
      locationButton.classList.add("custom-map-control-button");
      locationButton.style.backgroundColor = "white";
      locationButton.style.padding = "10px";
      locationButton.style.margin = "10px";
      locationButton.style.border = "1px solid #ccc";
      locationButton.style.borderRadius = "4px";
      
      googleMap.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      
      locationButton.addEventListener("click", () => {
        handleMapLocationRequest(googleMap, infoWindow);
      });
      
      console.log("Google Map initialized successfully");
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      toast.error("Failed to initialize Google Maps");
    }
  };

  const handleMapLocationRequest = (
    map: google.maps.Map,
    infoWindow: google.maps.InfoWindow
  ) => {
    if (navigator.geolocation) {
      toast.info("Requesting access to your location...");
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          toast.success("Location access granted. Showing your current location.");
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter()!, map);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter()!, map);
    }
  };

  const handleLocationError = (
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng,
    map: google.maps.Map
  ) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
    toast.error(browserHasGeolocation
      ? "Could not access your location. Please enable location services."
      : "Your browser doesn't support geolocation."
    );
  };

  const handleGetDirections = () => {
    if (mapInstanceRef.current) {
      const infoWindow = new google.maps.InfoWindow();
      handleMapLocationRequest(mapInstanceRef.current, infoWindow);
    } else {
      toast.info("Map is still loading. Please try again in a moment.");
    }
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      toast.info("Requesting access to your location...");
      navigator.geolocation.getCurrentPosition(position => {
        toast.success("Location accessed successfully. Ready to share.");
        // Here you would implement actual sharing functionality
      }, error => {
        toast.error("Could not access your location. Please enable location services.");
      });
    } else {
      toast.error("Your browser doesn't support geolocation.");
    }
  };

  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/maps">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{currentMap?.title || "Interactive Map"}</h1>
            <p className="text-gray-500">{currentMap?.address || "Navigate the surrounding area"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search nearby..." 
              className="pl-8" 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-start mb-4">
        <Button 
          variant="outline" 
          className="w-[120px]" 
          onClick={handleGetDirections}
        >
          Get Directions
        </Button>
        <Button 
          variant="outline" 
          className="w-[120px]" 
          onClick={handleShareLocation}
        >
          Share Location
        </Button>
      </div>

      {/* Google Map Card */}
      <Card className="w-full h-[calc(100%-120px)] bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
        <div 
          id="map"
          ref={mapRef} 
          className="w-full h-full"
          style={{ minHeight: "500px" }}
        ></div>
      </Card>

      {currentMap?.description && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
          {currentMap.description}
        </div>
      )}
    </div>
  );
};

declare global {
  interface Window {
    initMap: () => void;
  }
}
