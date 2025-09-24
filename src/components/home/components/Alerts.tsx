
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRightCircle, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AlertsProps {
  showTeamAlert: boolean;
  showProfileAlert: boolean;
  onHideTeamAlert: () => void;
  onHideProfileAlert: () => void;
}

export const Alerts: React.FC<AlertsProps> = ({
  showTeamAlert,
  showProfileAlert,
  onHideTeamAlert,
  onHideProfileAlert,
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {showTeamAlert && (
        <Card className="border-blue-100 dark:border-blue-200 border flex w-full items-center gap-3 pl-3 pr-2 rounded-lg border-solid max-md:max-w-full transition-colors py-0 bg-blue-50">
          <div className="self-stretch flex min-w-60 gap-2 items-center flex-1 shrink basis-8 my-auto max-md:max-w-full">
            <AlertCircle className="h-[18px] w-[18px] text-blue-500 dark:text-blue-400" />
            <div className="min-w-60 text-sm text-slate-950 dark:text-slate-100 font-medium tracking-[-0.08px] leading-none flex-1 shrink basis-[0%] max-md:max-w-full">
              Activate Your Team Now
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate('/activate-team')}
              className="self-stretch flex min-h-8 items-center gap-2 text-sm font-medium whitespace-nowrap tracking-[-0.08px] leading-none justify-center my-auto px-3 rounded-md bg-transparent text-blue-700 py-0"
            >
              <span className="self-stretch my-auto">Activate</span>
              <ArrowRightCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={onHideTeamAlert}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {showProfileAlert && (
        <Card className="border-blue-100 dark:border-blue-200 border flex w-full items-center gap-3 pl-3 pr-2 rounded-lg border-solid max-md:max-w-full transition-colors py-0 bg-blue-50">
          <div className="self-stretch flex min-w-60 gap-2 items-center flex-1 shrink basis-8 my-auto max-md:max-w-full">
            <User className="h-[18px] w-[18px] text-blue-500 dark:text-blue-400" />
            <div className="min-w-60 text-sm text-slate-950 dark:text-slate-100 font-medium tracking-[-0.08px] leading-none flex-1 shrink basis-[0%] max-md:max-w-full">
              Complete Your Profile
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate('/profile')}
              className="self-stretch flex min-h-8 items-center gap-2 whitespace-nowrap tracking-[-0.08px] leading-none justify-center my-auto px-3 rounded-md py-0 text-sm bg-transparent text-blue-700 font-medium"
            >
              <span className="self-stretch my-auto">Complete</span>
              <ArrowRightCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={onHideProfileAlert}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
