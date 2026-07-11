import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    const baseStyle = "px-6 py-2.5 rounded-md font-semibold transition-all duration-300 flex items-center justify-center";
    const variants = {
      primary: "bg-gx-neon text-gx-dark hover:bg-[#32e012] shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]",
      outline: "border-2 border-gx-neon text-gx-neon hover:bg-gx-neon/10",
      ghost: "text-gx-text hover:bg-white/5",
    };

    return (
      <button ref={ref} className={cn(baseStyle, variants[variant], className)} disabled={isLoading} {...props}>
        {isLoading ? <span className="animate-spin mr-2">⚙</span> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";