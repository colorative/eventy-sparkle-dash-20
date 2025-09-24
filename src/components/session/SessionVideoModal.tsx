
import React, { useState, useCallback, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Play, 
  Pause,
  Send, 
  ThumbsUp, 
  MessageSquare, 
  BarChart3, 
  Plus,
  Users,
  Clock,
  Maximize,
  Minimize2,
  X,
  Move
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BoringAvatar from "boring-avatars";
import { usePip } from "@/contexts/PipContext";

interface SessionVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionData: any;
  onRestoreFromPip?: () => void;
}

// PIP Player Component removed - now handled by global PipContext

export const SessionVideoModal: React.FC<SessionVideoModalProps> = ({
  isOpen,
  onClose,
  sessionData,
  onRestoreFromPip
}) => {
  const { showPip } = usePip();
  const [newQuestion, setNewQuestion] = useState("");
  const [newPollQuestion, setNewPollQuestion] = useState("");
  const [newPollOptions, setNewPollOptions] = useState(["", ""]);
  const [selectedPollAnswer, setSelectedPollAnswer] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMinimize = () => {
    showPip(sessionData, onRestoreFromPip);
    onClose(); // Close the modal when minimizing to PIP
  };
  const [questions] = useState([
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "SJ",
      question: "What are the key benefits of implementing AI in our current workflow?",
      timestamp: "2 minutes ago",
      likes: 12,
      liked: false
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "MC",
      question: "How do we handle data privacy concerns with these new technologies?",
      timestamp: "5 minutes ago",
      likes: 8,
      liked: true
    },
    {
      id: 3,
      user: "Emma Rodriguez",
      avatar: "ER",
      question: "Are there any prerequisites for getting started with quantum computing?",
      timestamp: "8 minutes ago",
      likes: 15,
      liked: false
    }
  ]);

  const [polls] = useState([
    {
      id: 1,
      question: "Which technology excites you most for 2024?",
      options: [
        { id: "a", text: "Artificial Intelligence", votes: 45 },
        { id: "b", text: "Quantum Computing", votes: 32 },
        { id: "c", text: "Blockchain", votes: 18 },
        { id: "d", text: "IoT", votes: 25 }
      ],
      totalVotes: 120,
      timeLeft: "2:30",
      hasVoted: false
    },
    {
      id: 2,
      question: "How do you rate your current AI knowledge?",
      options: [
        { id: "a", text: "Beginner", votes: 28 },
        { id: "b", text: "Intermediate", votes: 52 },
        { id: "c", text: "Advanced", votes: 35 },
        { id: "d", text: "Expert", votes: 15 }
      ],
      totalVotes: 130,
      timeLeft: "5:45",
      hasVoted: true
    }
  ]);

  const handleQuestionSubmit = () => {
    if (newQuestion.trim() === "") return;
    
    toast({
      title: "Question submitted",
      description: "Your question has been added to the live Q&A feed."
    });
    setNewQuestion("");
  };

  const handlePollSubmit = () => {
    if (newPollQuestion.trim() === "" || newPollOptions.some(opt => opt.trim() === "")) {
      toast({
        title: "Invalid poll",
        description: "Please fill in the question and all options.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Poll created",
      description: "Your poll has been submitted for review."
    });
    setNewPollQuestion("");
    setNewPollOptions(["", ""]);
  };

  const handlePollVote = (pollId: number, optionId: string) => {
    setSelectedPollAnswer(optionId);
    toast({
      title: "Vote recorded",
      description: "Thank you for participating in the poll!"
    });
  };

  const addPollOption = () => {
    if (newPollOptions.length < 6) {
      setNewPollOptions([...newPollOptions, ""]);
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const updated = [...newPollOptions];
    updated[index] = value;
    setNewPollOptions(updated);
  };

  const removePollOption = (index: number) => {
    if (newPollOptions.length > 2) {
      setNewPollOptions(newPollOptions.filter((_, i) => i !== index));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setIsPlaying(false);
      }
    }}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Session Video Player</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Left Side - Video Player */}
          <div className="lg:col-span-2 bg-black flex flex-col justify-center p-4">
            <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-lg overflow-hidden relative mx-auto">
              <video 
                src="https://sample-videos.com/zip/10/mp4/mp4-1280x720-Dummy.mp4"
                poster={sessionData?.videoThumbnail}
                className="w-full h-full object-cover"
                controls={false}
                ref={(video) => {
                  if (video) {
                    if (isPlaying) {
                      video.play();
                    } else {
                      video.pause();
                    }
                  }
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  className="rounded-full h-20 w-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 ml-1 text-white" />
                  )}
                </Button>
              </div>
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between text-white text-sm">
                    <span className="font-medium">{sessionData?.title}</span>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>247 viewing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                className="gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleMinimize}
                className="gap-2"
              >
                <Minimize2 className="h-4 w-4" />
                Minimize
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Full screen functionality can be implemented here if needed
                }}
                className="gap-2"
              >
                <Maximize className="h-4 w-4" />
                Full Screen
              </Button>
            </div>
          </div>

        {/* Right Side - Interactive Panel */}
          <div className="bg-gray-50 border-l flex flex-col h-full">
            <Tabs defaultValue="qa" className="flex-1 flex flex-col">
              <div className="border-b bg-white p-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="qa" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Live Q&A
                  </TabsTrigger>
                  <TabsTrigger value="polls" className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Live Polls
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Q&A Tab */}
              <TabsContent value="qa" className="flex-1 flex flex-col m-0">
                {/* Question Input */}
                <div className="p-4 bg-white border-b">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Ask a question..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="min-h-[80px] resize-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                            handleQuestionSubmit();
                          }
                        }}
                      />
                    </div>
                    <Button 
                      onClick={handleQuestionSubmit}
                      disabled={newQuestion.trim() === ""}
                      className="self-end"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Press Ctrl+Enter to submit quickly
                  </p>
                </div>

                {/* Questions Feed */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {questions.map((q) => (
                      <Card key={q.id} className="shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <BoringAvatar 
                              size={32} 
                              name={q.user} 
                              variant="marble" 
                              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} 
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">{q.user}</span>
                                <span className="text-xs text-gray-500">{q.timestamp}</span>
                              </div>
                              <p className="text-sm text-gray-700 mb-3">{q.question}</p>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className={`h-8 px-2 gap-1 ${q.liked ? 'text-indigo-600' : 'text-gray-500'}`}
                                >
                                  <ThumbsUp className="h-3 w-3" fill={q.liked ? "currentColor" : "none"} />
                                  <span className="text-xs">{q.likes}</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Polls Tab */}
              <TabsContent value="polls" className="flex-1 flex flex-col m-0">
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-6">
                    {/* Live Polls */}
                    {polls.map((poll) => (
                      <Card key={poll.id} className="shadow-sm">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-base">{poll.question}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span>{poll.timeLeft}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {poll.options.map((option) => {
                              const percentage = (option.votes / poll.totalVotes) * 100;
                              const isSelected = selectedPollAnswer === option.id;
                              
                              return (
                                <div key={option.id} className="space-y-1">
                                  <Button
                                    variant={isSelected ? "default" : "outline"}
                                    className="w-full justify-start h-auto p-3"
                                    onClick={() => handlePollVote(poll.id, option.id)}
                                    disabled={poll.hasVoted}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <span className="text-left">{option.text}</span>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm">{option.votes}</span>
                                        <Badge variant="secondary" className="text-xs">
                                          {percentage.toFixed(0)}%
                                        </Badge>
                                      </div>
                                    </div>
                                  </Button>
                                  {poll.hasVoted && (
                                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                      <div 
                                        className="bg-indigo-600 h-full transition-all duration-300"
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <Separator className="my-3" />
                          <div className="text-center text-sm text-gray-500">
                            {poll.totalVotes} total votes
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Create New Poll */}
                    <Card className="shadow-sm border-dashed">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Create a Poll
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Input
                          placeholder="Enter your poll question..."
                          value={newPollQuestion}
                          onChange={(e) => setNewPollQuestion(e.target.value)}
                        />
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Poll Options:</label>
                          {newPollOptions.map((option, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => updatePollOption(index, e.target.value)}
                              />
                              {newPollOptions.length > 2 && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removePollOption(index)}
                                >
                                  ×
                                </Button>
                              )}
                            </div>
                          ))}
                          
                          {newPollOptions.length < 6 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={addPollOption}
                              className="gap-1"
                            >
                              <Plus className="h-3 w-3" />
                              Add Option
                            </Button>
                          )}
                        </div>

                        <Button onClick={handlePollSubmit} className="w-full">
                          Create Poll
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
         </div>
      </DialogContent>
    </Dialog>
  );
};
