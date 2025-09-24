import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FilterPanelProps {
  activeTab: string;
  onClose?: () => void;
  isOpen?: boolean;
  defaultExpanded?: boolean;
}

export const FilterPanel = ({ 
  activeTab, 
  onClose, 
  isOpen, 
  defaultExpanded = false 
}: FilterPanelProps) => {
  const defaultAccordionValue = defaultExpanded ? ['sort', 'categories', 'countries', 'industries', 'interests', 'productType', 'businessType'] : undefined;

  const renderFilters = () => {
    switch (activeTab) {
      case "attendees":
        return (
          <div className="space-y-4">
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-4">
              <AccordionItem value="location" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Location
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start">
                      <Checkbox id="location-1" className="mr-2 mt-1" />
                      <Label htmlFor="location-1" className="text-sm">
                        San Francisco, CA
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="location-2" className="mr-2 mt-1" />
                      <Label htmlFor="location-2" className="text-sm">
                        New York, NY
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="location-3" className="mr-2 mt-1" />
                      <Label htmlFor="location-3" className="text-sm">
                        Austin, TX
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="location-4" className="mr-2 mt-1" />
                      <Label htmlFor="location-4" className="text-sm">
                        Seattle, WA
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="location-5" className="mr-2 mt-1" />
                      <Label htmlFor="location-5" className="text-sm">
                        Chicago, IL
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="role" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Role
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start">
                      <Checkbox id="role-1" className="mr-2 mt-1" />
                      <Label htmlFor="role-1" className="text-sm">
                        C-Suite
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="role-2" className="mr-2 mt-1" />
                      <Label htmlFor="role-2" className="text-sm">
                        VP / Director
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="role-3" className="mr-2 mt-1" />
                      <Label htmlFor="role-3" className="text-sm">
                        Manager
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="role-4" className="mr-2 mt-1" />
                      <Label htmlFor="role-4" className="text-sm">
                        Individual Contributor
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="company" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Company Size
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start">
                      <Checkbox id="company-1" className="mr-2 mt-1" />
                      <Label htmlFor="company-1" className="text-sm">
                        Enterprise (1000+)
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="company-2" className="mr-2 mt-1" />
                      <Label htmlFor="company-2" className="text-sm">
                        Mid-Market (100-999)
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="company-3" className="mr-2 mt-1" />
                      <Label htmlFor="company-3" className="text-sm">
                        SMB (1-99)
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="interests" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Interests
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start">
                      <Checkbox id="interests-1" className="mr-2 mt-1" />
                      <Label htmlFor="interests-1" className="text-sm">
                        AI
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="interests-2" className="mr-2 mt-1" />
                      <Label htmlFor="interests-2" className="text-sm">
                        Cloud Computing
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="interests-3" className="mr-2 mt-1" />
                      <Label htmlFor="interests-3" className="text-sm">
                        Cybersecurity
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="interests-4" className="mr-2 mt-1" />
                      <Label htmlFor="interests-4" className="text-sm">
                        Data Analytics
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="interests-5" className="mr-2 mt-1" />
                      <Label htmlFor="interests-5" className="text-sm">
                        Machine Learning
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      
      case "products":
        return (
          <div className="space-y-4">
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-4">
              <AccordionItem value="category" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Category
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start">
                      <Checkbox id="category-1" className="mr-2 mt-1" />
                      <Label htmlFor="category-1" className="text-sm">
                        Software
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="category-2" className="mr-2 mt-1" />
                      <Label htmlFor="category-2" className="text-sm">
                        AI
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="category-3" className="mr-2 mt-1" />
                      <Label htmlFor="category-3" className="text-sm">
                        Fintech
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="category-4" className="mr-2 mt-1" />
                      <Label htmlFor="category-4" className="text-sm">
                        Design
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="category-5" className="mr-2 mt-1" />
                      <Label htmlFor="category-5" className="text-sm">
                        Security
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Price Range
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start">
                      <Checkbox id="price-1" className="mr-2 mt-1" />
                      <Label htmlFor="price-1" className="text-sm">
                        Under $100
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="price-2" className="mr-2 mt-1" />
                      <Label htmlFor="price-2" className="text-sm">
                        $100 - $499
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="price-3" className="mr-2 mt-1" />
                      <Label htmlFor="price-3" className="text-sm">
                        $500 - $999
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="price-4" className="mr-2 mt-1" />
                      <Label htmlFor="price-4" className="text-sm">
                        $1,000 - $4,999
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="price-5" className="mr-2 mt-1" />
                      <Label htmlFor="price-5" className="text-sm">
                        $5,000+
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="billing" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Billing Type
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <RadioGroup defaultValue="all">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="billing-1" />
                        <Label htmlFor="billing-1">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="subscription" id="billing-2" />
                        <Label htmlFor="billing-2">Subscription</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-time" id="billing-3" />
                        <Label htmlFor="billing-3">One-time</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tags" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Product Tags
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start">
                      <Checkbox id="tag-1" className="mr-2 mt-1" />
                      <Label htmlFor="tag-1" className="text-sm">
                        Analytics
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="tag-2" className="mr-2 mt-1" />
                      <Label htmlFor="tag-2" className="text-sm">
                        Dashboard
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="tag-3" className="mr-2 mt-1" />
                      <Label htmlFor="tag-3" className="text-sm">
                        Cloud
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="tag-4" className="mr-2 mt-1" />
                      <Label htmlFor="tag-4" className="text-sm">
                        Security
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="tag-5" className="mr-2 mt-1" />
                      <Label htmlFor="tag-5" className="text-sm">
                        Productivity
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      
      case "services":
        return (
          <div className="space-y-4">
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-4">
              <AccordionItem value="category" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Category
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start">
                      <Checkbox id="service-category-1" className="mr-2 mt-1" />
                      <Label htmlFor="service-category-1" className="text-sm">
                        Web Development
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-category-2" className="mr-2 mt-1" />
                      <Label htmlFor="service-category-2" className="text-sm">
                        Mobile Development
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-category-3" className="mr-2 mt-1" />
                      <Label htmlFor="service-category-3" className="text-sm">
                        AI Development
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-category-4" className="mr-2 mt-1" />
                      <Label htmlFor="service-category-4" className="text-sm">
                        Cloud Services
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-category-5" className="mr-2 mt-1" />
                      <Label htmlFor="service-category-5" className="text-sm">
                        SEO
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Price Range
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start">
                      <Checkbox id="service-price-1" className="mr-2 mt-1" />
                      <Label htmlFor="service-price-1" className="text-sm">
                        Under $1,000
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-price-2" className="mr-2 mt-1" />
                      <Label htmlFor="service-price-2" className="text-sm">
                        $1,000 - $2,000
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-price-3" className="mr-2 mt-1" />
                      <Label htmlFor="service-price-3" className="text-sm">
                        $2,000 - $5,000
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-price-4" className="mr-2 mt-1" />
                      <Label htmlFor="service-price-4" className="text-sm">
                        $5,000+
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="availability" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Availability
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <RadioGroup defaultValue="all">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="availability-1" />
                        <Label htmlFor="availability-1">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="available" id="availability-2" />
                        <Label htmlFor="availability-2">Available</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="limited" id="availability-3" />
                        <Label htmlFor="availability-3">Limited</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="service-tags" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Service Tags
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start">
                      <Checkbox id="service-tag-1" className="mr-2 mt-1" />
                      <Label htmlFor="service-tag-1" className="text-sm">
                        Development
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-tag-2" className="mr-2 mt-1" />
                      <Label htmlFor="service-tag-2" className="text-sm">
                        Custom
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-tag-3" className="mr-2 mt-1" />
                      <Label htmlFor="service-tag-3" className="text-sm">
                        Analysis
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-tag-4" className="mr-2 mt-1" />
                      <Label htmlFor="service-tag-4" className="text-sm">
                        Security
                      </Label>
                    </div>
                    <div className="flex items-start">
                      <Checkbox id="service-tag-5" className="mr-2 mt-1" />
                      <Label htmlFor="service-tag-5" className="text-sm">
                        Cloud
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      
      case "exhibitors":
        return (
          <div className="space-y-4">
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-4">
              <AccordionItem value="sort" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Sort By
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    <RadioGroup defaultValue="az">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="az" id="sort-1" />
                        <Label htmlFor="sort-1">A-Z</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="booth" id="sort-2" />
                        <Label htmlFor="sort-2">Booth Number</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="categories" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Categories
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    {["Software", "Hardware", "Services", "Consulting", "Education"].map((category, index) => (
                      <div key={category} className="flex items-start">
                        <Checkbox id={`category-${index}`} className="mr-2 mt-1" />
                        <Label htmlFor={`category-${index}`} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="countries" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Operating Countries
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    {["United States", "United Kingdom", "Canada", "Australia", "Germany"].map((country, index) => (
                      <div key={country} className="flex items-start">
                        <Checkbox id={`country-${index}`} className="mr-2 mt-1" />
                        <Label htmlFor={`country-${index}`} className="text-sm">
                          {country}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="industries" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Industries
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    {["Technology", "Healthcare", "Finance", "Manufacturing", "Retail"].map((industry, index) => (
                      <div key={industry} className="flex items-start">
                        <Checkbox id={`industry-${index}`} className="mr-2 mt-1" />
                        <Label htmlFor={`industry-${index}`} className="text-sm">
                          {industry}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="interests" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Interests
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    {["AI/ML", "Cloud Computing", "Cybersecurity", "IoT", "Blockchain"].map((interest, index) => (
                      <div key={interest} className="flex items-start">
                        <Checkbox id={`interest-${index}`} className="mr-2 mt-1" />
                        <Label htmlFor={`interest-${index}`} className="text-sm">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="productType" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Product Type
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    {["SaaS", "Hardware", "Services", "Consulting", "Training"].map((type, index) => (
                      <div key={type} className="flex items-start">
                        <Checkbox id={`product-type-${index}`} className="mr-2 mt-1" />
                        <Label htmlFor={`product-type-${index}`} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="businessType" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800">
                  Business Type
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 pt-1">
                    {["B2B", "B2C", "Enterprise", "Startup", "SMB"].map((type, index) => (
                      <div key={type} className="flex items-start">
                        <Checkbox id={`business-type-${index}`} className="mr-2 mt-1" />
                        <Label htmlFor={`business-type-${index}`} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      
      default:
        return null;
    }
  };

  const content = (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Filters</h3>
        </div>
        {renderFilters()}
      </CardContent>
    </Card>
  );

  if (isOpen !== undefined) {
    return isOpen ? content : null;
  }

  return content;
};
