
export interface Author {
  name: string;
  username: string;
  company: string;
}

export interface CommentAuthor {
  name: string;
  username: string;
  company: string;
}

export interface Reply {
  id: string;
  author: CommentAuthor;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: CommentAuthor;
  content: string;
  createdAt: string;
  likes: number; 
  isLiked: boolean;
  replies?: Reply[];
}

export interface PollOption {
  text: string;
  percentage: number;
}

export interface Poll {
  question?: string;
  options: PollOption[];
  totalVotes: number;
  endsIn: string;
  voted?: boolean;
}

export interface EmojiReaction {
  emoji: string;
  count: number;
}

export interface Post {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  images?: string[];
  video?: string;
  poll?: Poll;
  isLiked?: boolean;
  isBookmarked?: boolean;
  emojiReactions?: EmojiReaction[];
}

// Sample unsplash images
const unsplashImages = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
];

export const mockPosts: Post[] = [
  {
    id: "post1",
    author: {
      name: "Jane Smith",
      username: "janesmith",
      company: "Tech Innovations"
    },
    content: "Just finished a great keynote at the Developer Conference. Here are some highlights from the presentation!",
    createdAt: "2h ago",
    likes: 24,
    comments: 5,
    images: [unsplashImages[0], unsplashImages[1]],
    isLiked: false,
    emojiReactions: [
      { emoji: "👍", count: 12 },
      { emoji: "🎉", count: 5 }
    ]
  },
  {
    id: "post2",
    author: {
      name: "Mark Johnson",
      username: "markj",
      company: "Design Masters"
    },
    content: "What do you think about the new product announcement? I'd love to hear your thoughts on this!",
    createdAt: "3h ago",
    likes: 18,
    comments: 32,
    poll: {
      question: "What's your take on the new product?",
      options: [
        { text: "Love it!", percentage: 65 },
        { text: "Needs improvement", percentage: 25 },
        { text: "Not interested", percentage: 10 }
      ],
      totalVotes: 120,
      endsIn: "2 days",
      voted: false
    },
    isBookmarked: true
  },
  {
    id: "post3",
    author: {
      name: "Samantha Lee",
      username: "samlee",
      company: "Digital Solutions"
    },
    content: "Check out this demo of our latest AI-powered application. We've made significant improvements to the user experience!",
    createdAt: "5h ago",
    likes: 45,
    comments: 12,
    video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    emojiReactions: [
      { emoji: "🔥", count: 18 },
      { emoji: "👏", count: 7 },
      { emoji: "❤️", count: 10 }
    ]
  },
  {
    id: "post4",
    author: {
      name: "Alex Wilson",
      username: "alexw",
      company: "Cloud Systems"
    },
    content: "Just had a breakthrough with our ML algorithm! Here are some visualizations of the performance improvements.",
    createdAt: "1d ago",
    likes: 72,
    comments: 28,
    images: [unsplashImages[2], unsplashImages[3], unsplashImages[4], unsplashImages[5]],
    isLiked: true
  },
  {
    id: "post5",
    author: {
      name: "Francium",
      username: "francium",
      company: "Event App"
    },
    content: "We're excited to announce that the new version of our event app is now live! What features would you like to see in our next update?",
    createdAt: "2d ago",
    likes: 103,
    comments: 47,
    poll: {
      options: [
        { text: "Better networking tools", percentage: 42 },
        { text: "Enhanced schedule view", percentage: 31 },
        { text: "More personalization options", percentage: 18 },
        { text: "Improved maps/navigation", percentage: 9 }
      ],
      totalVotes: 250,
      endsIn: "4 days",
      voted: true
    }
  },
  {
    id: "post6",
    author: {
      name: "Emily Chen",
      username: "emilyc",
      company: "Mobile Experts"
    },
    content: "Our booth is set up and ready for day 2 of the conference! Come visit us at booth #42 for demos and special offers.",
    createdAt: "2d ago",
    likes: 56,
    comments: 13,
    images: [unsplashImages[6], unsplashImages[7]],
    isBookmarked: true
  }
];

export const mockComments: Comment[] = [
  {
    id: "comment1",
    postId: "post1",
    author: {
      name: "David Brown",
      username: "davidb",
      company: "Solutions Inc"
    },
    content: "Great presentation! I especially liked the section on AI applications.",
    createdAt: "1h ago",
    likes: 12,
    isLiked: false,
    replies: []
  },
  {
    id: "comment2",
    postId: "post1",
    author: {
      name: "Lisa Wang",
      username: "lisaw",
      company: "Tech Visionaries"
    },
    content: "Would love to see more details on the implementation approach.",
    createdAt: "1h ago",
    likes: 8,
    isLiked: true,
    replies: []
  },
  {
    id: "comment3",
    postId: "post3",
    author: {
      name: "Michael Torres",
      username: "michaelt",
      company: "WebDev Pro"
    },
    content: "The UI improvements are impressive! How long did it take to develop?",
    createdAt: "2h ago",
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: "reply1",
        author: {
          name: "Samantha Lee",
          username: "samlee",
          company: "Digital Solutions"
        },
        content: "We spent about 4 months on the UI overhaul. Glad you like it!",
        createdAt: "1h ago",
        likes: 6,
        isLiked: true
      }
    ]
  },
  {
    id: "comment4",
    postId: "post3",
    author: {
      name: "Sarah Johnson",
      username: "sarahj",
      company: "UX Design Co"
    },
    content: "This is exactly what we need for our upcoming project. Is this solution available for licensing?",
    createdAt: "3h ago",
    likes: 7,
    isLiked: false,
    replies: []
  },
  {
    id: "comment5",
    postId: "post4",
    author: {
      name: "Robert Chen",
      username: "robertc",
      company: "Data Analytics"
    },
    content: "Impressive results! What techniques did you use for optimizing the algorithm?",
    createdAt: "10h ago",
    likes: 23,
    isLiked: true,
    replies: []
  },
  {
    id: "comment6",
    postId: "post5",
    author: {
      name: "Jessica Liu",
      username: "jessical",
      company: "Mobile First"
    },
    content: "I'd love to see better integration with calendar apps for scheduling.",
    createdAt: "1d ago",
    likes: 9,
    isLiked: false,
    replies: []
  },
  {
    id: "comment7",
    postId: "post5",
    author: {
      name: "Thomas Wright",
      username: "thomasw",
      company: "Conference Pro"
    },
    content: "The app has been so useful at this event. My top request would be improved offline support.",
    createdAt: "1d ago",
    likes: 14,
    isLiked: true,
    replies: []
  },
  {
    id: "comment8",
    postId: "post6",
    author: {
      name: "Olivia Martinez",
      username: "oliviam",
      company: "Tech Review"
    },
    content: "I'll be stopping by later today! Looking forward to seeing the demos.",
    createdAt: "1d ago",
    likes: 5,
    isLiked: false,
    replies: []
  }
];
