import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Award, Grid, List, ArrowRight, Download, ExternalLink, PartyPopper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GamificationIcon } from "./GamificationIcon";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/components/ui/use-toast";
import confetti from 'canvas-confetti';

// Sample challenge data
const challenges = [
  {
    id: 1,
    name: "Visit 10 Booths",
    description: "Visit exhibitor booths and scan their QR codes",
    points: 150,
    progress: 8,
    total: 10,
    completed: false,
    type: "challenge",
    image: "exhibitor-scanner"
  },
  {
    id: 2,
    name: "Complete Survey",
    description: "Fill out the event feedback survey",
    points: 100,
    progress: 1,
    total: 1,
    completed: true,
    type: "challenge",
    image: "active-user"
  },
  {
    id: 3,
    name: "Connect with 20 Attendees",
    description: "Exchange contact information with other attendees",
    points: 200,
    progress: 12,
    total: 20,
    completed: false,
    type: "challenge",
    image: "attendee-scanner"
  },
  {
    id: 4,
    name: "Post on Social Feed",
    description: "Share content on the event social feed",
    points: 50,
    progress: 3,
    total: 5,
    completed: false,
    type: "challenge",
    image: "social-photo-post"
  },
  {
    id: 5,
    name: "Attend a Session",
    description: "Join scheduled sessions during the event",
    points: 75,
    progress: 10,
    total: 10,
    completed: true,
    type: "challenge",
    image: "rate-session"
  },
  {
    id: 6,
    name: "Ask a Question",
    description: "Participate by asking questions during sessions",
    points: 30,
    progress: 8,
    total: 10,
    completed: false,
    type: "challenge",
    image: "live-qa-like"
  },
  {
    id: 7,
    name: "Visit Sponsor Zone",
    description: "Check out our premium sponsors' area",
    points: 80,
    progress: 1,
    total: 1,
    completed: true,
    type: "challenge",
    image: "exhibitors-deal"
  },
  {
    id: 8,
    name: "Early Bird Check-in",
    description: "Check in before 9 AM on day 1",
    points: 60,
    progress: 1,
    total: 1,
    completed: true,
    type: "challenge",
    image: "trivia"
  },
  {
    id: 9,
    name: "Share Event Photo",
    description: "Upload a photo to the event gallery",
    points: 40,
    progress: 1,
    total: 1,
    completed: true,
    type: "challenge",
    image: "social-photo-post"
  },
  {
    id: 10,
    name: "Networking Lunch Participation",
    description: "Join the networking lunch session and meet new people",
    points: 70,
    progress: 0,
    total: 1,
    completed: false,
    type: "challenge",
    image: "news-reader"
  },
  {
    id: 11,
    name: "Complete Product Demo",
    description: "Attend a live product demonstration from our sponsors",
    points: 65,
    progress: 0,
    total: 1,
    completed: false,
    type: "challenge",
    image: "exhibitors-deal"
  },
  {
    id: 12,
    name: "Tech Workshop Completion",
    description: "Participate in our hands-on technical workshop session",
    points: 120,
    progress: 0,
    total: 1,
    completed: false,
    type: "challenge",
    image: "trivia"
  }
];

// Sample rewards data
const rewards = [
  {
    id: 101,
    name: "Networking Pro",
    description: "Connected with 50+ attendees",
    points: 250,
    completed: true,
    category: "badge",
    image: "attendee-scanner"
  },
  {
    id: 102,
    name: "Session Master",
    description: "Attended 10+ sessions",
    points: 150,
    completed: true,
    category: "badge",
    image: "rate-session"
  },
  {
    id: 103,
    name: "Participation Award",
    description: "Active participation in event activities",
    points: 200,
    completed: true,
    category: "award",
    image: "active-user"
  },
  {
    id: 104,
    name: "Top Contributor",
    description: "Most questions asked during sessions",
    points: 350,
    completed: true,
    category: "award",
    image: "live-qa-like"
  },
  {
    id: 105,
    name: "Event Certificate",
    description: "Certificate of participation",
    points: 0,
    completed: true,
    category: "certificate",
    image: "certificate",
    certificateUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: 106,
    name: "Speaker Certificate",
    description: "Certificate for speaking at the event",
    points: 0,
    completed: true,
    category: "certificate",
    image: "certificate",
    certificateUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    id: 107,
    name: "Exhibitor Award",
    description: "Certificate for exhibiting at the event",
    points: 0,
    completed: true,
    category: "certificate",
    image: "certificate",
    certificateUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    id: 108,
    name: "Best Booth Design",
    description: "Award for the most creative booth design",
    points: 300,
    completed: true,
    category: "award",
    image: "exhibitors-deal"
  },
  {
    id: 109,
    name: "Innovation Badge",
    description: "Presented for innovative product showcases",
    points: 180,
    completed: true,
    category: "badge", 
    image: "trivia"
  },
  {
    id: 110,
    name: "Community Leader",
    description: "Leading discussions and community engagement",
    points: 225,
    completed: true,
    category: "badge",
    image: "active-user"
  },
  {
    id: 111,
    name: "Workshop Leader Certificate",
    description: "Certificate for leading a workshop session",
    points: 0,
    completed: true,
    category: "certificate",
    certificateUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  }
];

