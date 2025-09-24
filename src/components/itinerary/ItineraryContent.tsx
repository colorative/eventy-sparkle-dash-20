import React, { useRef } from "react";
import { ArrowLeft, Plane, Car, UtensilsCrossed, MapPin, Download, Hotel, Coffee, Calendar as CalendarIcon, UserCheck, Briefcase, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ItineraryEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  attachments?: {
    name: string;
    type: 'voucher' | 'ticket' | 'document';
  }[];
}

interface ItineraryDay {
  date: string;
  events: ItineraryEvent[];
}

const generateDynamicItinerary = (): ItineraryDay[] => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return [
    {
      date: formatDate(yesterday),
      events: [
        {
          id: "1",
          time: "10:30 AM",
          title: "Pick-up from Airport",
          description: "Welcome to San Francisco! Our team will greet you at the arrival terminal with a placard.",
          icon: Plane,
          attachments: []
        },
        {
          id: "2", 
          time: "11:45 AM",
          title: "Hotel Transfer & Check-in",
          description: "Comfortable ride to your hotel for check-in and refreshment.",
          icon: Hotel,
          attachments: [
            {
              name: "Hotel Room Voucher",
              type: "voucher"
            }
          ]
        },
        {
          id: "3",
          time: "1:00 PM", 
          title: "Welcome Lunch",
          description: "Join fellow attendees for a networking lunch at the hotel restaurant.",
          icon: UtensilsCrossed,
          attachments: [
            {
              name: "Food Voucher",
              type: "voucher"
            }
          ]
        },
        {
          id: "4",
          time: "3:30 PM",
          title: "Event Venue Transfer", 
          description: "Shuttle service to the main conference venue for registration and networking.",
          icon: Car,
          attachments: []
        },
        {
          id: "5",
          time: "4:00 PM",
          title: "Registration & Badge Collection", 
          description: "Check-in at the venue and collect your conference materials.",
          icon: UserCheck,
          attachments: [
            {
              name: "Conference Pass",
              type: "ticket"
            }
          ]
        }
      ]
    },
    {
      date: formatDate(today),
      events: [
        {
          id: "6",
          time: "8:00 AM",
          title: "Breakfast & Networking",
          description: "Start your day with breakfast and connect with other attendees.",
          icon: Coffee,
          attachments: []
        },
        {
          id: "7",
          time: "9:30 AM",
          title: "Opening Keynote",
          description: "Welcome address and opening keynote presentation in the main auditorium.",
          icon: Briefcase,
          attachments: []
        },
        {
          id: "8",
          time: "11:00 AM",
          title: "Tech Innovation Session",
          description: "Deep dive into the latest technology trends and innovations shaping the industry.",
          icon: CalendarIcon,
          attachments: [
            {
              name: "Session Materials",
              type: "document"
            }
          ]
        },
        {
          id: "9",
          time: "12:30 PM",
          title: "Networking Lunch",
          description: "Lunch break with dedicated networking zones and industry roundtables.",
          icon: UtensilsCrossed,
          attachments: []
        },
        {
          id: "10",
          time: "7:00 PM",
          title: "Evening Gala Dinner",
          description: "Formal dinner with entertainment and awards ceremony.",
          icon: Music,
          attachments: [
            {
              name: "Dinner Ticket",
              type: "ticket"
            }
          ]
        }
      ]
    },
    {
      date: formatDate(tomorrow),
      events: [
        {
          id: "11",
          time: "9:00 AM",
          title: "Breakfast Session",
          description: "Light breakfast with morning briefing and day's agenda overview.",
          icon: Coffee,
          attachments: []
        },
        {
          id: "12",
          time: "10:30 AM",
          title: "Panel Discussion",
          description: "Industry leaders discuss future trends and market insights.",
          icon: Briefcase,
          attachments: []
        },
        {
          id: "13",
          time: "2:00 PM",
          title: "Closing Ceremony",
          description: "Final presentations and closing remarks from the organizing committee.",
          icon: CalendarIcon,
          attachments: []
        },
        {
          id: "14",
          time: "4:00 PM",
          title: "Airport Transfer",
          description: "Departure shuttle service to the airport for your return journey.",
          icon: Plane,
          attachments: []
        }
      ]
    },
    {
      date: formatDate(dayAfterTomorrow),
      events: [
        {
          id: "15",
          time: "10:00 AM",
          title: "Follow-up Meeting",
          description: "Optional follow-up session for interested participants.",
          icon: Briefcase,
          attachments: []
        }
      ]
    }
  ];
};

