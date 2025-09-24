import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  fallbackImage?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl, 
  fallbackImage
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-lg">
      <div className="aspect-video relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {fallbackImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${fallbackImage})` }}
          />
        )}
      </div>
    </div>
  );
};