const CoinIcon = () => <svg className="w-5 h-5" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <circle cx="256" cy="256" fill="#ffb703" r="256"></circle>
    <circle cx="256" cy="256" fill="#ffcc29" r="183.75"></circle>
    <g fill="none" strokeMiterlimit="10">
      <circle cx="256" cy="256" r="183.75" stroke="#f99300" strokeWidth="32.32"></circle>
      <path d="m341.31 468.54a227.51 227.51 0 0 0 142.15-210.92" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
      <path d="m142.26 59a226.34 226.34 0 0 1 113.74-30.46" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
      <path d="m64.77 132.76a228.18 228.18 0 0 1 39.64-46.37" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
      <path d="m56.22 364.84a226.58 226.58 0 0 1 -27.68-108.84" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
    </g>
    <path d="m303.53 237.67-44.85-64.91a3.25 3.25 0 0 0 -5.36 0l-44.85 64.91a3.26 3.26 0 0 1 -4 1.14l-63.64-28.27a3.27 3.27 0 0 0 -4.46 3.89l36.9 126.36a3.26 3.26 0 0 0 3.13 2.35h159.21a3.26 3.26 0 0 0 3.13-2.35l36.9-126.36a3.27 3.27 0 0 0 -4.46-3.89l-63.64 28.27a3.29 3.29 0 0 1 -4.01-1.14z" fill="#f99300"></path>
  </svg>;

// Confetti function 
const fireConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

// Card tilt effect hook
const useCardTilt = () => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    let mouseHover = false;
    let mousePosition = { x: 0, y: 0 };
    let cardSize = { width: 0, height: 0 };
    const SCALE_X = 8;
    const SCALE_Y = 5;
    
    const handleMouseMove = (e) => {
      if (!mouseHover) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePosition = { x, y };
      cardSize = {
        width: card.offsetWidth || 0,
        height: card.offsetHeight || 0,
      };
      card.style.transform = `perspective(1000px) rotateX(${
        (mousePosition.y / cardSize.height) * -(SCALE_Y * 2) + SCALE_Y
      }deg) rotateY(${
        (mousePosition.x / cardSize.width) * (SCALE_X * 2) - SCALE_X
      }deg) translateZ(10px)`;
    };
    
    const handleMouseOut = () => {
      mouseHover = false;
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.transition = 'transform 0.5s ease-out';
    };
    
    const handleMouseOver = () => {
      mouseHover = true;
      card.style.transition = 'transform 0.1s ease-out';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseout', handleMouseOut);
    card.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseout', handleMouseOut);
      card.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
  
  return cardRef;
};

