import { useState, useEffect } from "react";
import { Survey } from "@/types/survey";

// Mock data for surveys
const mockSurveys: Survey[] = [
  {
    id: "survey-1",
    title: "Keynote Session Feedback",
    description: "Please share your thoughts on today's keynote presentations and speakers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    createdAt: "2025-04-25T09:00:00Z",
    closesAt: "2025-05-15T23:59:59Z",
    questions: [
      {
        id: "q1",
        text: "How would you rate the overall quality of the keynote?",
        type: "rating",
        required: true
      },
      {
        id: "q2",
        text: "Which presenter did you find most engaging?",
        type: "singleChoice",
        required: false,
        options: ["John Smith", "Jane Doe", "Robert Johnson", "Lisa Chen"]
      },
      {
        id: "q3",
        text: "What topics would you like to see covered in future keynotes?",
        type: "multipleChoice",
        required: false,
        options: ["AI Ethics", "Sustainable Tech", "Remote Work", "Security", "Innovation"]
      },
      {
        id: "q4",
        text: "How likely are you to attend next year's event?",
        type: "scale",
        required: true
      }
    ]
  },
  {
    id: "survey-2",
    title: "Exhibition Floor Experience",
    description: "Help us improve the exhibition area with your feedback on layout, exhibitors, and overall experience.",
    thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    createdAt: "2025-04-26T10:30:00Z",
    closesAt: "2025-05-10T23:59:59Z",
    questions: [
      {
        id: "q1",
        text: "How easy was it to navigate the exhibition floor?",
        type: "singleChoice",
        required: true,
        options: ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"]
      },
      {
        id: "q2",
        text: "Which exhibitor booths did you visit?",
        type: "multipleChoice",
        required: false,
        options: ["TechCorp", "InnoSoft", "DataViz", "CloudMasters", "AI Solutions"]
      },
      {
        id: "q3",
        text: "On a scale of 1-10, how would you rate the overall exhibition experience?",
        type: "scale",
        required: true
      }
    ]
  },
  {
    id: "survey-3",
    title: "Networking Event Feedback",
    description: "Tell us about your experience at our evening networking reception.",
    thumbnailUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    createdAt: "2025-04-27T08:15:00Z",
    closesAt: "2025-04-30T23:59:59Z", // This one is closed
    questions: [
      {
        id: "q1",
        text: "How valuable were the networking opportunities?",
        type: "rating",
        required: true
      },
      {
        id: "q2",
        text: "What did you think of the venue?",
        type: "text",
        required: false
      }
    ]
  },
  {
    id: "survey-4",
    title: "Workshop Quality Assessment",
    description: "Rate the quality and relevance of the workshops you attended.",
    thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    createdAt: "2025-04-28T14:00:00Z",
    closesAt: "2025-05-20T23:59:59Z",
    questions: [
      {
        id: "q1",
        text: "Which workshop did you attend?",
        type: "dropdown",
        required: true,
        options: ["Data Science 101", "Cloud Migration", "UX Design Principles", "Agile Project Management", "Cybersecurity Basics"]
      },
      {
        id: "q2",
        text: "How would you rate the instructor's knowledge?",
        type: "rating",
        required: true
      },
      {
        id: "q3",
        text: "Any suggestions for improving the workshop?",
        type: "longText",
        required: false
      }
    ]
  }
];

export function useSurveys() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call with a timeout
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        setSurveys(mockSurveys);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { surveys, isLoading, error };
}
