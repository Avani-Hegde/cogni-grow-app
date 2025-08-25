import { Button } from "@/components/ui/button-enhanced";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface UserTypeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "child" | "caregiver" | "therapist";
}

export const UserTypeCard = ({ title, description, icon: Icon, onClick, variant = "caregiver" }: UserTypeCardProps) => {
  const getCardStyles = () => {
    switch (variant) {
      case "child":
        return "bg-gradient-primary border-2 border-primary/20 shadow-soft hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-bounce";
      case "caregiver":
        return "bg-gradient-secondary border-2 border-secondary/20 shadow-warm hover:shadow-lg transform hover:scale-105 transition-all duration-300";
      case "therapist":
        return "bg-gradient-success border-2 border-success/20 shadow-success hover:shadow-lg transform hover:scale-105 transition-all duration-300";
      default:
        return "hover:shadow-lg transform hover:scale-105 transition-all duration-300";
    }
  };

  const getButtonVariant = () => {
    switch (variant) {
      case "child":
        return "child" as const;
      case "caregiver":
        return "child-secondary" as const;
      case "therapist":
        return "child-success" as const;
      default:
        return "portal" as const;
    }
  };

  return (
    <Card className={`cursor-pointer ${getCardStyles()}`} onClick={onClick}>
      <CardContent className="p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-white/20 rounded-full">
            <Icon className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-white/90 text-lg leading-relaxed">{description}</p>
        </div>
        
        <Button 
          variant={getButtonVariant()}
          size={variant === "child" ? "child" : "xl"}
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};