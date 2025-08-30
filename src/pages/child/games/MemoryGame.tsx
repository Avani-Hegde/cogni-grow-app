import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button-enhanced";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ColorButton from "@/components/games/ColorButton";
import ScoreDisplay from "@/components/games/ScoreDisplay";
import GameControls from "@/components/games/GameControls";
import StarRating from "@/components/games/StarRating";

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
  const [shakingCard, setShakingCard] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const colors: ('blue' | 'yellow' | 'green' | 'red')[] = ['blue', 'yellow', 'green', 'red'];

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
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      
      // Trigger shake animation
      setShakingCard(cardIndex);
      setTimeout(() => setShakingCard(null), 500);
      
      toast({
        title: "Oops! 😅",
        description: `That wasn't quite right. ${3 - newWrongAttempts} attempts left!`,
        variant: "destructive"
      });
      
      // Reset player sequence for retry
      setPlayerSequence([]);
      
      // End game after 3 wrong attempts
      if (newWrongAttempts >= 3) {
        setGameState('lost');
        toast({
          title: "Game Over! 🎮",
          description: "Don't worry, practice makes perfect!",
          variant: "destructive"
        });
      }
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
    setWrongAttempts(0);
    setShakingCard(null);
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
              Pattern Memory
            </h1>
            <p className="text-lg text-muted-foreground">Watch the pattern and repeat it!</p>
          </div>
          
          <ScoreDisplay level={level} score={score} />
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
            <ColorButton
              key={index}
              color={color}
              isActive={activeCard === index}
              isShaking={shakingCard === index}
              onClick={() => handleCardClick(index)}
              disabled={showingSequence || gameState !== 'playing'}
            />
          ))}
        </div>

        {/* Game Controls */}
        <GameControls 
          onPlayAgain={resetGame}
          onFinishGame={() => {
            const stars = getStarsEarned();
            toast({
              title: `Game Complete! 🎉`,
              description: `You earned ${stars} stars and ${score} points!`,
            });
            navigate('/child');
          }}
        />

        {/* Progress Indicator */}
        <StarRating starsEarned={getStarsEarned()} />
      </div>
    </div>
  );
};

export default MemoryGame;