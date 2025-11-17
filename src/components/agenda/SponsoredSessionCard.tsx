import React from "react";
import { Clock, MapPin, Bookmark, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShiningText } from "@/components/ui/shining-text";
import { AnimatedGradientHero } from "@/components/ui/animated-gradient-hero";
import { AnimatedGradientHero2 } from "@/components/ui/animated-gradient-hero-2";
import BoringAvatar from "boring-avatars";

interface Sponsor {
  name: string;
  logo: string;
}

interface Speaker {
  name: string;
  role: string;
  company: string;
  avatarName: string;
}

interface SponsoredSessionCardProps {
  session: {
    id: number;
    title: string;
    type: string;
    time: string;
    location: string;
    speaker?: Speaker;
    speakers?: Speaker[];
    description: string;
    tags: string[];
    saved: boolean;
    sponsors?: Sponsor[];
  };
  colorClass: string;
  gradientVariant?: 1 | 2;
  onViewDetails: (id: number) => void;
  onSaveSession: (id: number) => void;
  onAddToSchedule: (id: number, title: string) => void;
}

export const SponsoredSessionCard: React.FC<SponsoredSessionCardProps> = ({
  session,
  colorClass,
  gradientVariant = 1,
  onViewDetails,
  onSaveSession,
  onAddToSchedule,
}) => {
  return (
    <div className="relative rounded-2xl p-1.5 pt-4 overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-20">
        {gradientVariant === 2 ? <AnimatedGradientHero2 /> : <AnimatedGradientHero />}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Sponsor Banner */}
        {session.sponsors && session.sponsors.length > 0 && (
          <div className="flex items-center gap-3 mb-2.5 mx-2">
            <div className="flex-1 flex items-center gap-3">
              <ShiningText text="This session is powered by:" />
              <div className="flex items-center gap-4">
                {session.sponsors.map((sponsor, idx) => (
                  <img
                    key={idx}
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-5 object-contain dark:brightness-0 dark:invert"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      {/* Inner Card */}
      <Card 
        className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
        onClick={() => onViewDetails(session.id)}
      >
        <div className="flex">
          <div className={`w-2 ${colorClass}`}></div>
          <div className="flex-1">
            <CardContent className="dark:text-gray-300 pt-6">
              {/* Title and Actions */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold dark:text-white line-clamp-2">
                    {session.title}
                  </h3>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToSchedule(session.id, session.title);
                    }}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveSession(session.id);
                    }}
                    className={
                      session.saved
                        ? "text-primary hover:text-primary/80 hover:bg-primary/10 dark:hover:bg-primary/20"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  >
                    <Bookmark
                      className="h-4 w-4"
                      fill={session.saved ? "currentColor" : "none"}
                    />
                  </Button>
                </div>
              </div>

              {/* Time and Location - Close to title */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-5">
                <Clock className="h-4 w-4 mr-2" />
                <span>{session.time}</span>
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4 mr-1" />
                <span>{session.location}</span>
              </div>

              {/* Single Speaker */}
              {session.speaker && (
                <div className="flex items-center gap-2 mb-5">
                  <BoringAvatar
                    size={32}
                    name={session.speaker.avatarName}
                    variant="marble"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                  <div>
                    <p className="text-sm font-medium dark:text-white">
                      {session.speaker.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {session.speaker.role}, {session.speaker.company}
                    </p>
                  </div>
                </div>
              )}

              {/* Multiple Speakers */}
              {session.speakers && (
                <div className="mb-5">
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {session.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <BoringAvatar
                          size={32}
                          name={speaker.avatarName}
                          variant="marble"
                          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                        />
                        <div>
                          <p className="text-xs font-medium dark:text-white">
                            {speaker.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {speaker.company}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {session.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {session.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
};
