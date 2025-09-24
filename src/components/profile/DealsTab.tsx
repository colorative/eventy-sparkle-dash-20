
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Copy, CopyCheck, Plus, Tag, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export const DealsTab = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      title: "Early Bird Discount",
      description: "Get 20% off on all our premium products when purchased before the event ends.",
      code: "EARLYBIRD20",
      expiryDate: "2025-06-30",
      discount: "20%",
      category: "Discount",
      isCopied: false
    },
    {
      id: 2,
      title: "Event Special Voucher",
      description: "Free consultation session with our experts. Limited time offer for event attendees only.",
      code: "CONSULT2025",
      expiryDate: "2025-07-15",
      discount: "Free",
      category: "Voucher",
      isCopied: false
    },
    {
      id: 3,
      title: "Bulk Purchase Deal",
      description: "Buy 3 or more licenses and get an additional license free of charge.",
      code: "BUY3GET1",
      expiryDate: "2025-08-31",
      discount: "25%+",
      category: "Bundle",
      isCopied: false
    }
  ]);

  const handleCopyCode = (id) => {
    const coupon = coupons.find(c => c.id === id);
    if (coupon) {
      navigator.clipboard.writeText(coupon.code);
      
      // Update state to show copied state
      setCoupons(coupons.map(c => 
        c.id === id ? { ...c, isCopied: true } : c
      ));
      
      toast({
        title: "Coupon code copied",
        description: `${coupon.code} has been copied to your clipboard`,
      });
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCoupons(coupons.map(c => 
          c.id === id ? { ...c, isCopied: false } : c
        ));
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Coupons & Special Deals</h2>
        <Button className="gap-2" onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4" />
          <span>Add New Deal</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map((coupon) => (
          <Card key={coupon.id} className="overflow-hidden border-slate-200">
            <CardContent className="p-0">
              <div className={`p-4 ${
                coupon.category === "Discount" ? "bg-blue-50" : 
                coupon.category === "Voucher" ? "bg-green-50" : 
                "bg-purple-50"
              }`}>
                <div className="flex justify-between items-start">
                  <Badge className={`
                    ${coupon.category === "Discount" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                      coupon.category === "Voucher" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                      "bg-purple-100 text-purple-800 hover:bg-purple-200"}
                  `}>
                    {coupon.category}
                  </Badge>
                  <Badge variant="outline" className="bg-white">
                    {coupon.discount} Off
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mt-3">{coupon.title}</h3>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">{coupon.description}</p>
                
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  <span>Valid until {new Date(coupon.expiryDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input 
                      value={coupon.code} 
                      readOnly 
                      className="bg-gray-50 font-mono text-center"
                    />
                  </div>
                  <Button 
                    variant={coupon.isCopied ? "default" : "outline"} 
                    size="sm" 
                    className="gap-1.5"
                    onClick={() => handleCopyCode(coupon.id)}
                  >
                    {coupon.isCopied ? (
                      <>
                        <CopyCheck className="h-4 w-4" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="overflow-hidden border-dashed border-2 border-slate-200 bg-slate-50/50">
          <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => setShowAddDialog(true)}>
            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <Tag className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-600">Add New Coupon</p>
            <p className="text-xs text-slate-400 mt-1">Create discounts or special offers for attendees</p>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Deal</DialogTitle>
            <DialogDescription>
              Create a new coupon or special offer for event attendees.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                placeholder="Coupon title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="code" className="text-right text-sm font-medium">
                Code
              </label>
              <Input
                id="code"
                placeholder="COUPON123"
                className="col-span-3 font-mono"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="discount" className="text-right text-sm font-medium">
                Discount
              </label>
              <Input
                id="discount"
                placeholder="20% or Free"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Deal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
