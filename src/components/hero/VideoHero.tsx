import React from 'react';

interface VideoHeroProps {
  videoUrl: string;
  fallbackImage?: string;
  children?: React.ReactNode;
}

export const VideoHero: React.FC<VideoHeroProps> = ({ 
  videoUrl, 
  fallbackImage,
  children 
}) => {
  return (
    <section id="hero" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          {fallbackImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${fallbackImage})` }}
            />
          )}
        </video>
      </div>
      
      {/* Content overlay */}
      {children && (
        <div className="relative z-10 w-full">
          {children}
        </div>
      )}
    </section>
  );
};