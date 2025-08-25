import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 active:scale-95",
        outline: "border border-input bg-background shadow hover:bg-accent hover:text-accent-foreground active:scale-95",
        secondary: "bg-secondary text-secondary-foreground shadow-warm hover:bg-secondary/90 active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Child-friendly variants
        child: "bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-lg transform hover:scale-105 active:scale-100 transition-all duration-300 ease-bounce rounded-child font-semibold text-lg",
        "child-secondary": "bg-gradient-secondary text-secondary-foreground shadow-warm hover:shadow-lg transform hover:scale-105 active:scale-100 transition-all duration-300 ease-bounce rounded-child font-semibold text-lg",
        "child-success": "bg-gradient-success text-success-foreground shadow-success hover:shadow-lg transform hover:scale-105 active:scale-100 transition-all duration-300 ease-bounce rounded-child font-semibold text-lg",
        
        // Portal variants for professionals
        portal: "bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-smooth",
        "portal-secondary": "bg-secondary text-secondary-foreground shadow hover:bg-secondary/90 transition-smooth",
        "portal-outline": "border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-smooth",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        
        // Child-specific sizes
        child: "h-button-large min-h-button-large px-8 py-4 text-xl touch-target",
        "child-lg": "h-20 min-h-20 px-12 py-6 text-2xl touch-target",
        "child-icon": "h-16 w-16 min-h-16 min-w-16 p-4 touch-target rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }