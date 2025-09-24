import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
interface TicketType {
  id: string;
  name: string;
  type: string;
  date: string;
  location: string;
  holder: string;
  price: string;
  qrCode: string;
  color: string;
}
interface TicketsListProps {
  tickets: TicketType[];
}
export const TicketsList: React.FC<TicketsListProps> = ({
  tickets
}) => {
  return <Card className="border-slate-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center dark:text-white">
            
            Your Tickets
          </h3>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Your Tickets</DialogTitle>
                <DialogDescription>
                  All tickets purchased for AI Summit 2026
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {tickets.map(ticket => <div key={ticket.id} className="rounded-lg border border-gray-200 overflow-hidden dark:border-gray-700">
                    <div className={`${ticket.color} px-4 py-2 text-white flex justify-between items-center`}>
                      <span className="font-medium">{ticket.name}</span>
                      <Badge variant="secondary">{ticket.type}</Badge>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">ID: {ticket.id}</p>
                        <p className="text-xs text-gray-500">{ticket.date} • {ticket.location}</p>
                        <p className="text-xs text-gray-500">Ticket holder: {ticket.holder}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-white rounded p-2">
                          <img src={ticket.qrCode} alt="Ticket QR Code" className="h-20 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="overflow-hidden rounded-lg">
          {tickets.length > 0 && <div className={`${tickets[0].color} rounded-lg p-6 text-white relative overflow-hidden`}>
              <div className="flex justify-between">
                <div className="space-y-3 relative z-10">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                      {tickets[0].type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{tickets[0].name}</h3>
                  <div className="space-y-1">
                    <p className="text-sm font-medium opacity-90">
                      {tickets[0].date}
                    </p>
                    <p className="text-sm opacity-90">{tickets[0].location}</p>
                    <p className="text-xs opacity-80">{tickets[0].id}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg p-2 py-0 px-[24px]">
                  <img src={tickets[0].qrCode} alt="Ticket QR Code" className="h-24 w-24" />
                </div>
              </div>
              
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
              <div className="absolute left-10 bottom-10 w-16 h-16 bg-black/10 rounded-full blur-xl"></div>
            </div>}
          {tickets.length === 0 && <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <Ticket className="h-12 w-12 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium mb-1">No Tickets Found</h3>
              <p className="text-center text-gray-500 text-sm mb-4">
                You don't have any tickets for this event yet.
              </p>
              <Button>Purchase Tickets</Button>
            </div>}
        </div>
      </CardContent>
    </Card>;
};