const getTodayDateString = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return today.toLocaleDateString('en-US', options);
};

export const ItineraryContent = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const todayString = getTodayDateString();
  const itinerary = generateDynamicItinerary(); // Fixed: using dynamic itinerary instead of static sampleItinerary

  const scrollToToday = () => {
    const todayElement = document.getElementById('today-section');
    if (todayElement) {
      todayElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const exportToPDF = async () => {
    if (!printRef.current) return;
    
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Standard printer margins (20mm all around)
      const margin = 20;
      const imgWidth = 210 - (margin * 2); // A4 width minus margins
      const pageHeight = 297 - (margin * 2); // A4 height minus margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Add first page with proper margins
      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add subsequent pages with consistent margins
      while (heightLeft >= 0) {
        pdf.addPage();
        const yPosition = margin - (imgHeight - heightLeft);
        pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('my-itinerary.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const isToday = (dateString: string) => {
    return dateString === todayString;
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">My Itinerary</h1>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={scrollToToday}>
                Today
              </Button>
              <Button onClick={exportToPDF} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div ref={printRef} className="space-y-8">
          <style dangerouslySetInnerHTML={{
            __html: `
              @page {
                margin: 30mm 20mm;
              }
              .no-break {
                break-inside: avoid;
                page-break-inside: avoid;
              }
              .day-section {
                break-inside: avoid;
                page-break-inside: avoid;
              }
            `
          }} />
          {itinerary.map((day, dayIndex) => (
            <div 
              key={dayIndex} 
              id={isToday(day.date) ? 'today-section' : undefined}
              className="space-y-4 day-section"
            >
              {/* Date Header */}
              <div className="flex justify-center">
                <Badge 
                  variant={isToday(day.date) ? "default" : "secondary"} 
                  className={`px-4 py-2 text-sm font-medium rounded-full ${
                    isToday(day.date) ? 'bg-primary text-primary-foreground shadow-lg' : ''
                  }`}
                >
                  {day.date}
                  {isToday(day.date) && <span className="ml-2">• Today</span>}
                </Badge>
              </div>

              {/* Events */}
              <div className="space-y-4">
                {day.events.map((event, eventIndex) => (
                  <div key={event.id} className="relative">
                    <div className="flex items-start gap-6">
                      {/* Timeline Left Column - Time and Icon */}
                      <div className="flex flex-col items-center gap-2 relative">
                        {/* Time */}
                        <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                          {event.time}
                        </div>
                        
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm relative z-10">
                          <event.icon className="h-5 w-5 text-primary-foreground" />
                        </div>
                        
                        {/* Vertical Line - extends from after current circle to before next circle */}
                        {eventIndex < day.events.length - 1 && (
                          <div className="absolute top-12 left-1/2 w-px h-20 bg-border transform -translate-x-1/2" />
                        )}
                      </div>

                      {/* Event Card Right Column */}
                      <div className="flex-1 pb-6">
                        <Card className={`no-break transition-all duration-200 hover:shadow-md ${
                          isToday(day.date) 
                            ? 'border-primary/30 bg-primary/5 shadow-sm' 
                            : 'border-border/50'
                        }`}>
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <h3 className="text-base font-semibold text-foreground mb-1">
                                    {event.title}
                                  </h3>
                                  <div className="text-sm text-primary font-medium mb-2">
                                    {event.time}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-sm text-muted-foreground leading-relaxed">
                                {event.description}
                              </div>

                              {/* Attachments */}
                              {event.attachments && event.attachments.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                  {event.attachments.map((attachment, index) => (
                                    <Button 
                                      key={index}
                                      variant="outline" 
                                      size="sm"
                                      className="h-7 text-xs hover:bg-accent"
                                    >
                                      <Download className="h-3 w-3 mr-1" />
                                      {attachment.name}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add spacing between days except last */}
              {dayIndex < itinerary.length - 1 && (
                <div className="h-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};