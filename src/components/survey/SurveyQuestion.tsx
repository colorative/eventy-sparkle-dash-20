
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SurveyQuestion as QuestionType } from "@/types/survey";
import { Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface SurveyQuestionProps {
  question: QuestionType;
}

export const SurveyQuestion: React.FC<SurveyQuestionProps> = ({ question }) => {
  const [rating, setRating] = useState<number>(0);
  
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
  
  const renderQuestionInput = () => {
    switch (question.type) {
      case "text":
        return <Input placeholder="Your answer" className="text-sm" />;
        
      case "longText":
        return <Textarea placeholder="Your answer" className="min-h-24 text-sm" />;
        
      case "singleChoice":
        return (
          <RadioGroup className="space-y-1">
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q-${question.id}-option-${i}`} />
                <Label htmlFor={`q-${question.id}-option-${i}`} className="text-sm">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case "multipleChoice":
        return (
          <div className="space-y-1">
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox id={`q-${question.id}-option-${i}`} />
                <Label htmlFor={`q-${question.id}-option-${i}`} className="text-sm">{option}</Label>
              </div>
            ))}
          </div>
        );
        
      case "dropdown":
        return (
          <Select>
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option, i) => (
                <SelectItem key={i} value={option} className="text-sm">{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case "rating":
        return (
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="relative">
                <button
                  type="button"
                  onClick={() => handleRatingClick(i + 1)}
                  className="p-0.5 hover:text-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                >
                  <Star 
                    className={`w-6 h-6 ${i < rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-slate-300"}`} 
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            ))}
          </div>
        );

      case "scale":
        return (
          <div className="py-4 px-1">
            <Slider 
              defaultValue={[3]} 
              max={10} 
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-500">1</span>
              <span className="text-xs text-slate-500">10</span>
            </div>
          </div>
        );
        
      default:
        return <p className="text-red-500 text-sm">Unknown question type</p>;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="py-3 pb-1.5">
        <h3 className="font-medium text-sm">{question.text}</h3>
        {question.required && (
          <span className="text-xs text-red-500">* Required</span>
        )}
      </CardHeader>
      <CardContent className="text-sm py-3">{renderQuestionInput()}</CardContent>
    </Card>
  );
};
