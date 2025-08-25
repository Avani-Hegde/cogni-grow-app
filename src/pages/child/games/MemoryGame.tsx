import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button-enhanced";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Trophy, RotateCcw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MemoryGame = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const colors = ['bg-gradient-primary', 'bg-gradient-secondary', 'bg-gradient-success', 'bg-destructive'];
  const cardLabels = ['🔵', '🟡', '🟢', '🔴'];

  const getGameData = () => {
    switch (id) {
      case '1': return { name: 'Pattern Memory', description: 'Watch the pattern and repeat it!' };
      case '2': return { name: 'Color Sequence', description: 'Remember the color order!' };
      case '3': return { name: 'Number Pairs', description: 'Match the number pairs!' };
      case '4': return { name: 'Story Memory', description: 'Remember the story sequence!' };
      default: return { name: 'Memory Game', description: 'Train your memory!' };
    }
  };

  const gameData = getGameData();

  const generateSequence = () => {
    const newSequence = [];
    for (let i = 0; i < level + 2; i++) {
      newSequence.push(Math.floor(Math.random() * 4));
    }
    setSequence(newSequence);
    setPlayerSequence([]);
    showSequenceToPlayer(newSequence);
  };

  const showSequenceToPlayer = async (seq: number[]) => {
    setShowingSequence(true);
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveCard(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveCard(null);
    }
    
    setShowingSequence(false);
  };

  const handleCardClick = (cardIndex: number) => {
    if (showingSequence || gameState !== 'playing') return;

    const newPlayerSequence = [...playerSequence, cardIndex];
    setPlayerSequence(newPlayerSequence);

    // Check if the player's sequence matches so far
    const isCorrect = newPlayerSequence.every((card, index) => card === sequence[index]);
    
    if (!isCorrect) {
      setGameState('lost');
      toast({
        title: "Oops! 😅",
        description: "That wasn't quite right. Try again!",
        variant: "destructive"
      });
      return;
    }

    // Check if player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      const newScore = score + (level * 10);
      setScore(newScore);
      setLevel(level + 1);
      
      toast({
        title: "Amazing! 🌟",
        description: `You got it right! +${level * 10} points!`,
      });

      // Generate new sequence after a delay
      setTimeout(() => {
        generateSequence();
      }, 1500);
    }
  };

  const resetGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setPlayerSequence([]);
    generateSequence();
  };

  useEffect(() => {
    generateSequence();
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
            onClick={() => navigate('/child/exercises/memory')}
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

        {/* Game Status */}
        <div className="text-center mb-8">
          {showingSequence && (
            <Card className="bg-gradient-primary border-2 border-primary/20 shadow-soft">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Watch Carefully! 👀
                </h3>
                <p className="text-white/90">Remember this pattern...</p>
              </CardContent>
            </Card>
          )}
          
          {!showingSequence && gameState === 'playing' && playerSequence.length < sequence.length && (
            <Card className="bg-gradient-secondary border-2 border-secondary/20 shadow-warm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Your Turn! 🎯
                </h3>
                <p className="text-white/90">
                  Tap the pattern: {playerSequence.length + 1}/{sequence.length}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
          {colors.map((color, index) => (
            <Card
              key={index}
              className={`cursor-pointer h-32 transition-all duration-300 ease-bounce transform hover:scale-105 active:scale-95 border-4 ${
                activeCard === index 
                  ? 'border-white shadow-2xl scale-110' 
                  : 'border-transparent'
              } ${color}`}
              onClick={() => handleCardClick(index)}
            >
              <CardContent className="h-full flex items-center justify-center p-0">
                <span className="text-6xl">{cardLabels[index]}</span>
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
            Play Again
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
            Keep playing to earn more stars! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;