import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ColorButtonProps {
  color: 'blue' | 'yellow' | 'green' | 'red';
  isActive: boolean;
  isShaking: boolean;
  onClick: () => void;
  disabled: boolean;
}

const ColorButton = ({ color, isActive, isShaking, onClick, disabled }: ColorButtonProps) => {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600', 
    green: 'bg-green-500 hover:bg-green-600',
    red: 'bg-red-500 hover:bg-red-600'
  };

  const colorEmojis = {
    blue: '🔵',
    yellow: '🟡', 
    green: '🟢',
    red: '🔴'
  };

  return (
    <Card
      className={cn(
        "cursor-pointer h-32 transition-all duration-300 ease-bounce transform hover:scale-105 active:scale-95 border-4",
        colorClasses[color],
        isActive && "border-white shadow-2xl scale-110 brightness-125",
        !isActive && "border-transparent",
        isShaking && "animate-[shake_0.5s_ease-in-out]",
        disabled && "cursor-not-allowed opacity-50"
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="h-full flex items-center justify-center p-0">
        <span className="text-6xl">{colorEmojis[color]}</span>
      </CardContent>
    </Card>
  );
};

export default ColorButton;