
import React from "react";
import { ForumCategory } from "@/types/forum";

export const forumCategories: ForumCategory[] = [
  {
    id: 1,
    title: "Ice Breaker",
    slug: "ice-breaker",
    description: "Break the Ice! Say Hi to your fellow attendees.",
    icon: <span>👋</span>,
    color: "#FEE2E2",
    postCount: 52,
    lastUpdate: "posted today",
    type: "introduction",
    hasNewPosts: true
  },
  {
    id: 2,
    title: "Meetups & Virtual Meets",
    slug: "meetups",
    description: "Find and organize meetups with other attendees.",
    icon: <span>🗓️</span>,
    color: "#DBEAFE",
    postCount: 24,
    lastUpdate: "posted 2 days ago",
    type: "meetup"
  },
  {
    id: 3,
    title: "Craftsmanship",
    slug: "craftsmanship",
    description: "Discussions on techniques, tools, and best practices.",
    icon: <span>🛠️</span>,
    color: "#D1FAE5",
    postCount: 37,
    lastUpdate: "posted yesterday",
    type: "standard"
  },
  {
    id: 4,
    title: "Job Board",
    slug: "job-board",
    description: "Career opportunities and professional connections.",
    icon: <span>💼</span>,
    color: "#FEF3C7",
    postCount: 18,
    lastUpdate: "posted 3 days ago",
    type: "jobBoard"
  },
  {
    id: 5,
    title: "WellbeingWave Network",
    slug: "wellbeingwave",
    description: "Wellness, health, and self-care discussions.",
    icon: <span>🧘</span>,
    color: "#E9D5FF",
    postCount: 15,
    lastUpdate: "posted 5 days ago",
    type: "standard"
  },
  {
    id: 6,
    title: "Honoring the Artistry",
    slug: "artistry",
    description: "Appreciating and showcasing exceptional work.",
    icon: <span>🎨</span>,
    color: "#FBCFE8",
    postCount: 29,
    lastUpdate: "posted yesterday",
    type: "standard"
  },
  {
    id: 7,
    title: "Event Announcements",
    slug: "announcements",
    description: "Updates and news about upcoming events.",
    icon: <span>📢</span>,
    color: "#DDD6FE",
    postCount: 12,
    lastUpdate: "posted 1 week ago",
    type: "standard"
  },
  {
    id: 8,
    title: "Let's Chat",
    slug: "lets-chat",
    description: "Join the group chat - anyone can participate!",
    icon: <span>💬</span>,
    color: "#D1FAE5",
    postCount: 0,
    lastUpdate: "active now",
    type: "chat"
  }
];
