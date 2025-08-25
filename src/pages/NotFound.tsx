import { Button } from "@/components/ui/button-enhanced";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🤔</div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Oops! Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you're looking for doesn't exist. Let's get you back to safety!
        </p>
        <Button 
          variant="portal" 
          size="xl"
          onClick={() => window.location.href = '/'}
          className="shadow-soft"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
