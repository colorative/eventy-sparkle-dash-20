import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, ThumbsUp, Clock } from "lucide-react";
import BoringAvatar from "boring-avatars";

interface Question {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  question: string;
  timestamp: string;
  votes: number;
  hasVoted: boolean;
  answered: boolean;
  answer?: string;
}

export const QAContent: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "AJ"
      },
      question: "What are the main challenges in implementing quantum computing in enterprise environments?",
      timestamp: "2 min ago",
      votes: 15,
      hasVoted: false,
      answered: false
    },
    {
      id: 2,
      user: {
        name: "Maria Garcia",
        avatar: "MG"
      },
      question: "How do you see AI ethics evolving in the next 5 years?",
      timestamp: "5 min ago",
      votes: 23,
      hasVoted: true,
      answered: true,
      answer: "AI ethics will become more standardized through international frameworks and regulatory compliance. We'll see increased focus on transparency, fairness, and accountability in AI systems."
    },
    {
      id: 3,
      user: {
        name: "David Chen",
        avatar: "DC"
      },
      question: "What skills should developers focus on to stay relevant in the next decade?",
      timestamp: "8 min ago",
      votes: 18,
      hasVoted: false,
      answered: false
    }
  ]);

  const [newQuestion, setNewQuestion] = useState("");

  const handleSubmitQuestion = () => {
    if (newQuestion.trim() === "") return;
    
    const question: Question = {
      id: Date.now(),
      user: {
        name: "Current User",
        avatar: "CU"
      },
      question: newQuestion,
      timestamp: "Just now",
      votes: 0,
      hasVoted: false,
      answered: false
    };

    setQuestions([question, ...questions]);
    setNewQuestion("");
  };

  const handleVote = (questionId: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, votes: q.hasVoted ? q.votes - 1 : q.votes + 1, hasVoted: !q.hasVoted }
        : q
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Live Q&A</h3>
      </div>

      {/* Submit Question */}
      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Ask a Question</h4>
          <div className="flex items-center gap-3">
            <BoringAvatar 
              size={32} 
              name="Current User" 
              variant="marble" 
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} 
            />
            <div className="flex-1 relative">
              <Input 
                placeholder="Type your question here..." 
                className="pr-10" 
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitQuestion();
                  }
                }}
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 absolute right-1 top-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50" 
                onClick={handleSubmitQuestion}
                disabled={newQuestion.trim() === ""}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">No Questions Yet</h3>
            <p className="text-sm text-gray-500">Be the first to ask a question!</p>
          </div>
        ) : (
          questions.map((question) => (
            <Card key={question.id} className={`${question.answered ? "bg-green-50 border-green-200" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <BoringAvatar 
                    size={32} 
                    name={question.user.name} 
                    variant="marble" 
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} 
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">{question.user.name}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {question.timestamp}
                      </span>
                      {question.answered && (
                        <span className="text-xs text-green-600 font-medium">Answered</span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-800 mb-3">{question.question}</p>
                    
                    {question.answered && question.answer && (
                      <div className="bg-white p-3 rounded-lg border border-green-200 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-green-700">Speaker Answer:</span>
                        </div>
                        <p className="text-sm text-gray-700">{question.answer}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-6 px-2 gap-1 text-xs ${
                          question.hasVoted 
                            ? "text-purple-600 bg-purple-50" 
                            : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                        }`}
                        onClick={() => handleVote(question.id)}
                      >
                        <ThumbsUp 
                          className="h-3 w-3" 
                          fill={question.hasVoted ? "currentColor" : "none"} 
                        /> 
                        {question.votes}
                      </Button>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {question.votes === 1 ? "1 person" : `${question.votes} people`} found this helpful
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};