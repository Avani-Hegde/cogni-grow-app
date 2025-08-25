import { Button } from "@/components/ui/button-enhanced";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  ArrowLeft,
  UserCheck,
  Calendar,
  FileText,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TherapistDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const totalChildren = 12;
  const activeChildren = 10;
  const lowProgressAlerts = 3;
  const completedSessions = 45;

  const childrenData = [
    { name: "Alex", age: 8, progress: 85, status: "excellent", lastSession: "Today" },
    { name: "Emma", age: 7, progress: 45, status: "needs-attention", lastSession: "2 days ago" },
    { name: "Liam", age: 9, progress: 92, status: "excellent", lastSession: "Yesterday" },
    { name: "Sophia", age: 6, progress: 35, status: "needs-attention", lastSession: "3 days ago" },
    { name: "Noah", age: 8, progress: 78, status: "good", lastSession: "Today" },
  ];

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
              <h1 className="text-3xl font-bold text-foreground">Therapist Dashboard</h1>
              <p className="text-muted-foreground">Monitor and manage your patients' cognitive training</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="portal-outline" onClick={() => navigate('/therapist/settings')}>
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="portal" onClick={() => navigate('/therapist/analytics')}>
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Children"
            value={totalChildren.toString()}
            icon={Users}
            variant="primary"
          />
          
          <StatCard
            title="Active This Week"
            value={activeChildren.toString()}
            icon={UserCheck}
            variant="success"
          />
          
          <StatCard
            title="Need Attention"
            value={lowProgressAlerts.toString()}
            icon={AlertTriangle}
            variant="secondary"
          />
          
          <StatCard
            title="Sessions Completed"
            value={completedSessions.toString()}
            icon={Calendar}
            variant="primary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Children Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Children Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {childrenData.map((child) => (
                  <div 
                    key={child.name} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/therapist/child/${child.name.toLowerCase()}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">{child.name[0]}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{child.name}</h4>
                        <p className="text-sm text-muted-foreground">Age {child.age} • Last: {child.lastSession}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">{child.progress}%</div>
                        <Progress value={child.progress} className="w-20 h-2" />
                      </div>
                      <Badge 
                        variant={child.status === "excellent" ? "default" : child.status === "good" ? "secondary" : "destructive"}
                      >
                        {child.status === "excellent" ? "Excellent" : child.status === "good" ? "Good" : "Needs Attention"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Button 
                  variant="portal-outline" 
                  className="w-full"
                  onClick={() => navigate('/therapist/children')}
                >
                  View All Children
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-secondary">
                  <AlertTriangle className="h-5 w-5" />
                  Attention Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Emma (7y)</span>
                    <Badge variant="destructive" className="text-xs">Low Progress</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">No activity for 3 days</p>
                </div>
                
                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sophia (6y)</span>
                    <Badge variant="destructive" className="text-xs">Struggling</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Difficulty with memory tasks</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="portal" 
                  className="w-full justify-start"
                  onClick={() => navigate('/therapist/add-child')}
                >
                  <Users className="h-4 w-4" />
                  Add New Child
                </Button>
                
                <Button 
                  variant="portal-outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/therapist/analytics')}
                >
                  <BarChart3 className="h-4 w-4" />
                  View Analytics
                </Button>
                
                <Button 
                  variant="portal-outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/therapist/reports')}
                >
                  <FileText className="h-4 w-4" />
                  Generate Reports
                </Button>
                
                <Button 
                  variant="portal-outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/therapist/exercises')}
                >
                  <Star className="h-4 w-4" />
                  Exercise Library
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

export default TherapistDashboard;