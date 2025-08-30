import { Star } from "lucide-react";

interface StarRatingProps {
  starsEarned: number;
  maxStars?: number;
}

const StarRating = ({ starsEarned, maxStars = 3 }: StarRatingProps) => {
  return (
    <div className="mt-8 text-center">
      <div className="flex justify-center items-center gap-2 mb-4">
        {Array.from({ length: maxStars }, (_, index) => (
          <Star 
            key={index + 1}
            className={`h-8 w-8 transition-colors duration-300 ${
              index + 1 <= starsEarned 
                ? 'text-success fill-success animate-pulse' 
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
      <p className="text-muted-foreground">
        {starsEarned > 0 ? `Amazing! You earned ${starsEarned} stars! 🌟` : 'Keep playing to earn more stars! 🌟'}
      </p>
    </div>
  );
};

export default StarRating;