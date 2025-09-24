
export interface Survey {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  closesAt: string;
  questions: SurveyQuestion[];
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: "text" | "longText" | "singleChoice" | "multipleChoice" | "dropdown" | "rating" | "scale";
  required: boolean;
  options?: string[];
}
