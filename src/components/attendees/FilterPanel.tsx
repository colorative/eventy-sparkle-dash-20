import React, { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onOpenChange }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([25, 55]);

  const interests = [
    "AI", "Machine Learning", "Cloud Computing", "Cybersecurity", "UX Design", 
    "Product Management", "Analytics", "Enterprise Software", "Sales Strategy", 
    "Partnership", "Data Analytics", "Entrepreneurship", "Venture Capital", 
    "Emerging Tech", "Digital Marketing", "Brand Strategy", "Cloud Architecture", 
    "DevOps", "User Experience", "Design Systems", "Blockchain", "IoT", 
    "Robotics", "AR/VR", "Fintech", "Healthtech", "Edtech", "SaaS"
  ];

  const locations = [
    "San Francisco, CA", "New York, NY", "Chicago, IL", "Austin, TX", 
    "Boston, MA", "Seattle, WA", "Los Angeles, CA", "Denver, CO", 
    "Atlanta, GA", "Miami, FL", "Dallas, TX", "Portland, OR",
    "London, UK", "Toronto, Canada", "Berlin, Germany", "Singapore"
  ];

  const companies = [
    "InnovateX", "TechSolutions", "Enterprise Systems", "DataInsights", 
    "StartupVision", "GlobalReach", "CloudTech", "DesignHub", "Microsoft", 
    "Google", "Amazon", "Apple", "Meta", "Salesforce", "Adobe", "Netflix"
  ];

  const countries = [
    "United States", "Canada", "United Kingdom", "Germany", "France", 
    "Netherlands", "Australia", "Singapore", "Japan", "South Korea", 
    "India", "Brazil", "Mexico", "Spain", "Italy", "Switzerland"
  ];

  const industries = [
    "Technology", "Software", "Healthcare", "Finance", "Education", 
    "Retail", "Manufacturing", "Consulting", "Media", "Telecommunications", 
    "Automotive", "Energy", "Real Estate", "Transportation", "Agriculture", 
    "Entertainment", "Government", "Non-profit"
  ];

  const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const handleCompanyToggle = (company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const handleCountryToggle = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const handleIndustryToggle = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  const handleGenderToggle = (gender: string) => {
    setSelectedGender(prev => 
      prev.includes(gender) 
        ? prev.filter(g => g !== gender)
        : [...prev, gender]
    );
  };

  const clearAllFilters = () => {
    setSelectedInterests([]);
    setSelectedLocations([]);
    setSelectedCompanies([]);
    setSelectedCountries([]);
    setSelectedIndustries([]);
    setSelectedGender([]);
    setAgeRange([25, 55]);
  };

  const getTotalFilters = () => {
    return selectedInterests.length + selectedLocations.length + selectedCompanies.length + 
           selectedCountries.length + selectedIndustries.length + selectedGender.length +
           (ageRange[0] !== 25 || ageRange[1] !== 55 ? 1 : 0);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
            {getTotalFilters() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getTotalFilters()}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-6">
            {/* Age Range */}
            <div>
              <Label className="text-base font-medium mb-3 block">Age Range</Label>
              <div className="px-2">
                <Slider
                  value={ageRange}
                  onValueChange={setAgeRange}
                  max={70}
                  min={18}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{ageRange[0]} years</span>
                  <span>{ageRange[1]} years</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Gender */}
            <div>
              <Label className="text-base font-medium mb-3 block">Gender</Label>
              <div className="space-y-2">
                {genders.map((gender) => (
                  <div key={gender} className="flex items-center space-x-2">
                    <Checkbox
                      id={`gender-${gender}`}
                      checked={selectedGender.includes(gender)}
                      onCheckedChange={() => handleGenderToggle(gender)}
                    />
                    <Label htmlFor={`gender-${gender}`} className="text-sm">
                      {gender}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Interests */}
            <div>
              <Label className="text-base font-medium mb-3 block">Interests</Label>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Countries */}
            <div>
              <Label className="text-base font-medium mb-3 block">Countries</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {countries.map((country) => (
                  <div key={country} className="flex items-center space-x-2">
                    <Checkbox
                      id={`country-${country}`}
                      checked={selectedCountries.includes(country)}
                      onCheckedChange={() => handleCountryToggle(country)}
                    />
                    <Label htmlFor={`country-${country}`} className="text-sm">
                      {country}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Locations */}
            <div>
              <Label className="text-base font-medium mb-3 block">Locations</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location}`}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => handleLocationToggle(location)}
                    />
                    <Label htmlFor={`location-${location}`} className="text-sm">
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Industries */}
            <div>
              <Label className="text-base font-medium mb-3 block">Industries</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {industries.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={`industry-${industry}`}
                      checked={selectedIndustries.includes(industry)}
                      onCheckedChange={() => handleIndustryToggle(industry)}
                    />
                    <Label htmlFor={`industry-${industry}`} className="text-sm">
                      {industry}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Companies */}
            <div>
              <Label className="text-base font-medium mb-3 block">Companies</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {companies.map((company) => (
                  <div key={company} className="flex items-center space-x-2">
                    <Checkbox
                      id={`company-${company}`}
                      checked={selectedCompanies.includes(company)}
                      onCheckedChange={() => handleCompanyToggle(company)}
                    />
                    <Label htmlFor={`company-${company}`} className="text-sm">
                      {company}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <Button variant="outline" onClick={clearAllFilters} className="flex-1">
            Clear All
          </Button>
          <Button onClick={() => onOpenChange(false)} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};