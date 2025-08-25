import { Button } from "@/components/ui/button-enhanced";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Gamepad2, Brain, Puzzle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChildHome = () => {
  const navigate = useNavigate();

  // Mock data
  const childName = "Alex";
  const todayStars = 12;
  const totalStars = 247;
  const level = 5;

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="child" 
            size="child-icon"
            onClick={() => navigate('/')}
            aria-label="Go back home"
          >
            <ArrowLeft className="h-8 w-8" />
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Hi {childName}! 👋
            </h1>
            <p className="text-xl text-muted-foreground">Ready for some brain training?</p>
          </div>
          
          <div className="text-right">
            <Badge variant="secondary" className="text-lg px-4 py-2 mb-2">
              Level {level}
            </Badge>
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-success fill-success" />
              <span className="text-xl font-bold text-foreground">{totalStars}</span>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="mb-8 bg-gradient-success border-2 border-success/20 shadow-success">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-success-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-success-foreground mb-2">
              You earned {todayStars} stars today! 🌟
            </h3>
            <p className="text-success-foreground/90 text-lg">
              Great job! Keep up the amazing work!
            </p>
          </CardContent>
        </Card>

        {/* Exercise Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ExerciseCard
            title="Memory Games"
            description="Remember patterns and sequences"
            icon={Brain}
            color="primary"
            onClick={() => navigate('/child/exercises/memory')}
          />
          
          <ExerciseCard
            title="Shape Puzzles"
            description="Match shapes and colors"
            icon={Puzzle}
            color="secondary"
            onClick={() => navigate('/child/exercises/shapes')}
          />
          
          <ExerciseCard
            title="Fun Games"
            description="Play and learn together"
            icon={Gamepad2}
            color="success"
            onClick={() => navigate('/child/exercises/games')}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button 
            variant="child" 
            size="child"
            className="justify-center"
            onClick={() => navigate('/child/progress')}
          >
            <Trophy className="h-8 w-8" />
            See My Progress
          </Button>
          
          <Button 
            variant="child-secondary" 
            size="child"
            className="justify-center"
            onClick={() => navigate('/child/avatar')}
          >
            <Star className="h-8 w-8" />
            Change Avatar
          </Button>
        </div>
      </div>
    </div>
  );
};

const ExerciseCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  onClick 
}: {
  title: string;
  description: string;
  icon: any;
  color: "primary" | "secondary" | "success";
  onClick: () => void;
}) => {
  const getCardStyles = () => {
    switch (color) {
      case "primary":
        return "bg-gradient-primary border-2 border-primary/20 shadow-soft";
      case "secondary":
        return "bg-gradient-secondary border-2 border-secondary/20 shadow-warm";
      case "success":
        return "bg-gradient-success border-2 border-success/20 shadow-success";
    }
  };

  return (
    <Card 
      className={`cursor-pointer ${getCardStyles()} hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-bounce`}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center space-y-4">
        <Icon className="h-16 w-16 text-white mx-auto" />
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/90">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildHome;