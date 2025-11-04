
import React, { useState } from "react";
import { X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import gamificationIcon from "@/assets/gamification-icon.png";

const Banner = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showRulesModal, setShowRulesModal] = useState(false);
  
  if (!showBanner) return null;
  
  return (
    <>
      <div className="relative overflow-hidden rounded-lg mb-4 bg-blue-600">
        <div className="flex items-center h-[110px]">
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1 text-white">Event Gamification</h2>
                <p className="text-white">Complete challenges, earn points, and win prizes!</p>
              </div>
              <Button 
                variant="outline" 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
                onClick={() => setShowRulesModal(true)}
              >
                <Info className="mr-2 h-4 w-4" />
                Gamification Rules
              </Button>
            </div>
          </div>
        <img 
          src="https://futureconnectdemo.eventify.io/p/1c63b91ed3d7f79a053ffd8bb8efa1e6.png" 
          alt="Gamification" 
          className="h-[110px] object-contain pr-10" 
        />
      </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-2 right-2 text-white hover:bg-blue-700"
          onClick={() => setShowBanner(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <Dialog open={showRulesModal} onOpenChange={setShowRulesModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setShowRulesModal(false)}
            className="absolute right-4 top-4 rounded-sm text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <div className="bg-blue-600 -m-6 mb-4 rounded-t-lg">
            <div className="flex items-center justify-between h-[70px] px-6">
              <h2 className="text-xl font-bold text-white">Gamification Rules</h2>
              <img 
                src={gamificationIcon} 
                alt="Gamification" 
                className="h-[50px] object-contain mr-4"
              />
            </div>
          </div>
          
          <DialogDescription className="px-6">
            Follow these rules to maximize your points and climb the leaderboard!
          </DialogDescription>
          <div className="space-y-4 py-4 px-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">How to Earn Points</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Complete your profile to earn <strong>50 points</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Attend sessions and check-in to earn <strong>10 points per session</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Network with other attendees - each connection earns <strong>5 points</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Visit exhibitor booths and scan QR codes for <strong>15 points each</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Participate in polls and surveys to earn <strong>20 points</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Share event content on social media for <strong>25 points per share</strong></span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Challenge Rules</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Complete daily challenges to earn bonus points and badges</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Special challenges unlock exclusive rewards and prizes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Points are updated in real-time on the leaderboard</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Top 10 participants at the end of the event win prizes</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Fair Play Policy</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>All activities must be genuine - fraudulent activities will result in disqualification</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Event organizers reserve the right to verify any activity</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Have fun and engage authentically with the event community!</span>
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter className="px-6 pb-6">
            <Button 
              variant="blue" 
              onClick={() => setShowRulesModal(false)}
              className="w-full sm:w-auto"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Banner;
