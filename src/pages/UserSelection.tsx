import { UserTypeCard } from "@/components/UserTypeCard";
import { useNavigate } from "react-router-dom";
import { Smile, Heart, Stethoscope } from "lucide-react";

const UserSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Welcome to <span className="text-primary">CogniGrow</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Interactive cognitive retraining exercises designed to help children with intellectual 
            disabilities develop their cognitive skills through engaging, fun activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UserTypeCard
            title="I'm a Child"
            description="Start fun brain training games and exercises designed just for you!"
            icon={Smile}
            variant="child"
            onClick={() => navigate('/child')}
          />
          
          <UserTypeCard
            title="I'm a Caregiver"
            description="Track your child's progress and manage their cognitive training journey."
            icon={Heart}
            variant="caregiver"
            onClick={() => navigate('/caregiver')}
          />
          
          <UserTypeCard
            title="I'm a Therapist"
            description="Monitor multiple children, analyze progress, and customize treatment plans."
            icon={Stethoscope}
            variant="therapist"
            onClick={() => navigate('/therapist')}
          />
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Designed with accessibility and child-friendly interfaces in mind
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;