import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button-enhanced";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Trophy, RotateCcw, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Shape {
  id: number;
  type: 'circle' | 'square' | 'triangle' | 'star';
  color: 'red' | 'blue' | 'green' | 'yellow';
  matched: boolean;
}

const ShapeGame = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<'playing' | 'won'>('playing');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [targetShape, setTargetShape] = useState<Omit<Shape, 'id' | 'matched'> | null>(null);
  const [matchesFound, setMatchesFound] = useState(0);

  const getGameData = () => {
    switch (id) {
      case '1': return { name: 'Shape Matching', description: 'Find matching shapes!' };
      case '2': return { name: 'Color Sorting', description: 'Sort by color!' };
      case '3': return { name: 'Pattern Builder', description: 'Build the pattern!' };
      case '4': return { name: 'Puzzle Master', description: 'Complete the puzzle!' };
      default: return { name: 'Shape Game', description: 'Match the shapes!' };
    }
  };

  const gameData = getGameData();

  const shapeSymbols = {
    circle: '●',
    square: '■',
    triangle: '▲',
    star: '★'
  };

  const colorStyles = {
    red: 'text-red-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    yellow: 'text-yellow-500'
  };

  const generateShapes = () => {
    const shapeTypes: Array<'circle' | 'square' | 'triangle' | 'star'> = ['circle', 'square', 'triangle', 'star'];
    const colors: Array<'red' | 'blue' | 'green' | 'yellow'> = ['red', 'blue', 'green', 'yellow'];
    
    const newShapes: Shape[] = [];
    const gridSize = Math.min(level + 3, 6); // Progressive difficulty
    
    // Generate target shape
    const targetType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const targetColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetShape({ type: targetType, color: targetColor });
    
    // Add 2-3 matching shapes
    const matchingShapes = Math.min(level + 1, 3);
    for (let i = 0; i < matchingShapes; i++) {
      newShapes.push({
        id: i,
        type: targetType,
        color: targetColor,
        matched: false
      });
    }
    
    // Fill rest with random shapes
    while (newShapes.length < gridSize * 2) {
      const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Avoid creating accidental matches
      if (randomType !== targetType || randomColor !== targetColor) {
        newShapes.push({
          id: newShapes.length,
          type: randomType,
          color: randomColor,
          matched: false
        });
      }
    }
    
    // Shuffle the array
    for (let i = newShapes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newShapes[i], newShapes[j]] = [newShapes[j], newShapes[i]];
    }
    
    setShapes(newShapes);
    setMatchesFound(0);
  };

  const handleShapeClick = (clickedShape: Shape) => {
    if (gameState !== 'playing' || clickedShape.matched) return;
    
    if (!targetShape) return;

    if (clickedShape.type === targetShape.type && clickedShape.color === targetShape.color) {
      // Correct match!
      const updatedShapes = shapes.map(shape => 
        shape.id === clickedShape.id ? { ...shape, matched: true } : shape
      );
      setShapes(updatedShapes);
      setMatchesFound(prev => prev + 1);
      
      const newScore = score + 10;
      setScore(newScore);
      
      toast({
        title: "Great match! 🎉",
        description: "+10 points!",
      });

      // Check if all matches found
      const totalMatches = shapes.filter(s => s.type === targetShape.type && s.color === targetShape.color).length;
      if (matchesFound + 1 >= totalMatches) {
        setTimeout(() => {
          setLevel(prev => prev + 1);
          generateShapes();
          toast({
            title: "Level Complete! ⭐",
            description: `Moving to level ${level + 1}!`,
          });
        }, 1000);
      }
    } else {
      // Wrong match
      toast({
        title: "Try again! 😊",
        description: "Look for the matching shape and color!",
        variant: "destructive"
      });
    }
  };

  const resetGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    generateShapes();
  };

  useEffect(() => {
    generateShapes();
  }, []);

  const getStarsEarned = () => {
    if (score >= 100) return 3;
    if (score >= 50) return 2;
    if (score >= 20) return 1;
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="child" 
            size="child-icon"
            onClick={() => navigate('/child/exercises/shapes')}
            aria-label="Go back"
          >
            <ArrowLeft className="h-8 w-8" />
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {gameData.name}
            </h1>
            <p className="text-lg text-muted-foreground">{gameData.description}</p>
          </div>
          
          <div className="text-right">
            <Badge variant="secondary" className="text-lg px-4 py-2 mb-2">
              Level {level}
            </Badge>
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-success fill-success" />
              <span className="text-xl font-bold text-foreground">{score}</span>
            </div>
          </div>
        </div>

        {/* Target Shape */}
        {targetShape && (
          <Card className="bg-gradient-primary border-2 border-primary/20 shadow-soft mb-8">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Find all shapes like this one! 👀
              </h3>
              <div className="text-8xl mb-2">
                <span className={`${colorStyles[targetShape.color]} drop-shadow-lg`}>
                  {shapeSymbols[targetShape.type]}
                </span>
              </div>
              <p className="text-white/90 text-lg capitalize">
                {targetShape.color} {targetShape.type}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {shapes.map((shape) => (
            <Card
              key={shape.id}
              className={`cursor-pointer h-24 transition-all duration-300 ease-bounce transform hover:scale-105 active:scale-95 border-2 ${
                shape.matched 
                  ? 'bg-gradient-success border-success shadow-success' 
                  : 'bg-card hover:bg-accent border-border'
              }`}
              onClick={() => handleShapeClick(shape)}
            >
              <CardContent className="h-full flex items-center justify-center p-2 relative">
                <span className={`text-4xl ${colorStyles[shape.color]}`}>
                  {shapeSymbols[shape.type]}
                </span>
                {shape.matched && (
                  <CheckCircle className="absolute top-1 right-1 h-4 w-4 text-white" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-4">
          <Button 
            variant="child-secondary" 
            size="child"
            onClick={resetGame}
          >
            <RotateCcw className="h-6 w-6" />
            New Game
          </Button>
          
          <Button 
            variant="child-success" 
            size="child"
            onClick={() => {
              const stars = getStarsEarned();
              toast({
                title: `Game Complete! 🎉`,
                description: `You earned ${stars} stars and ${score} points!`,
              });
              navigate('/child');
            }}
          >
            <Trophy className="h-6 w-6" />
            Finish Game
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            {[1, 2, 3].map((star) => (
              <Star 
                key={star}
                className={`h-8 w-8 ${
                  star <= getStarsEarned() 
                    ? 'text-success fill-success' 
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <p className="text-muted-foreground">
            Find all the matching shapes to earn stars! ⭐
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShapeGame;