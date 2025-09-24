
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ForumCategory } from "@/types/forum";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Building } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface JobBoardContentProps {
  category: ForumCategory;
}

// Mock job listings
const jobListings = [
  {
    id: 1,
    companyName: "TechInnovate",
    companyLogo: "",
    location: "San Francisco, CA (Remote Available)",
    jobTitle: "Senior UX Designer",
    shortDescription: "Join our product team to create intuitive user experiences for our flagship product. 5+ years of experience required.",
    fullDescription: "TechInnovate is seeking a Senior UX Designer to join our product team. The ideal candidate will have experience with user research, wireframing, prototyping, and collaborating with engineers to implement designs. This role requires 5+ years of experience in UX design, preferably in a product-led company.",
    postedAt: "2 days ago",
    postedBy: "John Smith",
    jobType: "Full-time",
    salary: "$120k - $150k"
  },
  {
    id: 2,
    companyName: "DataSphere",
    companyLogo: "",
    location: "Remote",
    jobTitle: "Frontend Developer",
    shortDescription: "Looking for a frontend developer with strong React skills to join our growing team. We're building the next generation of data visualization tools.",
    fullDescription: "DataSphere is hiring a Frontend Developer to help build our data visualization platform. You'll work with a team of engineers, designers, and product managers to create intuitive and powerful data visualization tools. The ideal candidate has experience with React, TypeScript, and D3.js.",
    postedAt: "1 week ago",
    postedBy: "Emily Wang",
    jobType: "Contract",
    salary: "$95k - $120k"
  },
  {
    id: 3,
    companyName: "CreativeMinds Agency",
    companyLogo: "",
    location: "New York, NY",
    jobTitle: "UI/UX Designer",
    shortDescription: "Exciting opportunity for a talented UI/UX designer to work with our award-winning design team on projects for Fortune 500 clients.",
    fullDescription: "CreativeMinds Agency is looking for a UI/UX Designer to join our team in New York. You'll work on projects for Fortune 500 clients, designing user interfaces and experiences for web and mobile applications. The ideal candidate has a strong portfolio demonstrating UI/UX skills, experience with design tools like Figma or Sketch, and the ability to communicate design decisions effectively.",
    postedAt: "3 days ago",
    postedBy: "Michael Johnson",
    jobType: "Full-time",
    salary: "$90k - $115k"
  },
  {
    id: 4,
    companyName: "HealthTech Solutions",
    companyLogo: "",
    location: "Boston, MA (Hybrid)",
    jobTitle: "Product Manager",
    shortDescription: "Lead product development for our healthcare platforms. Medical industry experience preferred but not required.",
    fullDescription: "HealthTech Solutions is seeking a Product Manager to lead the development of our healthcare platforms. You'll work with stakeholders to define product strategy, prioritize features, and ensure successful product delivery. The ideal candidate has experience in product management, preferably in the healthcare industry, and strong analytical and communication skills.",
    postedAt: "5 days ago", 
    postedBy: "Sarah Lee",
    jobType: "Full-time",
    salary: "$110k - $140k"
  }
];

export const JobBoardContent: React.FC<JobBoardContentProps> = ({ category }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [jobType, setJobType] = useState<"Full-time" | "Part-time">("Full-time");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const handlePostJob = (data: any) => {
    toast({
      title: "Job Posted",
      description: "Your job listing has been successfully posted"
    });
    setIsDialogOpen(false);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Job Listings</h2>
          <p className="text-muted-foreground">{jobListings.length} job posts</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>Post a Job</Button>
      </div>

      <div className="space-y-4">
        {jobListings.map((job) => (
          <Card 
            key={job.id} 
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/community-forum/job/${job.id}`)}
          >
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Building className="h-5 w-5 text-primary" /> 
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{job.companyName}</h3>
                      <span className="text-xs text-muted-foreground">{job.postedAt}</span>
                    </div>
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-2">{job.jobTitle}</h4>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{job.location}</span>
                </div>
                
                <p className="mb-4 line-clamp-2">{job.shortDescription}</p>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="bg-primary/5 text-primary">
                    {job.jobType}
                  </Badge>
                  <Badge variant="outline" className="bg-primary/5 text-primary">
                    {job.salary}
                  </Badge>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Post Job Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Post a Job</DialogTitle>
            <DialogDescription>
              Create a new job listing for the community
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(handlePostJob)} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title<span className="text-red-500">*</span></Label>
                <Input 
                  id="jobTitle" 
                  placeholder="Enter a job title" 
                  {...register("jobTitle", { required: true })}
                />
                {errors.jobTitle && <p className="text-sm text-red-500">Job title is required</p>}
              </div>
              
              <div className="space-y-2">
                <Label>Job Type<span className="text-red-500">*</span></Label>
                <Tabs defaultValue="Full-time" className="w-full" onValueChange={(val) => setJobType(val as "Full-time" | "Part-time")}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="Full-time">Full-time</TabsTrigger>
                    <TabsTrigger value="Part-time">Part-time</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Job Location<span className="text-red-500">*</span></Label>
                <Input 
                  id="location" 
                  placeholder="Enter a location" 
                  {...register("location", { required: true })}
                />
                {errors.location && <p className="text-sm text-red-500">Location is required</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Write a brief job description" 
                  className="min-h-[100px]"
                  {...register("description")}
                />
                <div className="text-xs text-muted-foreground">
                  1500 characters
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Linked Exhibitor / Sponsor<span className="text-red-500">*</span></Label>
                <Input 
                  id="company" 
                  placeholder="Search" 
                  {...register("company", { required: true })}
                />
                {errors.company && <p className="text-sm text-red-500">Company is required</p>}
              </div>
              
              <div className="space-y-2">
                <Label>When Apply <span className="text-red-500">*</span></Label>
                <Tabs defaultValue="leads" className="w-full">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="leads">Collect as Leads</TabsTrigger>
                    <TabsTrigger value="external">Open External URL</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="externalUrl">External URL<span className="text-red-500">*</span></Label>
                <Input 
                  id="externalUrl" 
                  placeholder="Enter external URL" 
                  {...register("externalUrl", { required: true })}
                />
                {errors.externalUrl && <p className="text-sm text-red-500">External URL is required</p>}
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
