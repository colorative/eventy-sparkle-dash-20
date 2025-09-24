
import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, MapPin, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { floorMapAreas, MapArea } from './mapData';

interface InteractiveFloorMapProps {
  className?: string;
}

export const InteractiveFloorMap: React.FC<InteractiveFloorMapProps> = ({ className }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedArea, setSelectedArea] = useState<MapArea | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMyLocation = () => {
    // Simulate finding user's location - center on Exhibition Hall
    const exhibitionHall = floorMapAreas.find(area => area.id === 'exhibition-hall');
    if (exhibitionHall) {
      const centerX = exhibitionHall.coordinates.x + exhibitionHall.coordinates.width / 2;
      const centerY = exhibitionHall.coordinates.y + exhibitionHall.coordinates.height / 2;
      
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setPanOffset({
          x: containerRect.width / 2 - centerX * zoomLevel,
          y: containerRect.height / 2 - centerY * zoomLevel
        });
      }
    }
  };

  const handleAreaClick = (area: MapArea) => {
    setSelectedArea(area);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const getAreaColor = (area: MapArea) => {
    switch (area.type) {
      case 'booth': return hoveredArea === area.id ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)';
      case 'room': return hoveredArea === area.id ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 0.6)';
      case 'lounge': return hoveredArea === area.id ? 'rgba(245, 158, 11, 0.8)' : 'rgba(245, 158, 11, 0.6)';
      case 'hall': return hoveredArea === area.id ? 'rgba(139, 69, 19, 0.8)' : 'rgba(139, 69, 19, 0.6)';
      case 'catering': return hoveredArea === area.id ? 'rgba(236, 72, 153, 0.8)' : 'rgba(236, 72, 153, 0.6)';
      default: return hoveredArea === area.id ? 'rgba(107, 114, 128, 0.8)' : 'rgba(107, 114, 128, 0.6)';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'booth': return 'default';
      case 'room': return 'secondary';
      case 'lounge': return 'outline';
      case 'hall': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className={`relative overflow-hidden bg-gray-100 rounded-lg ${className}`} ref={containerRef}>
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-white/90 backdrop-blur-sm"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md text-sm font-medium">
          {Math.round(zoomLevel * 100)}%
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-white/90 backdrop-blur-sm"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={handleMyLocation}
          className="bg-white/90 backdrop-blur-sm gap-1"
        >
          <MapPin className="h-3 w-3" />
          My Location
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetView}
          className="bg-white/90 backdrop-blur-sm gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          Reset View
        </Button>
      </div>

      {/* Map Container */}
      <div
        className="h-full w-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: '0 0',
          transition: isPanning ? 'none' : 'transform 0.3s ease'
        }}
      >
        {/* Base Image */}
        <img
          src="/lovable-uploads/e88909c3-2ad3-4699-8cea-af4ba5e8f1ec.png"
          alt="Floor Map"
          className="w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
        
        {/* Interactive SVG Overlay */}
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1032 1060"
          preserveAspectRatio="xMidYMid meet"
        >
          {floorMapAreas.map((area) => (
            <rect
              key={area.id}
              x={area.coordinates.x}
              y={area.coordinates.y}
              width={area.coordinates.width}
              height={area.coordinates.height}
              fill={getAreaColor(area)}
              stroke={hoveredArea === area.id ? '#ffffff' : 'transparent'}
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleAreaClick(area);
              }}
              onMouseEnter={() => setHoveredArea(area.id)}
              onMouseLeave={() => setHoveredArea(null)}
            />
          ))}
        </svg>
      </div>

      {/* Area Details Modal */}
      <Dialog open={!!selectedArea} onOpenChange={() => setSelectedArea(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>{selectedArea?.name}</DialogTitle>
              <Badge variant={getBadgeVariant(selectedArea?.type || '')}>
                {selectedArea?.type}
              </Badge>
            </div>
            <DialogDescription className="text-left">
              {selectedArea?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">Area ID:</span>
                <p className="font-mono">{selectedArea?.id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Type:</span>
                <p className="capitalize">{selectedArea?.type}</p>
              </div>
            </div>
            
            {selectedArea?.type === 'booth' && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Booth Information</h4>
                <p className="text-sm text-blue-700">
                  Visit this booth to learn more about their products and services. 
                  Schedule a meeting or collect their contact information.
                </p>
              </div>
            )}
            
            {selectedArea?.type === 'room' && (
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Room Details</h4>
                <p className="text-sm text-green-700">
                  This room hosts presentations and meetings. Check the agenda for scheduled events.
                </p>
              </div>
            )}
            
            <Button 
              onClick={() => setSelectedArea(null)} 
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
