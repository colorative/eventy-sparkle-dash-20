import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, Star, CheckCircle, Quote, Menu, X, Sun, Moon, ChevronLeft, ChevronRight, ChevronDown, Eye, Grid3X3, List, Grid, Clock, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Toggle } from '@/components/ui/toggle';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import Avatar from 'boring-avatars';
import heroImage from '@/assets/hero-banner.jpg';
import eventLogo from '@/assets/event-logo.png';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { SectionSettings } from '@/components/landing/SectionSettings';
const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scheduleView, setScheduleView] = useState('list'); // 'list', 'card', 'calendar', 'timeline'
  const [activeScheduleDate, setActiveScheduleDate] = useState('friday');
  const [activeTrack, setActiveTrack] = useState('all');
  const [speakersToShow, setSpeakersToShow] = useState(12);
  const [galleryToShow, setGalleryToShow] = useState(12);
  const [exhibitorsToShow, setExhibitorsToShow] = useState(24);
  const [ticketView, setTicketView] = useState('grid'); // 'grid' or 'list'
  const [sectionVisibility, setSectionVisibility] = useState({
    countdown: true,
    about: true,
    features: false,
    speakers: true,
    agenda: true,
    gallery: true,
    sponsors: true,
    testimonials: false,
    faq: false,
    contact: true,
    tickets: true,
    whyattend: false,
    news: true,
    location: true
  });
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 30
  });
  const navigate = useNavigate();
  const {
    theme,
    setTheme
  } = useTheme();

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1
          };
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59
          };
        } else if (prev.hours > 0) {
          return {
            ...prev,
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59
          };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };
  const handleSectionToggle = (sectionId: string, visible: boolean) => {
    setSectionVisibility(prev => ({
      ...prev,
      [sectionId]: visible
    }));
  };
  const loadMoreSpeakers = () => {
    setSpeakersToShow(prev => Math.min(prev + 12, speakers.length));
  };
  const loadMoreGallery = () => {
    setGalleryToShow(prev => Math.min(prev + 12, galleryImages.length));
  };
  const loadMoreExhibitors = () => {
    setExhibitorsToShow(prevShow => prevShow + 12);
  };
  const menuItems = [{
    name: 'Home',
    id: 'hero'
  }, {
    name: 'About',
    id: 'about'
  }, {
    name: 'Agenda',
    id: 'agenda'
  }, {
    name: 'Speakers',
    id: 'speakers'
  }, {
    name: 'Sponsors',
    id: 'sponsors'
  }, {
    name: 'Tickets',
    id: 'tickets'
  }, {
    name: 'Contact',
    id: 'contact'
  }];
  const [sponsorsToShow, setSponsorsToShow] = useState(12);
  const sponsors = [{
    name: 'Dashlane',
    logo: 'https://www.vectorlogo.zone/logos/dashlane/dashlane-ar21.svg',
    tier: 'Platinum',
    tierColor: 'bg-slate-900'
  }, {
    name: 'DigIdentity',
    logo: 'https://www.vectorlogo.zone/logos/digidentityeu/digidentityeu-ar21.svg',
    tier: 'Gold',
    tierColor: 'bg-yellow-500'
  }, {
    name: 'Feedzai',
    logo: 'https://www.vectorlogo.zone/logos/feedzai/feedzai-ar21.svg',
    tier: 'Gold',
    tierColor: 'bg-yellow-500'
  }, {
    name: 'Equisoft',
    logo: 'https://www.vectorlogo.zone/logos/equisoft/equisoft-ar21.svg',
    tier: 'Silver',
    tierColor: 'bg-gray-400'
  }, {
    name: 'Fusion Reactor',
    logo: 'https://www.vectorlogo.zone/logos/fusion-reactor/fusion-reactor-ar21.svg',
    tier: 'Bronze',
    tierColor: 'bg-orange-400'
  }, {
    name: 'Hello Grove',
    logo: 'https://www.vectorlogo.zone/logos/hellogrove/hellogrove-ar21.svg',
    tier: 'Bronze',
    tierColor: 'bg-orange-400'
  }, {
    name: 'Habitica',
    logo: 'https://www.vectorlogo.zone/logos/habitica/habitica-ar21.svg',
    tier: 'Silver',
    tierColor: 'bg-gray-400'
  }, {
    name: 'Hello Inspire',
    logo: 'https://www.vectorlogo.zone/logos/helloinspire/helloinspire-ar21.svg',
    tier: 'Bronze',
    tierColor: 'bg-orange-400'
  }, {
    name: 'Lever',
    logo: 'https://www.vectorlogo.zone/logos/leverco/leverco-ar21.svg',
    tier: 'Gold',
    tierColor: 'bg-yellow-500'
  }, {
    name: 'Moven',
    logo: 'https://www.vectorlogo.zone/logos/moven/moven-ar21.svg',
    tier: 'Silver',
    tierColor: 'bg-gray-400'
  }, {
    name: 'Papertrail',
    logo: 'https://www.vectorlogo.zone/logos/papertrailapp/papertrailapp-ar21.svg',
    tier: 'Bronze',
    tierColor: 'bg-orange-400'
  }, {
    name: 'Supabase',
    logo: 'https://www.vectorlogo.zone/logos/supabase/supabase-ar21.svg',
    tier: 'Platinum',
    tierColor: 'bg-slate-900'
  }];
  const loadMoreSponsors = () => {
    setSponsorsToShow(prev => Math.min(prev + 6, sponsors.length));
  };
  const speakers = [{
    name: 'Dr. Michael Rodriguez',
    title: 'AI Research Director',
    company: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=533&fit=crop&crop=face',
    topic: 'The Future of Artificial Intelligence'
  }, {
    name: 'Sarah Thompson',
    title: 'VP of Engineering',
    company: 'Innovation Ltd',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=533&fit=crop&crop=face',
    topic: 'Building Scalable Systems'
  }, {
    name: 'Emma Rodriguez',
    title: 'Product Design Lead',
    company: 'Digital Solutions',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=533&fit=crop&crop=face',
    topic: 'Design Thinking in Tech'
  }, {
    name: 'Dr. James Wilson',
    title: 'CTO',
    company: 'FutureTech',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=533&fit=crop&crop=face',
    topic: 'Quantum Computing Breakthroughs'
  }, {
    name: 'Lisa Chang',
    title: 'Head of Product',
    company: 'DataCore',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=533&fit=crop&crop=face',
    topic: 'Data-Driven Innovation'
  }, {
    name: 'Alex Kumar',
    title: 'Security Expert',
    company: 'CyberShield',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=533&fit=crop&crop=face',
    topic: 'Cybersecurity in the Cloud Era'
  }, {
    name: 'Dr. Maria Santos',
    title: 'Research Scientist',
    company: 'BioTech Labs',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=533&fit=crop&crop=face',
    topic: 'AI in Healthcare'
  }, {
    name: 'David Park',
    title: 'Blockchain Expert',
    company: 'CryptoVentures',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=533&fit=crop&crop=face',
    topic: 'Decentralized Finance'
  }, {
    name: 'Rachel Green',
    title: 'UX Director',
    company: 'Design Studio',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=533&fit=crop&crop=face',
    topic: 'The Future of User Experience'
  }, {
    name: 'Mark Johnson',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&h=533&fit=crop&crop=face',
    topic: 'Infrastructure as Code'
  }, {
    name: 'Sophie Miller',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    image: 'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=300&h=533&fit=crop&crop=face',
    topic: 'Machine Learning at Scale'
  }, {
    name: 'Robert Chen',
    title: 'Startup Founder',
    company: 'NextGen AI',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=533&fit=crop&crop=face',
    topic: 'Entrepreneurship in Tech'
  }, {
    name: 'Dr. Jennifer Kim',
    title: 'AI Ethics Researcher',
    company: 'EthiTech Labs',
    image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=300&h=533&fit=crop&crop=face',
    topic: 'Responsible AI Development'
  }, {
    name: 'Carlos Martinez',
    title: 'Cloud Architect',
    company: 'SkyTech Solutions',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=533&fit=crop&crop=face',
    topic: 'Serverless Architecture'
  }, {
    name: 'Anna Petrov',
    title: 'Machine Learning Engineer',
    company: 'DeepTech Inc',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=300&h=533&fit=crop&crop=face',
    topic: 'Advanced Neural Networks'
  }, {
    name: 'Tom Bradley',
    title: 'Frontend Architect',
    company: 'WebTech Studios',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=533&fit=crop&crop=face',
    topic: 'Modern Web Development'
  }, {
    name: 'Nina Walsh',
    title: 'Product Manager',
    company: 'InnovateCorp',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=533&fit=crop&crop=face',
    topic: 'Product Strategy in AI'
  }, {
    name: 'Kevin O\'Connor',
    title: 'Robotics Engineer',
    company: 'RoboTech Labs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=533&fit=crop&crop=face',
    topic: 'The Future of Robotics'
  }, {
    name: 'Dr. Priya Sharma',
    title: 'Quantum Computing Expert',
    company: 'QuantumTech',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=533&fit=crop&crop=face',
    topic: 'Quantum Algorithms'
  }, {
    name: 'Lucas Anderson',
    title: 'IoT Specialist',
    company: 'ConnectedWorld',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=533&fit=crop&crop=face',
    topic: 'Internet of Things Evolution'
  }, {
    name: 'Maya Patel',
    title: 'AR/VR Designer',
    company: 'ImmersiveTech',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=533&fit=crop&crop=face',
    topic: 'Immersive User Experiences'
  }, {
    name: 'Oliver Thompson',
    title: 'Tech Entrepreneur',
    company: 'StartupX',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=533&fit=crop&crop=face',
    topic: 'Building Tech Startups'
  }, {
    name: 'Isabella Garcia',
    title: 'Cybersecurity Analyst',
    company: 'SecureNet',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=300&h=533&fit=crop&crop=face',
    topic: 'Zero Trust Security'
  }, {
    name: 'Ryan Mitchell',
    title: 'Blockchain Developer',
    company: 'CryptoSoft',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=533&fit=crop&crop=face',
    topic: 'Smart Contract Development'
  }];
  const galleryImages = ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop'];
  const tickets = [{
    name: 'Early Bird',
    price: '$199',
    originalPrice: '$299',
    description: 'Perfect for individual attendees looking to join the tech revolution',
    features: ['Access to all sessions', 'Networking events', 'Welcome kit', 'Digital materials', 'Lunch & refreshments', 'Certificate of attendance'],
    popular: false,
    badge: 'Limited Time'
  }, {
    name: 'Standard',
    price: '$299',
    description: 'Complete conference experience with comprehensive access to all content',
    features: ['Access to all sessions', 'Networking events', 'Welcome kit', 'Digital materials', 'Lunch included', 'Workshop access', 'Evening reception'],
    popular: true,
    badge: 'Most Popular'
  }, {
    name: 'Premium',
    price: '$499',
    description: 'Premium experience with exclusive perks and priority access to speakers',
    features: ['Access to all sessions', 'Networking events', 'Welcome kit', 'Digital materials', 'All meals included', 'VIP lounge access', 'Priority seating', 'Exclusive speaker meet & greet'],
    popular: false,
    badge: 'Best Value'
  }, {
    name: 'Enterprise',
    price: '$799',
    description: 'Comprehensive package designed for teams and organizations to maximize value',
    features: ['Access to all sessions', 'Networking events', 'Welcome kit', 'Digital materials', 'All meals included', 'VIP lounge access', 'Priority seating', 'Private meeting rooms', '1-on-1 sessions', 'Team workshops'],
    popular: false,
    badge: 'For Teams'
  }, {
    name: 'Student',
    price: '$99',
    description: 'Special discounted rate for students and academic researchers',
    features: ['Access to all sessions', 'Networking events', 'Digital materials', 'Student ID required', 'Career guidance sessions', 'Academic networking'],
    popular: false,
    badge: '50% Off'
  }, {
    name: 'Startup',
    price: '$149',
    description: 'Perfect for entrepreneurs and startup founders looking to scale their business',
    features: ['Access to all sessions', 'Networking events', 'Welcome kit', 'Pitch opportunity', 'Investor meetups', 'Startup showcase participation'],
    popular: false,
    badge: 'For Founders'
  }, {
    name: 'VIP Experience',
    price: '$1299',
    description: 'Ultimate conference experience',
    features: ['Access to all sessions', 'All meals included', 'VIP lounge access', 'Priority seating', 'Private meeting rooms', '1-on-1 sessions', 'Speaker dinner', 'Exclusive workshops'],
    popular: false,
    badge: 'Exclusive'
  }, {
    name: 'Virtual',
    price: '$49',
    description: 'Join us online',
    features: ['Live stream access', 'Digital materials', 'Virtual networking', 'Recorded sessions'],
    popular: false,
    badge: 'Remote Access'
  }];
  const features = [{
    icon: Users,
    title: 'Networking Opportunities',
    description: 'Connect with industry leaders and peers from around the world'
  }, {
    icon: Star,
    title: 'Expert Speakers',
    description: 'Learn from the best minds in technology and innovation'
  }, {
    icon: Calendar,
    title: 'Interactive Sessions',
    description: 'Participate in workshops, panels, and Q&A sessions'
  }, {
    icon: MapPin,
    title: 'Premium Venue',
    description: 'State-of-the-art facilities in the heart of the city'
  }];
  const testimonials = [{
    name: 'John Smith',
    company: 'Tech Startup CEO',
    text: 'This event was a game-changer for our business. The networking opportunities were incredible!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  }, {
    name: 'Lisa Wang',
    company: 'Product Manager',
    text: 'Amazing speakers and valuable insights. I left with actionable strategies for my team.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=100&h=100&fit=crop&crop=face'
  }, {
    name: 'Alex Rodriguez',
    company: 'Software Engineer',
    text: 'The workshops were hands-on and practical. I implemented what I learned immediately.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  }, {
    name: 'Sarah Johnson',
    company: 'Design Director',
    text: 'Inspiring sessions and fantastic networking. Already planning to attend next year!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }, {
    name: 'Michael Chen',
    company: 'CTO',
    text: 'Best tech conference I\'ve attended. The quality of speakers was outstanding.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
  }];
  const faqs = [{
    question: 'What is included in the ticket price?',
    answer: 'Your ticket includes access to all sessions, networking events, meals, and conference materials.'
  }, {
    question: 'Can I change my ticket type after purchase?',
    answer: 'Yes, you can upgrade your ticket type by contacting our support team and paying the difference.'
  }, {
    question: 'Is there a dress code for the event?',
    answer: 'Business casual attire is recommended for all sessions and networking events.'
  }, {
    question: 'What are the event dates and times?',
    answer: 'TechSummit 2024 runs from March 15-17, 2024. Each day starts at 9:00 AM and ends at 6:00 PM.'
  }, {
    question: 'Where is the event located?',
    answer: 'The event takes place at Moscone Center, 747 Howard St, San Francisco, CA 94103.'
  }, {
    question: 'Is parking available at the venue?',
    answer: 'Yes, there are several parking garages nearby. We also recommend using public transportation or ride-sharing services.'
  }, {
    question: 'Will sessions be recorded?',
    answer: 'Select sessions will be recorded and made available to ticket holders within 48 hours after the event.'
  }, {
    question: 'Can I get a refund if I cannot attend?',
    answer: 'Refunds are available up to 14 days before the event. After that, tickets can be transferred to another person.'
  }, {
    question: 'Are meals provided during the event?',
    answer: 'Yes, all ticket types include breakfast, lunch, and coffee breaks. Premium and Enterprise tickets also include the networking dinner.'
  }, {
    question: 'Is there a mobile app for the event?',
    answer: 'Yes, we have a dedicated mobile app with schedules, speaker bios, networking features, and real-time updates.'
  }];
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background border-b border-border z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src={eventLogo} alt="Event Logo" className="w-40 h-12 object-contain" />
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map(item => <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-muted-foreground hover:text-primary transition-colors">
                  {item.name}
                </button>)}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button onClick={() => scrollToSection('pricing')}>
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={() => navigate('/login')} variant="secondary">
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                {menuItems.map(item => <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </button>)}
                <div className="flex items-center space-x-4 pt-4 border-t border-border">
                  <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                  <div className="space-y-3">
                    <Button onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('pricing');
                }} className="w-full">
                      Register Now
                    </Button>
                    <Button onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login');
                }} variant="secondary" className="w-full">
                      Login
                    </Button>
                  </div>
                </div>
              </nav>
            </motion.div>}
        </div>
      </header>

      {/* About Section */}
      {sectionVisibility.about && <section id="about" className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center pt-3">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-sm">
              March 15-17, 2024 • San Francisco
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">TechSummit 2026</h1>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button onClick={() => scrollToSection('tickets')} className="px-6 py-2">
                Get Your Tickets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => scrollToSection('agenda')} className="px-6 py-2">
                View Agenda
              </Button>
            </div>

            {/* Video Player */}
            <VideoPlayer 
              videoUrl="https://cdn-dev.eventify.io/eventify/asset/SSYouTube.online_HighlightsfromTheAISummitNewYork2024_1080p.mp4" 
              fallbackImage="https://colorative.sirv.com/Frame%20481988.png" 
            />

            <p className="text-lg text-muted-foreground mt-8">
              TechSummit 2024 brings together the brightest minds in technology to explore the latest innovations, share knowledge, and build connections that drive the future forward. Join us for an unforgettable experience filled with inspiring talks, hands-on workshops, and unparalleled networking opportunities.
            </p>
          </div>
        </div>
      </section>}

      {/* Countdown Timer */}
      {sectionVisibility.countdown && <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Starts In</h2>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-4 gap-4 md:gap-8">
                {Object.entries(timeLeft).map(([unit, value]) => <div key={unit} className="text-center">
                    <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm">
                      <div className="text-2xl md:text-4xl font-bold text-primary">{value}</div>
                      <div className="text-sm md:text-base text-muted-foreground capitalize">{unit}</div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </section>}

      {/* Features */}
      {sectionVisibility.features && <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover what makes TechSummit 2024 the premier technology event of the year
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="group">
                 <div className="relative overflow-hidden rounded-xl">
                   <img src={`https://images.unsplash.com/photo-${index === 0 ? '1540575467063-178a50c2df87' : index === 1 ? '1522202176988-66273c2fd55f' : index === 2 ? '1591115765373-5207764f72e7' : '1505373877841-8d25f7d46678'}?w=400&h=300&fit=crop`} alt={feature.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                     <feature.icon className="h-8 w-8 mb-3" />
                     <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                     <p className="text-white/90 text-sm">{feature.description}</p>
                   </div>
                 </div>
              </motion.div>)}
          </div>
        </div>
      </section>}

      {/* Speakers */}
      {sectionVisibility.speakers && <section id="speakers" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Speakers</h2>
            
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {speakers.slice(0, speakersToShow).map((speaker, index) => <motion.div key={index} initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: index * 0.1
          }} viewport={{
            once: true
          }}>
                 <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                   <CardContent className="p-0">
                     <div className="aspect-[3/5] overflow-hidden">
                       <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const avatarDiv = target.nextElementSibling as HTMLElement;
                    if (avatarDiv) avatarDiv.style.display = 'flex';
                  }} />
                        <div className="w-full h-full bg-muted hidden items-center justify-center">
                          <Avatar size={120} name={speaker.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                        </div>
                      </div>
                      <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1 truncate">{speaker.name}</h3>
                      <p className="text-primary font-medium mb-1 text-sm truncate">{speaker.title}</p>
                      <p className="text-muted-foreground text-xs mb-2">{speaker.company}</p>
                      
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
          {speakersToShow < speakers.length && <div className="text-center mt-12">
              <Button onClick={loadMoreSpeakers} variant="outline" size="lg">
                Load More Speakers
              </Button>
            </div>}
        </div>
      </section>}

      {/* Agenda Section */}
      {sectionVisibility.agenda && <section id="agenda" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Schedule</h2>
            
          </div>
          
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2">
              <Button variant={activeScheduleDate === 'friday' ? 'default' : 'outline'} size="sm" onClick={() => setActiveScheduleDate('friday')} className="h-10">
                Friday - Mar 15
              </Button>
              <Button variant={activeScheduleDate === 'saturday' ? 'default' : 'outline'} size="sm" onClick={() => setActiveScheduleDate('saturday')} className="h-10">
                Saturday - Mar 16
              </Button>
              <Button variant={activeScheduleDate === 'sunday' ? 'default' : 'outline'} size="sm" onClick={() => setActiveScheduleDate('sunday')} className="h-10">
                Sunday - Mar 17
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" placeholder="Search sessions..." className="pl-10 pr-4 py-2 border rounded-lg w-64 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <Button variant="outline" size="sm" className="h-10 gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <div className="flex border rounded-lg p-1 bg-muted">
                <Button variant={scheduleView === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setScheduleView('list')} className="h-8 px-3">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant={scheduleView === 'card' ? 'default' : 'ghost'} size="sm" onClick={() => setScheduleView('card')} className="h-8 px-3">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant={scheduleView === 'calendar' ? 'default' : 'ghost'} size="sm" onClick={() => setScheduleView('calendar')} className="h-8 px-3">
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant={scheduleView === 'timeline' ? 'default' : 'ghost'} size="sm" onClick={() => setScheduleView('timeline')} className="h-8 px-3">
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tracks Tab */}
          <div className="mb-6 flex gap-2 flex-wrap">
            <Button variant={activeTrack === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTrack('all')} className="h-8">
              All Tracks
            </Button>
            <Button variant={activeTrack === 'ai' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTrack('ai')} className="h-8">
              AI & ML
            </Button>
            <Button variant={activeTrack === 'web' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTrack('web')} className="h-8">
              Web Dev
            </Button>
            <Button variant={activeTrack === 'mobile' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTrack('mobile')} className="h-8">
              Mobile
            </Button>
            <Button variant={activeTrack === 'devops' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTrack('devops')} className="h-8">
              DevOps
            </Button>
          </div>
          
        {scheduleView === 'calendar' ?
        // Calendar View
        <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="grid grid-cols-7 border-b border-border">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="p-4 text-center font-medium bg-muted/50 border-r border-border last:border-r-0">
                    {day}
                  </div>)}
              </div>
              <div className="grid grid-cols-7">
                {Array.from({
              length: 35
            }, (_, i) => {
              const date = i + 1;
              const hasEvent = [10, 11, 12].includes(date);
              return <div key={i} className="h-32 border-r border-border border-b border-border last:border-r-0 p-2">
                      <div className="text-sm text-muted-foreground mb-1">{date <= 31 ? date : ''}</div>
                      {hasEvent && date <= 31 && <div className="space-y-1">
                          <div className="text-xs bg-primary/10 text-primary p-1 rounded truncate">
                            AI Workshop
                          </div>
                          <div className="text-xs bg-blue-100 text-blue-800 p-1 rounded truncate">
                            Tech Talk
                          </div>
                        </div>}
                    </div>;
            })}
              </div>
            </div> : scheduleView === 'timeline' ?
        // Timeline View
        <div className="relative">
              <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-border"></div>
              <div className="space-y-8">
                {[{
              time: '3:15 pm',
              title: 'Registration',
              desc: 'Join us and register you are with us',
              track: 'General'
            }, {
              time: '4:00 pm',
              title: 'No Code tools for designers',
              desc: 'Everything about no code tools.',
              speaker: 'Ricky Laing',
              track: 'Web Dev'
            }, {
              time: '5:00 pm',
              title: 'Art that revives words',
              desc: 'What if more than just sitting on a page or screen, were words?',
              speaker: 'Sila Diaz',
              track: 'AI & ML'
            }, {
              time: '6:15 pm',
              title: 'Pizza Break',
              desc: 'Take a break and network with fellow attendees',
              track: 'General'
            }, {
              time: '7:30 pm',
              title: 'How to sell design',
              desc: 'As a artist, you don\'t get around the idea that you\'re going to need to think about and show your projects',
              speaker: 'Andrea Emery',
              track: 'Mobile'
            }].map((session, index) => <div key={index} className="relative flex items-start">
                    <div className="flex-shrink-0 w-20 text-right pr-4">
                      <div className="text-sm font-medium">{session.time}</div>
                    </div>
                    <div className="w-3 h-3 bg-primary rounded-full relative z-10 -ml-1.5 mt-2"></div>
                    <div className="flex-1 ml-6">
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">{session.title}</h3>
                          <Badge variant="outline" className="text-xs">{session.track}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{session.desc}</p>
                        {session.speaker && <div className="flex items-center gap-2">
                            <Avatar size={32} name={session.speaker} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                            <span className="text-sm font-medium">{session.speaker}</span>
                          </div>}
                      </Card>
                    </div>
                  </div>)}
              </div>
            </div> :
        // List and Card Views
        <div className={scheduleView === 'card' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {[{
            time: '3:15 pm',
            title: 'Registration',
            desc: 'Join us and register you are with us'
          }, {
            time: '4:00 pm',
            title: 'No Code tools for designers',
            desc: 'Everything about no code tools.',
            speaker: 'Ricky Laing'
          }, {
            time: '5:00 pm',
            title: 'Art that revives words',
            desc: 'What if more than just sitting on a page or screen, were words?',
            speaker: 'Sila Diaz'
          }, {
            time: '6:15 pm',
            title: 'Pizza Break',
            desc: 'Take a break and network with fellow attendees'
          }, {
            time: '7:30 pm',
            title: 'How to sell design',
            desc: 'As a artist, you don\'t get around the idea that you\'re going to need to think about and show your projects',
            speaker: 'Andrea Emery'
          }, {
            time: '8:45 pm',
            title: 'AI in Modern Development',
            desc: 'Exploring the future of AI-powered development tools',
            speaker: 'Dr. Michael Rodriguez'
          }, {
            time: '9:30 pm',
            title: 'Networking Session',
            desc: 'Connect with industry professionals and peers'
          }, {
            time: '10:15 pm',
            title: 'Future of Web Technologies',
            desc: 'A deep dive into emerging web technologies',
            speaker: 'Sarah Thompson'
          }, {
            time: '11:00 pm',
            title: 'Workshop: Building Scalable APIs',
            desc: 'Hands-on workshop for building robust APIs',
            speaker: 'Emma Rodriguez'
          }, {
            time: '11:45 pm',
            title: 'Closing Keynote',
            desc: 'Inspiring thoughts on the future of technology',
            speaker: 'Dr. James Wilson'
          }].map((session, index) => <Card key={index} className={scheduleView === 'card' ? "p-4" : "p-6"}>
                  <div className={scheduleView === 'card' ? "space-y-3" : "flex items-start gap-6"}>
                    <div className={`text-sm font-medium text-muted-foreground ${scheduleView === 'card' ? '' : 'min-w-[80px]'}`}>
                      {session.time}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{session.title}</h3>
                      <p className="text-muted-foreground mb-2">{session.desc}</p>
                    </div>
                    {session.speaker && <div className={`flex items-center gap-2 ${scheduleView === 'card' ? 'mt-4' : ''}`}>
                        <Avatar size={40} name={session.speaker} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                        <span className="text-sm font-medium">{session.speaker}</span>
                      </div>}
                  </div>
                </Card>)}
            </div>}
        </div>
      </section>}

      {/* Exhibitors */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Exhibitors</h2>
            
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[{
            name: 'GitHub',
            logo: 'https://www.vectorlogo.zone/logos/github/github-ar21.svg'
          }, {
            name: 'Google',
            logo: 'https://www.vectorlogo.zone/logos/google/google-ar21.svg'
          }, {
            name: 'Microsoft',
            logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg'
          }, {
            name: 'Apple',
            logo: 'https://www.vectorlogo.zone/logos/apple/apple-ar21.svg'
          }, {
            name: 'Amazon',
            logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg'
          }, {
            name: 'Facebook',
            logo: 'https://www.vectorlogo.zone/logos/facebook/facebook-ar21.svg'
          }, {
            name: 'Netflix',
            logo: 'https://www.vectorlogo.zone/logos/netflix/netflix-ar21.svg'
          }, {
            name: 'Spotify',
            logo: 'https://www.vectorlogo.zone/logos/spotify/spotify-ar21.svg'
          }, {
            name: 'Airbnb',
            logo: 'https://www.vectorlogo.zone/logos/airbnb/airbnb-ar21.svg'
          }, {
            name: 'Tesla',
            logo: 'https://www.vectorlogo.zone/logos/tesla/tesla-ar21.svg'
          }, {
            name: 'Slack',
            logo: 'https://www.vectorlogo.zone/logos/slack/slack-ar21.svg'
          }, {
            name: 'Adobe',
            logo: 'https://www.vectorlogo.zone/logos/adobe/adobe-ar21.svg'
          }, {
            name: 'NVIDIA',
            logo: 'https://www.vectorlogo.zone/logos/nvidia/nvidia-ar21.svg'
          }, {
            name: 'Intel',
            logo: 'https://www.vectorlogo.zone/logos/intel/intel-ar21.svg'
          }, {
            name: 'MongoDB',
            logo: 'https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg'
          }, {
            name: 'Docker',
            logo: 'https://www.vectorlogo.zone/logos/docker/docker-ar21.svg'
          }, {
            name: 'Node.js',
            logo: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg'
          }, {
            name: 'React',
            logo: 'https://www.vectorlogo.zone/logos/react/react-ar21.svg'
          }, {
            name: 'Angular',
            logo: 'https://www.vectorlogo.zone/logos/angular/angular-ar21.svg'
          }, {
            name: 'Vue.js',
            logo: 'https://www.vectorlogo.zone/logos/vuejs/vuejs-ar21.svg'
          }, {
            name: 'Kubernetes',
            logo: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-ar21.svg'
          }, {
            name: 'PostgreSQL',
            logo: 'https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.svg'
          }, {
            name: 'Redis',
            logo: 'https://www.vectorlogo.zone/logos/redis/redis-ar21.svg'
          }, {
            name: 'Firebase',
            logo: 'https://www.vectorlogo.zone/logos/firebase/firebase-ar21.svg'
          }, {
            name: 'Jenkins',
            logo: 'https://www.vectorlogo.zone/logos/jenkins/jenkins-ar21.svg'
          }, {
            name: 'PyTorch',
            logo: 'https://www.vectorlogo.zone/logos/pytorch/pytorch-ar21.svg'
          }, {
            name: 'TensorFlow',
            logo: 'https://www.vectorlogo.zone/logos/tensorflow/tensorflow-ar21.svg'
          }, {
            name: 'JavaScript',
            logo: 'https://www.vectorlogo.zone/logos/javascript/javascript-ar21.svg'
          }, {
            name: 'Python',
            logo: 'https://www.vectorlogo.zone/logos/python/python-ar21.svg'
          }, {
            name: 'Java',
            logo: 'https://www.vectorlogo.zone/logos/java/java-ar21.svg'
          }, {
            name: 'Go',
            logo: 'https://www.vectorlogo.zone/logos/golang/golang-ar21.svg'
          }, {
            name: 'Rust',
            logo: 'https://www.vectorlogo.zone/logos/rust/rust-ar21.svg'
          }, {
            name: 'TypeScript',
            logo: 'https://www.vectorlogo.zone/logos/typescript/typescript-ar21.svg'
          }, {
            name: 'GitHub',
            logo: 'https://www.vectorlogo.zone/logos/github/github-ar21.svg'
          }, {
            name: 'Google',
            logo: 'https://www.vectorlogo.zone/logos/google/google-ar21.svg'
          }, {
            name: 'Microsoft',
            logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg'
          }].slice(0, exhibitorsToShow).map((exhibitor, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.05
          }} viewport={{
            once: true
          }} className="group">
                <Card className="p-6 h-32 flex items-center justify-center hover:shadow-lg transition-shadow">
                  <img src={exhibitor.logo} alt={exhibitor.name} className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-contain group-hover:scale-110 transition-transform" loading="lazy" />
                </Card>
                <div className="mt-3 text-center">
                  <span className="text-sm font-medium">{exhibitor.name}</span>
                </div>
              </motion.div>)}
          </div>
          {exhibitorsToShow < 36 && <div className="text-center mt-12">
              <Button onClick={loadMoreExhibitors} variant="outline" size="lg">
                Load More
              </Button>
            </div>}
        </div>
      </section>

      {/* Sponsors */}
      {sectionVisibility.sponsors && <section id="sponsors" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Sponsors</h2>
            
          </div>
          <div className="space-y-12">
            {['Platinum', 'Gold', 'Silver', 'Bronze'].map(tier => {
            const tierSponsors = sponsors.filter(sponsor => sponsor.tier === tier).slice(0, sponsorsToShow);
            if (tierSponsors.length === 0) return null;
            const tierColor = tierSponsors[0]?.tierColor || 'bg-gray-400';
            return <div key={tier} className="space-y-8">
                  {/* Tier Header with Dividers */}
                  <div className="flex items-center justify-center">
                    <div className="flex-1 h-px bg-border"></div>
                    <div className={`mx-6 px-6 py-2 rounded-full text-white text-sm font-medium ${tierColor}`}>
                      {tier} Sponsors
                    </div>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>
                  
                  {/* Sponsors Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tierSponsors.map((sponsor, index) => <motion.div key={`${tier}-${index}`} initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: index * 0.05
                }} viewport={{
                  once: true
                }} className="group">
                        <Card className="p-6 hover:shadow-lg transition-shadow relative">
                          <div className="flex items-center justify-center w-full h-32">
                            <img src={sponsor.logo} alt={sponsor.name} className="h-24 w-[280px] object-contain group-hover:scale-110 transition-transform" loading="lazy" />
                          </div>
                        </Card>
                        <div className="mt-3 text-center">
                          <span className="text-sm font-medium">{sponsor.name}</span>
                        </div>
                      </motion.div>)}
                  </div>
                </div>;
          })}
          </div>
          {sponsorsToShow < sponsors.length && <div className="text-center mt-12">
              <Button onClick={loadMoreSponsors} variant="outline" size="lg">
                Load More
              </Button>
            </div>}
        </div>
      </section>}

      {/* Image Gallery */}
      {sectionVisibility.gallery && <section className="py-20">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Gallery</h2>
            
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.slice(0, galleryToShow).map((image, index) => <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>)}
          </div>
          {galleryToShow < galleryImages.length && <div className="text-center mt-12">
              <Button onClick={loadMoreGallery} variant="outline" size="lg">
                Load More Images
              </Button>
            </div>}
        </div>
      </section>}

      {/* Tickets */}
      {sectionVisibility.tickets && <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Ticket</h2>
            
            <div className="flex justify-center mt-6">
              <div className="flex border rounded-lg p-1 bg-muted">
                <Button variant={ticketView === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setTicketView('grid')} className="px-4">
                  <Grid className="h-4 w-4 mr-2" />
                  Grid View
                </Button>
                <Button variant={ticketView === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setTicketView('list')} className="px-4">
                  <List className="h-4 w-4 mr-2" />
                  List View
                </Button>
              </div>
            </div>
          </div>
          <div className={ticketView === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4 max-w-4xl mx-auto"}>
            {tickets.map((ticket, index) => <Card key={index} className={`relative ${ticket.popular ? 'border-primary shadow-lg' : ''} ${ticketView === 'list' ? 'flex flex-row items-center' : 'h-full'}`}>
                {ticket.popular && <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    {ticket.badge || 'Most Popular'}
                  </Badge>}
                {ticket.badge && !ticket.popular && <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2" variant="secondary">
                    {ticket.badge}
                  </Badge>}
                <CardContent className={ticketView === 'list' ? 'flex-1 p-6 flex items-center justify-between' : 'p-6 text-center h-full'}>
                  {ticketView === 'list' ? <>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{ticket.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {ticket.features.slice(0, 3).map((feature, i) => <Badge key={i} variant="outline" className="text-xs">
                              {feature}
                            </Badge>)}
                          {ticket.features.length > 3 && <Badge variant="outline" className="text-xs">
                              +{ticket.features.length - 3} more
                            </Badge>}
                        </div>
                      </div>
                      <div className="text-center ml-6">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {ticket.price}
                          {ticket.originalPrice && <span className="text-lg text-muted-foreground line-through ml-2">
                              {ticket.originalPrice}
                            </span>}
                        </div>
                        <Button variant={ticket.popular ? 'default' : 'outline'}>
                          Buy Now
                        </Button>
                      </div>
                    </> : <div className="flex flex-col h-full">
                       <div className="flex-1">
                         <h3 className="text-xl font-bold mb-4">{ticket.name}</h3>
                         <div className="text-3xl font-bold text-primary mb-2">
                           {ticket.price}
                           {ticket.originalPrice && <div className="text-lg text-muted-foreground line-through">
                               {ticket.originalPrice}
                             </div>}
                         </div>
                          <p className="text-sm text-muted-foreground mb-6">{ticket.description}</p>
                       </div>
                       <Button className="w-full mt-auto" variant={ticket.popular ? 'default' : 'outline'}>
                         Buy Now
                       </Button>
                     </div>}
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>}

      {/* Why Should You Attend */}
      {sectionVisibility.whyattend && <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Should You Attend This Event?</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Learn from Industry Leaders</h3>
                    <p className="text-muted-foreground">Get insights from top executives and thought leaders who are shaping the future of technology.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Expand Your Network</h3>
                    <p className="text-muted-foreground">Connect with like-minded professionals, potential partners, and future collaborators.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Stay Ahead of Trends</h3>
                    <p className="text-muted-foreground">Discover emerging technologies and trends before they become mainstream.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Hands-on Learning</h3>
                    <p className="text-muted-foreground">Participate in interactive workshops and gain practical skills you can apply immediately.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop" alt="Tech conference" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>
        </div>
      </section>}

      {/* Maps Section */}
      {sectionVisibility.location && <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Location</h2>
            
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Moscone Center</h3>
              <p className="text-muted-foreground mb-6">
                Located in the heart of downtown San Francisco, Moscone Center is the premier destination for world-class events. With state-of-the-art facilities and convenient access to hotels, restaurants, and transportation.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>747 Howard St, San Francisco, CA 94103</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>March 15-17, 2024</span>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* News Section */}
      {sectionVisibility.news && <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest News</h2>
            
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
            title: "New Speaker Announcement: AI Pioneer Dr. Sarah Chen",
            excerpt: "We're excited to announce that Dr. Sarah Chen, renowned AI researcher, will be joining our speaker lineup.",
            date: "March 1, 2024",
            image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=250&fit=crop"
          }, {
            title: "Early Bird Tickets Now Available",
            excerpt: "Get your tickets at a special discounted price. Limited time offer ending soon.",
            date: "February 28, 2024",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop"
          }, {
            title: "Workshop Schedule Released",
            excerpt: "Check out our comprehensive workshop schedule featuring hands-on sessions with industry experts.",
            date: "February 25, 2024",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
          }].map((news, index) => <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">{news.date}</div>
                    <h3 className="font-semibold mb-3">{news.title}</h3>
                    <p className="text-muted-foreground text-sm">{news.excerpt}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>}

      {/* Testimonials */}
      {sectionVisibility.testimonials && <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Attendees Say</h2>
          </div>
          <div className="relative">
            <Button variant="outline" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-10" onClick={() => setCurrentTestimonial(Math.max(0, currentTestimonial - 1))} disabled={currentTestimonial === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-10" onClick={() => setCurrentTestimonial(Math.min(testimonials.length - 3, currentTestimonial + 1))} disabled={currentTestimonial >= testimonials.length - 3}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="overflow-hidden px-16">
              <div className="flex gap-6 transition-transform duration-300" style={{
              transform: `translateX(-${currentTestimonial * 400}px)`
            }}>
                {testimonials.map((testimonial, index) => <Card key={index} className="flex-shrink-0 w-96">
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-primary mb-4" />
                      <p className="text-lg mb-6 italic">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full mr-4" onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const avatarDiv = target.nextElementSibling as HTMLElement;
                      if (avatarDiv) avatarDiv.style.display = 'block';
                    }} />
                        <div className="hidden">
                          <Avatar size={48} name={testimonial.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* FAQs */}
      {sectionVisibility.faq && <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about the event
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </div>
      </section>}

      {/* Contact */}
      {sectionVisibility.contact && <section id="contact" className="py-20 bg-gradient-to-r from-primary/10 to-primary/5 border-y-2 border-primary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Get In Touch</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">info@techsummit2024.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
            <Button size="lg">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>}

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {menuItems.map(item => <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
                {item.name}
              </button>)}
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 TechSummit. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Section Settings */}
      <SectionSettings sectionVisibility={sectionVisibility} onSectionToggle={handleSectionToggle} />
    </div>
  );
};
export default Landing;