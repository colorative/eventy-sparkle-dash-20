import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Maximize, X, Move } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PipContextType {
  showPip: (sessionData: any, onRestore?: () => void) => void;
  hidePip: () => void;
  isPipVisible: boolean;
  togglePlayPause: () => void;
  isPlaying: boolean;
}

const PipContext = createContext<PipContextType | undefined>(undefined);

export const usePip = () => {
  const context = useContext(PipContext);
  if (!context) {
    throw new Error('usePip must be used within a PipProvider');
  }
  return context;
};

// Global PIP Player Component
const GlobalPipPlayer: React.FC<{
  sessionData: any;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
  onFullScreen: () => void;
  position: { x: number; y: number };
  onMove: (position: { x: number; y: number }) => void;
}> = ({ sessionData, isPlaying, onPlayPause, onClose, onFullScreen, position, onMove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const pipRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - 320;
    const maxY = window.innerHeight - 180;
    
    onMove({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  }, [isDragging, dragStart, onMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={pipRef}
      className="fixed z-[9999] bg-black rounded-lg overflow-hidden shadow-2xl border-2 border-white/20"
      style={{
        left: position.x,
        top: position.y,
        width: '320px',
        height: '180px',
      }}
    >
      {/* Drag Handle */}
      <div
        className="absolute top-0 left-0 right-0 h-8 cursor-move bg-gradient-to-b from-black/50 to-transparent flex items-center justify-center"
        onMouseDown={handleMouseDown}
      >
        <Move className="h-4 w-4 text-white/70" />
      </div>

      {/* Video */}
      <div className="relative w-full h-full">
        <video 
          src="https://sample-videos.com/zip/10/mp4/mp4-1280x720-Dummy.mp4"
          poster={sessionData?.videoThumbnail}
          className="w-full h-full object-cover"
          controls={false}
          autoPlay={isPlaying}
          muted
          loop
        />
        
        {/* Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          {/* Center Play/Pause */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50"
              onClick={onPlayPause}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-white" />
              ) : (
                <Play className="h-4 w-4 ml-0.5 text-white" />
              )}
            </Button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded bg-black/50 hover:bg-black/70"
                onClick={onPlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-3 w-3 text-white" />
                ) : (
                  <Play className="h-3 w-3 text-white" />
                )}
              </Button>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded bg-black/50 hover:bg-black/70"
                onClick={onFullScreen}
              >
                <Maximize className="h-3 w-3 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded bg-black/50 hover:bg-black/70"
                onClick={onClose}
              >
                <X className="h-3 w-3 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPipVisible, setIsPipVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [onRestoreCallback, setOnRestoreCallback] = useState<(() => void) | null>(null);
  const [pipPosition, setPipPosition] = useState({ 
    x: window.innerWidth - 340, 
    y: window.innerHeight - 200 
  });

  const showPip = useCallback((data: any, onRestore?: () => void) => {
    setSessionData(data);
    setOnRestoreCallback(() => onRestore || null);
    setIsPipVisible(true);
    setIsPlaying(true);
  }, []);

  const hidePip = useCallback(() => {
    setIsPipVisible(false);
    setIsPlaying(false);
    setSessionData(null);
    setOnRestoreCallback(null);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleFullScreen = useCallback(() => {
    if (onRestoreCallback) {
      onRestoreCallback();
    }
    hidePip();
  }, [onRestoreCallback, hidePip]);

  return (
    <PipContext.Provider value={{
      showPip,
      hidePip,
      isPipVisible,
      togglePlayPause,
      isPlaying
    }}>
      {children}
      {isPipVisible && sessionData && (
        <GlobalPipPlayer
          sessionData={sessionData}
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          onClose={hidePip}
          onFullScreen={handleFullScreen}
          position={pipPosition}
          onMove={setPipPosition}
        />
      )}
    </PipContext.Provider>
  );
};
