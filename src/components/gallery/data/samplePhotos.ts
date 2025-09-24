import { Photo } from "../PhotoGrid";
import { v4 as uuidv4 } from "uuid";

// Sample photos data - extended with more photos
const baseSamplePhotos: Photo[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 24,
    description: "Our booth at the tech conference",
    username: "alex_tech",
    uploadDate: "2 days ago",
    comments: [
      {
        id: "c1",
        username: "maria_design",
        content: "Great setup! Love the lighting.",
        timestamp: "1 day ago"
      },
      {
        id: "c2",
        username: "tech_enthusiast",
        content: "What monitors are those? They look awesome!",
        timestamp: "12 hours ago"
      }
    ]
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 15,
    description: "Team lunch after the successful presentation",
    username: "sara_project",
    uploadDate: "1 day ago",
    comments: [
      {
        id: "c3",
        username: "foodie_dev",
        content: "That looks delicious! Where was this?",
        timestamp: "1 day ago"
      }
    ]
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 32,
    description: "Live demo of our new product",
    username: "jack_demo",
    uploadDate: "3 days ago",
    comments: []
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 8,
    description: "Networking session with industry leaders",
    username: "networking_pro",
    uploadDate: "2 days ago",
    comments: [
      {
        id: "c4",
        username: "industry_expert",
        content: "Great meeting you all!",
        timestamp: "1 day ago"
      }
    ]
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 19,
    description: "AI and automation panel discussion",
    username: "tech_future",
    uploadDate: "4 days ago",
    comments: []
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 27,
    description: "Cybersecurity workshop",
    username: "security_expert",
    uploadDate: "3 days ago",
    comments: []
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 12,
    description: "New hardware showcase",
    username: "hardware_geek",
    uploadDate: "5 days ago",
    comments: []
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 31,
    description: "Code review session with the team",
    username: "lead_dev",
    uploadDate: "1 week ago",
    comments: []
  },
  {
    id: "9",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 16,
    description: "VR demo at the innovation corner",
    username: "vr_enthusiast",
    uploadDate: "6 days ago",
    comments: []
  },
  {
    id: "10",
    imageUrl: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 9,
    description: "Digital art exhibition",
    username: "art_tech",
    uploadDate: "2 weeks ago",
    comments: []
  },
  {
    id: "11",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 22,
    description: "Collaborative workspace session",
    username: "team_builder",
    uploadDate: "4 days ago",
    comments: []
  },
  {
    id: "12",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 14,
    description: "Remote work discussion panel",
    username: "remote_work",
    uploadDate: "3 days ago",
    comments: []
  },
  {
    id: "13",
    imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 8,
    description: "Innovation brainstorm session",
    username: "idea_generator",
    uploadDate: "1 week ago",
    comments: []
  },
  {
    id: "14",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 17,
    description: "Frontend development workshop",
    username: "ui_designer",
    uploadDate: "2 days ago",
    comments: []
  },
  {
    id: "15",
    imageUrl: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 26,
    description: "Wearable tech showcase",
    username: "wearable_tech",
    uploadDate: "5 days ago",
    comments: []
  },
  {
    id: "16",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 5,
    description: "DevOps implementation talk",
    username: "devops_pro",
    uploadDate: "1 week ago",
    comments: []
  },
  {
    id: "17",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 13,
    description: "Clean desk setup at the event",
    username: "minimalist_dev",
    uploadDate: "3 days ago",
    comments: []
  },
  {
    id: "18",
    imageUrl: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 29,
    description: "Drone technology demonstration",
    username: "drone_pilot",
    uploadDate: "4 days ago",
    comments: []
  },
  {
    id: "19",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 11,
    description: "Nature-inspired tech design panel",
    username: "biomimicry_fan",
    uploadDate: "1 week ago",
    comments: []
  },
  {
    id: "20",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 18,
    description: "Environmental tech solutions showcase",
    username: "eco_tech",
    uploadDate: "6 days ago",
    comments: []
  },
  {
    id: "21",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 7,
    description: "Bioinformatics workshop",
    username: "bio_data",
    uploadDate: "2 weeks ago",
    comments: []
  },
  {
    id: "22",
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 24,
    description: "Sustainable tech solutions panel",
    username: "green_tech",
    uploadDate: "3 days ago",
    comments: []
  },
  {
    id: "23",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 16,
    description: "Forest conservation tech presentation",
    username: "earth_tech",
    uploadDate: "1 week ago",
    comments: []
  },
  {
    id: "24",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 14,
    description: "Carbon footprint reduction technologies",
    username: "climate_tech",
    uploadDate: "5 days ago",
    comments: []
  },
  {
    id: "25",
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 19,
    description: "Green energy solutions exhibit",
    username: "solar_power",
    uploadDate: "4 days ago",
    comments: []
  },
  {
    id: "26",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 22,
    description: "Mountain retreat team building",
    username: "team_outdoors",
    uploadDate: "2 weeks ago",
    comments: []
  },
  {
    id: "27",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 28,
    description: "Night sky observation tech demo",
    username: "space_tech",
    uploadDate: "3 days ago",
    comments: []
  },
  {
    id: "28",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 15,
    description: "Cloud computing summit",
    username: "cloud_expert",
    uploadDate: "1 week ago",
    comments: []
  },
  {
    id: "29",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 9,
    description: "Ocean conservation technology panel",
    username: "ocean_tech",
    uploadDate: "6 days ago",
    comments: []
  },
  {
    id: "30",
    imageUrl: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&q=80&w=600&h=300",
    likes: 21,
    description: "Alpine research technology showcase",
    username: "mountain_research",
    uploadDate: "4 days ago",
    comments: []
  }
];

// Sample comments for random distribution
const sampleComments = [
  { username: "photography_lover", content: "Absolutely stunning composition!", timestamp: "2 days ago" },
  { username: "tech_geek", content: "What camera did you use for this shot?", timestamp: "1 day ago" },
  { username: "travel_junkie", content: "This reminds me of my trip last year!", timestamp: "3 days ago" },
  { username: "design_guru", content: "Love the color balance in this photo", timestamp: "5 hours ago" },
  { username: "art_critic", content: "The lighting in this is perfect", timestamp: "1 week ago" },
  { username: "casual_observer", content: "Wow! This is incredible", timestamp: "2 days ago" },
  { username: "event_planner", content: "This would make a great promotional image", timestamp: "3 days ago" },
  { username: "marketing_pro", content: "Can we feature this on our social media?", timestamp: "1 day ago" },
  { username: "tech_enthusiast", content: "The details in this shot are amazing!", timestamp: "4 hours ago" },
  { username: "creative_mind", content: "This inspires me to try something similar", timestamp: "2 weeks ago" },
  { username: "photo_enthusiast", content: "Perfect timing on this capture!", timestamp: "1 day ago" },
  { username: "conference_attendee", content: "I remember this moment!", timestamp: "3 days ago" },
  { username: "industry_expert", content: "This represents the event perfectly", timestamp: "5 days ago" },
  { username: "product_manager", content: "Our team would love this shot", timestamp: "1 week ago" },
  { username: "ux_designer", content: "Great composition and framing", timestamp: "2 days ago" }
];

// Add random comments to each photo
export const photosWithComments = baseSamplePhotos.map(photo => {
  const commentCount = Math.floor(Math.random() * 5) + 1;
  const photoComments = [...photo.comments];
  
  for (let i = 0; i < commentCount; i++) {
    const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
    photoComments.push({
      id: uuidv4(),
      username: randomComment.username,
      content: randomComment.content,
      timestamp: randomComment.timestamp
    });
  }
  
  return { ...photo, comments: photoComments };
});
