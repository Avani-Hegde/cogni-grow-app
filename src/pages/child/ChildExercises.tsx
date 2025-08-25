import { Button } from "@/components/ui/button-enhanced";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Puzzle, Gamepad2, Star, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ChildExercises = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const getExerciseData = () => {
    switch (type) {
      case 'memory':
        return {
          title: 'Memory Games 🧠',
          color: 'primary',
          exercises: [
            { id: 1, name: 'Pattern Memory', difficulty: 'Easy', stars: 3, completed: true },
            { id: 2, name: 'Color Sequence', difficulty: 'Easy', stars: 2, completed: true },
            { id: 3, name: 'Number Pairs', difficulty: 'Medium', stars: 0, completed: false },
            { id: 4, name: 'Story Memory', difficulty: 'Medium', stars: 0, completed: false },
          ]
        };
      case 'shapes':
        return {
          title: 'Shape Puzzles 🧩',
          color: 'secondary',
          exercises: [
            { id: 1, name: 'Shape Matching', difficulty: 'Easy', stars: 3, completed: true },
            { id: 2, name: 'Color Sorting', difficulty: 'Easy', stars: 3, completed: true },
            { id: 3, name: 'Pattern Builder', difficulty: 'Medium', stars: 1, completed: false },
            { id: 4, name: 'Puzzle Master', difficulty: 'Hard', stars: 0, completed: false },
          ]
        };
      case 'games':
        return {
          title: 'Fun Games 🎮',
          color: 'success',
          exercises: [
            { id: 1, name: 'Bubble Pop', difficulty: 'Easy', stars: 3, completed: true },
            { id: 2, name: 'Animal Sounds', difficulty: 'Easy', stars: 2, completed: true },
            { id: 3, name: 'Treasure Hunt', difficulty: 'Medium', stars: 0, completed: false },
            { id: 4, name: 'Magic Garden', difficulty: 'Medium', stars: 0, completed: false },
          ]
        };
      default:
        return {
          title: 'Exercises',
          color: 'primary',
          exercises: []
        };
    }
  };

  const exerciseData = getExerciseData();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-secondary text-secondary-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  const getCardGradient = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-gradient-primary';
      case 'secondary': return 'bg-gradient-secondary';
      case 'success': return 'bg-gradient-success';
      default: return 'bg-gradient-primary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="child" 
            size="child-icon"
            onClick={() => navigate('/child')}
            aria-label="Go back"
          >
            <ArrowLeft className="h-8 w-8" />
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {exerciseData.title}
            </h1>
            <p className="text-xl text-muted-foreground">Choose an exercise to start!</p>
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exerciseData.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              color={exerciseData.color}
              onClick={() => {
                // Navigate to actual exercise gameplay
                navigate(`/child/play/${type}/${exercise.id}`);
              }}
            />
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button 
            variant="child-secondary" 
            size="child"
            onClick={() => navigate('/child')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

const ExerciseCard = ({ 
  exercise, 
  color, 
  onClick 
}: {
  exercise: any;
  color: string;
  onClick: () => void;
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-secondary text-secondary-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  const getCardGradient = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-gradient-primary border-2 border-primary/20 shadow-soft';
      case 'secondary': return 'bg-gradient-secondary border-2 border-secondary/20 shadow-warm';
      case 'success': return 'bg-gradient-success border-2 border-success/20 shadow-success';
      default: return 'bg-gradient-primary border-2 border-primary/20 shadow-soft';
    }
  };

  return (
    <Card 
      className={`cursor-pointer ${getCardGradient(color)} hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-bounce`}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center space-y-4">
        <div className="flex justify-between items-start">
          <Badge className={getDifficultyColor(exercise.difficulty)}>
            {exercise.difficulty}
          </Badge>
          <div className="flex items-center gap-1">
            {exercise.completed && (
              <Trophy className="h-6 w-6 text-white" />
            )}
            <div className="flex">
              {[1, 2, 3].map((star) => (
                <Star 
                  key={star}
                  className={`h-5 w-5 ${
                    star <= exercise.stars 
                      ? 'text-white fill-white' 
                      : 'text-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{exercise.name}</h3>
          <p className="text-white/90 text-lg">
            {exercise.completed 
              ? `Completed! You earned ${exercise.stars} stars!` 
              : 'Ready to play?'
            }
          </p>
        </div>
        
        <Button 
          variant={exercise.completed ? "child-success" : "child"}
          size="child"
          className="w-full"
        >
          {exercise.completed ? 'Play Again!' : 'Start Exercise'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChildExercises;