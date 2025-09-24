import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, CheckCircle } from "lucide-react";
import BoringAvatar from "boring-avatars";

interface Poll {
  id: number;
  question: string;
  options: { id: number; text: string; votes: number }[];
  totalVotes: number;
  hasVoted: boolean;
  selectedOption?: number;
}

export const PollsContent: React.FC = () => {
  const [polls] = useState<Poll[]>([
    {
      id: 1,
      question: "Which technology topic interests you most?",
      options: [
        { id: 1, text: "Artificial Intelligence", votes: 45 },
        { id: 2, text: "Quantum Computing", votes: 32 },
        { id: 3, text: "Cybersecurity", votes: 28 },
        { id: 4, text: "Cloud Computing", votes: 19 }
      ],
      totalVotes: 124,
      hasVoted: false
    },
    {
      id: 2,
      question: "How likely are you to implement these technologies in your organization?",
      options: [
        { id: 1, text: "Very Likely", votes: 67 },
        { id: 2, text: "Somewhat Likely", votes: 43 },
        { id: 3, text: "Unlikely", votes: 12 },
        { id: 4, text: "Not Sure", votes: 18 }
      ],
      totalVotes: 140,
      hasVoted: true,
      selectedOption: 1
    }
  ]);

  const [activePoll, setActivePoll] = useState<number | null>(null);

  const handleVote = (pollId: number, optionId: number) => {
    setActivePoll(pollId);
    // In a real app, you would send this to your API
    setTimeout(() => {
      setActivePoll(null);
    }, 1000);
  };

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">Live Polls</h3>
      </div>

      {polls.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-medium text-gray-900 mb-2">No Active Polls</h3>
          <p className="text-sm text-gray-500">Check back later for live polls during the session</p>
        </div>
      ) : (
        <div className="space-y-6">
          {polls.map((poll) => (
            <Card key={poll.id} className="border-l-4 border-l-indigo-500">
              <CardContent className="p-4">
                <h4 className="font-medium mb-4">{poll.question}</h4>
                
                <div className="space-y-3">
                  {poll.options.map((option) => {
                    const percentage = getPercentage(option.votes, poll.totalVotes);
                    const isSelected = poll.hasVoted && poll.selectedOption === option.id;
                    
                    return (
                      <div key={option.id} className="relative">
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          className={`w-full justify-between h-auto p-3 text-left relative overflow-hidden ${
                            poll.hasVoted ? "cursor-default" : "hover:bg-gray-50"
                          } ${isSelected ? "bg-indigo-600 hover:bg-indigo-700" : ""}`}
                          onClick={() => !poll.hasVoted && handleVote(poll.id, option.id)}
                          disabled={poll.hasVoted || activePoll === poll.id}
                        >
                          {poll.hasVoted && (
                            <div 
                              className="absolute left-0 top-0 h-full bg-indigo-100 transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          )}
                          
                          <div className="relative flex items-center justify-between w-full">
                            <span className={`${isSelected ? "text-white" : ""}`}>
                              {option.text}
                            </span>
                            <div className="flex items-center gap-2">
                              {poll.hasVoted && (
                                <span className={`text-sm ${isSelected ? "text-white" : "text-gray-600"}`}>
                                  {percentage}% ({option.votes})
                                </span>
                              )}
                              {isSelected && <CheckCircle className="h-4 w-4 text-white" />}
                            </div>
                          </div>
                        </Button>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-3 text-sm text-gray-500 text-center">
                  {poll.hasVoted ? (
                    `${poll.totalVotes} total votes • Thank you for voting!`
                  ) : (
                    `${poll.totalVotes} people have voted • Click to vote`
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};