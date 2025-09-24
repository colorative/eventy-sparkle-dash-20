
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Link as LinkIcon, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

interface ContactInfoProps {
  email: string;
  phone: string;
  website: string;
  location: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  email,
  phone,
  website,
  location,
  socialLinks,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-500 mr-3" />
            <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
              {email}
            </a>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-500 mr-3" />
            <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
              {phone}
            </a>
          </div>
          
          <div className="flex items-center">
            <LinkIcon className="h-5 w-5 text-gray-500 mr-3" />
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Website
            </a>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-500 mr-3" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 my-4 pt-4">
          <h3 className="text-lg font-medium mb-3">Social Media</h3>
          <div className="flex flex-wrap gap-3">
            {socialLinks.linkedin && (
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-700" />
              </a>
            )}
            
            {socialLinks.twitter && (
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                title="Twitter"
              >
                <Twitter className="h-5 w-5 text-gray-700" />
              </a>
            )}
            
            {socialLinks.facebook && (
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                title="Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-700" />
              </a>
            )}
            
            {socialLinks.whatsapp && (
              <a 
                href={`https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                title="WhatsApp"
              >
                <Phone className="h-5 w-5 text-gray-700" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
