
import { ReactNode } from "react";

export interface ForumCategory {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: ReactNode;
  color: string;
  postCount: number;
  lastUpdate: string;
  type: "introduction" | "jobBoard" | "meetup" | "standard" | "chat";
  hasNewPosts?: boolean;
}

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
  commentCount: number;
  categoryId: number;
}

export interface Meetup {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  locationType: "virtual" | "physical";
  attendees: Attendee[];
  likes: number;
  comments: number;
  creatorName: string;
  creatorAvatar: string;
}

export interface Attendee {
  id: string;
  name: string;
  avatar: string;
}

export interface JobListing {
  id: number;
  companyName: string;
  companyLogo?: string;
  location: string;
  jobTitle: string;
  shortDescription: string;
  fullDescription: string;
  postedAt: string;
  postedBy: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Freelance";
  salary: string;
}

export interface Comment {
  id: number;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface ChatMessage {
  id: number;
  authorName: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}
