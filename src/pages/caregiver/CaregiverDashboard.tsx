import { Button } from "@/components/ui/button-enhanced";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Star, 
  Clock, 
  Target, 
  BarChart3, 
  Settings, 
  User, 
  ArrowLeft,
  Calendar,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaregiverDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const childName = "Alex";
  const weeklyProgress = 78;
  const todayMinutes = 25;
  const weeklyGoal = 150;
  const currentStreak = 5;
  const exercisesCompleted = 8;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="portal-outline" 
              size="default"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Caregiver Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's {childName}'s progress</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="portal-outline" onClick={() => navigate('/caregiver/settings')}>
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="portal" onClick={() => navigate('/caregiver/reports')}>
              <BarChart3 className="h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Today's Practice"
            value={`${todayMinutes} min`}
            icon={Clock}
            variant="primary"
          />
          
          <StatCard
            title="Weekly Progress"
            value={`${weeklyProgress}%`}
            icon={TrendingUp}
            variant="success"
          />
          
          <StatCard
            title="Current Streak"
            value={`${currentStreak} days`}
            icon={Target}
            variant="secondary"
          />
          
          <StatCard
            title="Exercises Done"
            value={`${exercisesCompleted}/10`}
            icon={Award}
            variant="primary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Weekly Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Practice Time</span>
                  <span className="text-sm text-muted-foreground">{todayMinutes}/{weeklyGoal} minutes</span>
                </div>
                <Progress value={(todayMinutes / weeklyGoal) * 100} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Exercise Completion</span>
                  <span className="text-sm text-muted-foreground">{exercisesCompleted}/10</span>
                </div>
                <Progress value={(exercisesCompleted / 10) * 100} className="h-3" />
              </div>
              
              <div className="grid grid-cols-7 gap-2 pt-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">{day}</div>
                    <div 
                      className={`h-8 rounded-lg flex items-center justify-center text-xs font-medium
                        ${index < currentStreak 
                          ? 'bg-success text-success-foreground' 
                          : index === currentStreak 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                        }`}
                    >
                      {index < currentStreak ? '✓' : index === currentStreak ? '○' : '-'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Child Profile & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {childName}'s Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Level</span>
                  <Badge variant="secondary">Level 5</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Stars</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-success fill-success" />
                    <span className="font-medium">247</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Favorite Exercise</span>
                  <span className="text-sm font-medium">Memory Games</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="portal" 
                  className="w-full justify-start"
                  onClick={() => navigate('/caregiver/assign-exercises')}
                >
                  <Target className="h-4 w-4" />
                  Assign New Exercises
                </Button>
                
                <Button 
                  variant="portal-outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/caregiver/progress')}
                >
                  <Calendar className="h-4 w-4" />
                  View Detailed Progress
                </Button>
                
                <Button 
                  variant="portal-outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/caregiver/child-settings')}
                >
                  <Settings className="h-4 w-4" />
                  Manage Child Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  variant 
}: {
  title: string;
  value: string;
  icon: any;
  variant: "primary" | "secondary" | "success";
}) => {
  const getCardStyles = () => {
    switch (variant) {
      case "primary":
        return "border-l-4 border-l-primary";
      case "secondary":
        return "border-l-4 border-l-secondary";
      case "success":
        return "border-l-4 border-l-success";
    }
  };

  return (
    <Card className={getCardStyles()}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CaregiverDashboard;