const ChallengeCard = ({
  challenge
}) => {
  const isCompleted = challenge.completed || challenge.progress >= challenge.total;
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className={cn("transition-all duration-200 hover:shadow-md cursor-pointer relative h-full", 
          isCompleted ? "bg-white border-gray-200" : "bg-gray-50 border-gray-200")}>
          <CardContent className="p-6 flex flex-col h-full">
            {isCompleted && (
              <div className="absolute top-2 right-2">
                <Check className="h-5 w-5 text-green-500" />
              </div>
            )}
            
            <div className="flex flex-col h-full justify-center">
              <div className="flex items-center justify-center mb-4">
                <GamificationIcon 
                  iconType={challenge.image} 
                  className={cn("h-12 w-12", isCompleted ? "opacity-100" : "opacity-70")} 
                />
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                <h4 className="font-semibold line-clamp-2 mb-2 text-center">{challenge.name}</h4>
                <p className="text-sm text-gray-500 line-clamp-2 mb-6 text-center">{challenge.description}</p>
              </div>
              
              <div className="mt-auto flex items-center justify-center">
                {isCompleted ? (
                  <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                    <CoinIcon />
                    <span className="font-semibold ml-1 text-sm">{challenge.points} pts</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <CoinIcon />
                    <span className="text-gray-500 font-semibold ml-1 text-sm">{challenge.points} pts</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[350px] p-0 bg-transparent border-none shadow-none">
        <NFTChallengeCard challenge={challenge} isCompleted={isCompleted} />
      </DialogContent>
    </Dialog>
  );
};

const NFTChallengeCard = ({ challenge, isCompleted }) => {
  const cardRef = useCardTilt();
  
  useEffect(() => {
    if (isCompleted) {
      // Delay confetti to ensure dialog is open
      const timer = setTimeout(() => {
        fireConfetti();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isCompleted]);
  
  return (
    <div 
      ref={cardRef}
      className="relative aspect-[3/4] w-full max-w-[350px] mx-auto rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{ 
        transformStyle: 'preserve-3d', 
        transform: 'perspective(1000px)', 
        boxShadow: '0 30px 60px rgba(0,0,0,0.3)' 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-blue-400/20 to-emerald-400/20 backdrop-blur-md z-0"></div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-between bg-white/70 backdrop-blur-sm p-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none"></div>
        
        <div className="flex flex-col items-center w-full">
          <div className="mb-6 pt-4 transform hover:scale-105 transition-transform">
            <GamificationIcon 
              iconType={challenge.image} 
              className="h-32 w-32" // Doubled size
            />
          </div>
          
          <h3 className="text-2xl font-bold mb-3 text-center">{challenge.name}</h3>
          <p className="text-gray-600 mb-6 text-center text-sm">{challenge.description}</p>
          
          <div className={cn("flex items-center justify-center mb-6 p-2 rounded-lg",
            isCompleted ? "bg-green-50" : "bg-gray-50"
          )}>
            <CoinIcon />
            <span className={cn("text-xl font-bold ml-1", 
              isCompleted ? "text-green-600" : "text-gray-600"
            )}>
              {challenge.points} points
            </span>
          </div>
          
          <Button className="w-full">
            Go to Challenge <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          {isCompleted && 
            <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center justify-center">
              <Check className="h-4 w-4 mr-1" />
              Challenge Completed!
            </div>
          }
        </div>
      </div>
    </div>
  );
};

const ChallengeListItem = ({ challenge }) => {
  const isCompleted = challenge.completed || challenge.progress >= challenge.total;
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={cn("flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 border", 
          isCompleted ? "bg-white" : "bg-gray-50")}>
          <div className="flex-shrink-0 flex items-center justify-center mr-3">
            <GamificationIcon 
              iconType={challenge.image} 
              className="h-10 w-10" 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{challenge.name}</h4>
            <p className="text-xs text-gray-500 truncate">{challenge.description}</p>
          </div>
          
          <div className="flex items-center ml-4">
            {isCompleted ? (
              <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                <CoinIcon />
                <span className="font-semibold ml-1 text-sm">{challenge.points} pts</span>
              </div>
            ) : (
              <div className="flex items-center">
                <CoinIcon />
                <span className="text-gray-500 font-semibold ml-1 text-sm">{challenge.points} pts</span>
              </div>
            )}
          </div>
          
          {isCompleted && <Check className="h-4 w-4 text-green-500 ml-2" />}
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[350px] p-0 bg-transparent border-none shadow-none">
        <NFTChallengeCard challenge={challenge} isCompleted={isCompleted} />
      </DialogContent>
    </Dialog>
  );
};

const RewardCard = ({ reward }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="transition-all duration-200 hover:shadow-md cursor-pointer bg-white border-gray-200 h-full">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex flex-col h-full justify-center">
              <div className="flex items-center justify-center mb-4">
                {reward.category === "certificate" ? 
                  <div className="w-full">
                    <AspectRatio ratio={16/9} className="rounded-md overflow-hidden">
                      <img 
                        src={reward.certificateUrl} 
                        alt={reward.name}
                        className="w-full h-full object-cover" 
                      />
                    </AspectRatio>
                  </div> : 
                  <GamificationIcon 
                    iconType={reward.image} 
                    className="h-12 w-12" 
                  />
                }
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                <h4 className="font-semibold mb-2 line-clamp-2 text-center">{reward.name}</h4>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2 text-center">{reward.description}</p>
              </div>
              
              {reward.points > 0 && (
                <div className="mt-auto flex items-center justify-center">
                  <div className="flex items-center">
                    <CoinIcon />
                    <span className="font-semibold ml-1 text-blue-600">{reward.points} pts</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reward Details</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          {reward.category === "certificate" ? (
            <div className="w-full mb-4">
              <AspectRatio ratio={16/9}>
                <img 
                  src={reward.certificateUrl} 
                  alt={reward.name} 
                  className="w-full h-full object-cover rounded-md border border-gray-200" 
                />
              </AspectRatio>
            </div>
          ) : (
            <div className="mb-4">
              <GamificationIcon iconType={reward.image} className="h-16 w-16" />
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-2">{reward.name}</h3>
          <p className="text-gray-600 mb-6 text-center">{reward.description}</p>
          
          {reward.points > 0 && (
            <div className="flex items-center justify-center mb-6">
              <CoinIcon />
              <span className="text-lg font-bold ml-1 text-blue-600">
                {reward.points} points
              </span>
            </div>
          )}
          
          {reward.category === "certificate" && (
            <div className="flex gap-2 w-full">
              <Button className="flex-1" onClick={() => {
                toast({
                  title: "Certificate downloaded!",
                  description: "The certificate has been downloaded to your device."
                });
              }}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => {
                window.open(reward.certificateUrl, '_blank');
              }}>
                <ExternalLink className="mr-2 h-4 w-4" /> Open Full Size
              </Button>
            </div>
          )}
          
          <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            Reward Earned!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CertificateItem = ({ reward }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 border bg-white">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-3">
            <Award className="h-5 w-5 text-purple-500" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">{reward.name}</h4>
            <p className="text-xs text-gray-500">{reward.description}</p>
          </div>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{reward.name}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <div className="w-full mb-4">
            <AspectRatio ratio={16/9}>
              <img 
                src={reward.certificateUrl} 
                alt={reward.name} 
                className="w-full h-full object-cover rounded-md border border-gray-200" 
              />
            </AspectRatio>
          </div>
          
          <p className="text-gray-600 mb-6 text-center">{reward.description}</p>
          
          <div className="flex gap-2 w-full">
            <Button className="flex-1" onClick={() => {
              toast({
                title: "Certificate downloaded!",
                description: "The certificate has been downloaded to your device."
              });
            }}>
              <Download className="mr-2 h-4 w-4" /> Download Certificate
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => {
              window.open(reward.certificateUrl, '_blank');
            }}>
              <ExternalLink className="mr-2 h-4 w-4" /> Open Full Size
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RewardSection = ({ title, rewards, category }) => {
  return (
    <div className="mb-8">
      <h4 className="font-medium text-lg mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewards
          .filter(r => r.category === category)
          .map(reward => <RewardCard key={reward.id} reward={reward} />)
        }
      </div>
    </div>
  );
};

const CertificateSection = ({ rewards }) => {
  const certificates = rewards.filter(r => r.category === 'certificate');
  
  return (
    <div className="mb-8">
      <h4 className="font-medium text-lg mb-3">My Certificates</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {certificates.map(certificate => (
          <RewardCard key={certificate.id} reward={certificate} />
        ))}
      </div>
    </div>
  );
};

const Challenges = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('challenges');

  return <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Challenges & Achievements</h3>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="challenges" className="w-[300px]" onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="challenges" className="flex-1">Challenges</TabsTrigger>
            <TabsTrigger value="rewards" className="flex-1">Rewards</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {activeTab === 'challenges' && (
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-8 w-8", viewMode === 'grid' ? "bg-white" : "")}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-8 w-8", viewMode === 'list' ? "bg-white" : "")}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="challenges" className="mt-0">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {challenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)}
            </div>
          ) : (
            <div className="space-y-2">
              {challenges.map(challenge => <ChallengeListItem key={challenge.id} challenge={challenge} />)}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rewards" className="mt-0">
          <RewardSection title="Challenge Badges" rewards={rewards} category="badge" />
          <RewardSection title="My Awards" rewards={rewards} category="award" />
          <CertificateSection rewards={rewards} />
        </TabsContent>
      </Tabs>
    </div>;
};

export default Challenges;
