import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button-enhanced";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Trophy, RotateCcw, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Bubble {
  id: number;
  x: number;
  y: number;
  color: string;
  emoji: string;
  popped: boolean;
}

const FunGame = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<'playing' | 'won'>('playing');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  const getGameData = () => {
    switch (id) {
      case '1': return { 
        name: 'Bubble Pop', 
        description: 'Pop all the colorful bubbles!',
        emojis: ['🔵', '🟡', '🟢', '🔴', '🟣', '🟠']
      };
      case '2': return { 
        name: 'Animal Sounds', 
        description: 'Find the matching animals!',
        emojis: ['🐶', '🐱', '🐸', '🐰', '🦆', '🐷']
      };
      case '3': return { 
        name: 'Treasure Hunt', 
        description: 'Find all the hidden treasures!',
        emojis: ['💎', '👑', '🏆', '⭐', '🎁', '🌟']
      };
      case '4': return { 
        name: 'Magic Garden', 
        description: 'Help flowers bloom!',
        emojis: ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼']
      };
      default: return { 
        name: 'Fun Game', 
        description: 'Have fun playing!',
        emojis: ['🎉', '🎈', '🎊', '🎁', '⭐', '🌟']
      };
    }
  };

  const gameData = getGameData();

  const colors = [
    'bg-gradient-primary',
    'bg-gradient-secondary', 
    'bg-gradient-success',
    'bg-red-400',
    'bg-purple-400',
    'bg-pink-400'
  ];

  const generateBubbles = () => {
    const newBubbles: Bubble[] = [];
    const bubbleCount = Math.min(level + 4, 12);
    
    for (let i = 0; i < bubbleCount; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 80 + 10, // 10-90% to avoid edges
        y: Math.random() * 70 + 15, // 15-85% to avoid edges
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: gameData.emojis[Math.floor(Math.random() * gameData.emojis.length)],
        popped: false
      });
    }
    
    setBubbles(newBubbles);
  };

  const handleBubbleClick = (clickedBubble: Bubble) => {
    if (gameState !== 'playing' || clickedBubble.popped || !gameStarted) return;
    
    const updatedBubbles = bubbles.map(bubble => 
      bubble.id === clickedBubble.id ? { ...bubble, popped: true } : bubble
    );
    setBubbles(updatedBubbles);
    
    const newScore = score + 10;
    setScore(newScore);
    
    toast({
      title: "Pop! 🎉",
      description: "+10 points!",
    });

    // Check if all bubbles popped
    const allPopped = updatedBubbles.every(bubble => bubble.popped);
    if (allPopped) {
      const bonusPoints = Math.max(timeLeft * 2, 0);
      setScore(newScore + bonusPoints);
      setLevel(prev => prev + 1);
      
      toast({
        title: "Amazing! All bubbles popped! 🌟",
        description: `Level complete! Bonus: +${bonusPoints} points!`,
      });
      
      setTimeout(() => {
        generateBubbles();
        setTimeLeft(30);
      }, 2000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    generateBubbles();
  };

  const resetGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setGameStarted(false);
    setBubbles([]);
  };

  // Timer effect
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('won');
          toast({
            title: "Time's up! ⏰",
            description: `Final score: ${score} points!`,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, score, toast]);

  useEffect(() => {
    if (!gameStarted) {
      generateBubbles();
    }
  }, []);

  const getStarsEarned = () => {
    if (score >= 200) return 3;
    if (score >= 100) return 2;
    if (score >= 50) return 1;
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="child" 
            size="child-icon"
            onClick={() => navigate('/child/exercises/games')}
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
        <div className="text-center mb-6">
          {!gameStarted ? (
            <Card className="bg-gradient-primary border-2 border-primary/20 shadow-soft">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Play? 🎮
                </h3>
                <Button 
                  variant="child-success" 
                  size="child"
                  onClick={startGame}
                >
                  <Sparkles className="h-6 w-6" />
                  Start Game!
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-secondary border-2 border-secondary/20 shadow-warm">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  Time Left: {timeLeft}s ⏰
                </h3>
                <p className="text-white/90">
                  Bubbles left: {bubbles.filter(b => !b.popped).length}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Game Area */}
        <div className="relative h-96 bg-card rounded-lg border-2 border-border overflow-hidden mb-6">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className={`absolute cursor-pointer transform transition-all duration-500 ease-bounce hover:scale-110 active:scale-90 ${
                bubble.popped ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                transform: `translate(-50%, -50%) ${bubble.popped ? 'scale(0)' : 'scale(1)'}`,
              }}
              onClick={() => handleBubbleClick(bubble)}
            >
              <Card className={`w-16 h-16 ${bubble.color} border-2 border-white/30 shadow-lg`}>
                <CardContent className="h-full flex items-center justify-center p-0">
                  <span className="text-2xl animate-bounce-gentle">
                    {bubble.emoji}
                  </span>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {!gameStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-6xl mb-4">🎮</div>
                <p className="text-xl text-muted-foreground">Click Start Game to begin!</p>
              </div>
            </div>
          )}
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
        <div className="mt-6 text-center">
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
            Pop bubbles quickly to earn more stars! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default FunGame;