
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { PipProvider } from "@/contexts/PipContext";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Exhibitors from "./pages/Exhibitors";
import ExhibitorProfile from "./pages/ExhibitorProfile";
import Sponsors from "./pages/Sponsors";
import Meetings from "./pages/Meetings";
import Calendar from "./pages/Calendar";
import NewMeeting from "./pages/NewMeeting";
import Interested from "./pages/Interested";
import Schedule from "./pages/Schedule";
import Agenda from "./pages/Agenda";
import Itinerary from "./pages/Itinerary";
import Connections from "./pages/Connections";
import Bookmarks from "./pages/Bookmarks";
import Attendees from "./pages/Attendees";
import AttendeeProfile from "./pages/AttendeeProfile";
import Speakers from "./pages/Speakers";
import FloorplansList from "./pages/FloorplansList";
import FloorplanDetail from "./pages/FloorplanDetail";
import GoogleMapDetail from "./pages/GoogleMapDetail";
import Leads from "./pages/Leads";
import LeadForm from "./pages/LeadForm";
import ActivateTeam from "./pages/ActivateTeam";
import CompanyProfile from "./pages/CompanyProfile";
import Contacts from "./pages/Contacts";
import Settings from "./pages/Settings";
import Export from "./pages/Export";
import Inbox from "./pages/Inbox";
import Notifications from "./pages/Notifications";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import MyProducts from "./pages/MyProducts";
import Notes from "./pages/Notes";
import NoteDetails from "./pages/NoteDetails";
import EventGuide from "./pages/EventGuide"; 
import Gallery from "./pages/Gallery";
import News from "./pages/News"; 
import NewsDetail from "./pages/NewsDetail"; 
import SocialFeed from "./pages/SocialFeed";
import SocialFeedDetail from "./pages/SocialFeedDetail";
import Login from "./pages/Login";
import Signout from "./pages/Signout";
import SessionDetails from "./pages/SessionDetails";
import Explore from "./pages/Explore";
import Support from "./pages/Support";
import Survey from "./pages/Survey";
import SurveyDetails from "./pages/SurveyDetails";
import Gamification from "./pages/Gamification";
import CommunityForum from "./pages/CommunityForum";
import ForumCategory from "./pages/ForumCategory";
import PostDetails from "./pages/PostDetails";
import MeetupDetails from "./pages/MeetupDetails";
import JobDetails from "./pages/JobDetails";
import IceBreakerDetails from "./pages/IceBreakerDetails";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PipProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/home" element={<Index />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/meetings/new" element={<NewMeeting />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/interested" element={<Interested />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/agenda/sessions/:sessionId" element={<SessionDetails />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/exhibitors" element={<Exhibitors />} />
            <Route path="/exhibitors/:id" element={<ExhibitorProfile />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/attendees" element={<Attendees />} />
            <Route path="/attendees/:id" element={<AttendeeProfile />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/community-forum" element={<CommunityForum />} />
            <Route path="/community-forum/:slug" element={<ForumCategory />} />
            <Route path="/community-forum/:slug/:postId" element={<PostDetails />} />
            <Route path="/community-forum/meetup/:id" element={<MeetupDetails />} />
            <Route path="/community-forum/job/:id" element={<JobDetails />} />
            <Route path="/community-forum/ice-breaker/:id" element={<IceBreakerDetails />} />
            <Route path="/social-feed" element={<SocialFeed />} />
            <Route path="/social-feed/:postId" element={<SocialFeedDetail />} />
            <Route path="/maps" element={<FloorplansList />} />
            <Route path="/maps/:id" element={<FloorplanDetail />} />
            <Route path="/maps/google/:id" element={<GoogleMapDetail />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/lead-form" element={<LeadForm />} />
            <Route path="/activate-team" element={<ActivateTeam />} />
            <Route path="/profile" element={<CompanyProfile />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/export" element={<Export />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} /> 
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/survey" element={<Survey />} /> 
            <Route path="/survey/:surveyId" element={<SurveyDetails />} />
            <Route path="/event-guide" element={<EventGuide />} /> 
            <Route path="/explore" element={<Explore />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:noteId" element={<NoteDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/support" element={<Support />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </PipProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
