import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ScoreDisplayProps {
  level: number;
  score: number;
}

const ScoreDisplay = ({ level, score }: ScoreDisplayProps) => {
  return (
    <div className="text-right">
      <Badge variant="secondary" className="text-lg px-4 py-2 mb-2 bg-secondary text-secondary-foreground">
        Level {level}
      </Badge>
      <div className="flex items-center gap-2 justify-end">
        <Star className="h-6 w-6 text-success fill-success" />
        <span className="text-xl font-bold text-foreground">{score}</span>
      </div>
    </div>
  );
};

export default ScoreDisplay;