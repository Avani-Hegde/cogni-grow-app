import { Button } from "@/components/ui/button-enhanced";
import { RotateCcw, Trophy } from "lucide-react";

interface GameControlsProps {
  onPlayAgain: () => void;
  onFinishGame: () => void;
}

const GameControls = ({ onPlayAgain, onFinishGame }: GameControlsProps) => {
  return (
    <div className="flex justify-center gap-4">
      <Button 
        variant="child-secondary" 
        size="child"
        onClick={onPlayAgain}
        className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
      >
        <RotateCcw className="h-6 w-6" />
        Play Again
      </Button>
      
      <Button 
        variant="child-success" 
        size="child"
        onClick={onFinishGame}
        className="bg-success text-success-foreground hover:bg-success/90"
      >
        <Trophy className="h-6 w-6" />
        Finish Game
      </Button>
    </div>
  );
};

export default GameControls;