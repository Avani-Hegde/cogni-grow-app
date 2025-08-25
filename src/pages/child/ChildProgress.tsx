import { Button } from "@/components/ui/button-enhanced";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star, Trophy, Target, Calendar, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChildProgress = () => {
  const navigate = useNavigate();

  // Mock data
  const totalStars = 247;
  const level = 5;
  const exercisesCompleted = 28;
  const currentStreak = 5;
  const nextLevelProgress = 73;

  const weeklyData = [
    { day: 'Mon', stars: 12, completed: true },
    { day: 'Tue', stars: 8, completed: true },
    { day: 'Wed', stars: 15, completed: true },
    { day: 'Thu', stars: 6, completed: true },
    { day: 'Fri', stars: 12, completed: true },
    { day: 'Sat', stars: 0, completed: false },
    { day: 'Sun', stars: 0, completed: false },
  ];

  const achievements = [
    { name: 'Memory Master', icon: '🧠', earned: true },
    { name: 'Shape Wizard', icon: '🧩', earned: true },
    { name: 'Speed Runner', icon: '⚡', earned: false },
    { name: 'Perfect Week', icon: '🏆', earned: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="child" 
            size="child-icon"
            onClick={() => navigate('/child')}
            aria-label="Go back home"
          >
            <ArrowLeft className="h-8 w-8" />
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Progress 📊
            </h1>
            <p className="text-xl text-muted-foreground">Look how amazing you're doing!</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Stars"
            value={totalStars.toString()}
            icon="⭐"
            color="primary"
          />
          
          <StatCard
            title="Current Level"
            value={level.toString()}
            icon="🏆"
            color="secondary"
          />
          
          <StatCard
            title="Exercises Done"
            value={exercisesCompleted.toString()}
            icon="✅"
            color="success"
          />
          
          <StatCard
            title="Day Streak"
            value={currentStreak.toString()}
            icon="🔥"
            color="primary"
          />
        </div>

        {/* Level Progress */}
        <Card className="mb-8 bg-gradient-primary border-2 border-primary/20 shadow-soft">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Level {level} Progress
            </h3>
            <div className="mb-4">
              <Progress 
                value={nextLevelProgress} 
                className="h-4 bg-white/20" 
              />
            </div>
            <p className="text-white/90 text-lg">
              {nextLevelProgress}% to Level {level + 1}! You're doing great! 🎉
            </p>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="h-6 w-6" />
              This Week's Stars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day) => (
                <div key={day.day} className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {day.day}
                  </div>
                  <div 
                    className={`h-16 rounded-lg flex flex-col items-center justify-center text-sm font-bold border-2 transition-all
                      ${day.completed 
                        ? 'bg-gradient-success border-success/20 text-white shadow-success' 
                        : 'bg-muted border-muted text-muted-foreground'
                      }`}
                  >
                    {day.completed ? (
                      <>
                        <Star className="h-4 w-4 fill-white mb-1" />
                        <span>{day.stars}</span>
                      </>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-lg text-muted-foreground">
                You earned <span className="font-bold text-success">{weeklyData.reduce((sum, day) => sum + day.stars, 0)} stars</span> this week! 🌟
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Award className="h-6 w-6" />
              My Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.name}
                  className={`p-4 rounded-lg border-2 text-center transition-all
                    ${achievement.earned 
                      ? 'bg-gradient-success border-success/20 shadow-success' 
                      : 'bg-muted border-muted opacity-50'
                    }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className={`font-semibold text-sm ${achievement.earned ? 'text-white' : 'text-muted-foreground'}`}>
                    {achievement.name}
                  </h4>
                  {achievement.earned && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Earned!
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Button 
            variant="child" 
            size="child"
            onClick={() => navigate('/child')}
          >
            <Trophy className="h-8 w-8" />
            Back to Games
          </Button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color 
}: {
  title: string;
  value: string;
  icon: string;
  color: "primary" | "secondary" | "success";
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
    <Card className={`${getCardStyles()} transform hover:scale-105 transition-all duration-300`}>
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <p className="text-white/90 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  );
};

export default ChildProgress;