import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Badge({ 
  children, 
  className,
  variant = 'default',
  title
}: { 
  children: ReactNode; 
  className?: string;
  variant?: 'default' | 'accent' | 'green' | 'ghost' | 'outline',
  title?: string;
}) {
  const variants = {
    default: "bg-[#243328] text-[#F5F0E6] border-[#2E4434]",
    accent: "bg-[#C8956C]/10 text-[#C8956C] border-[#C8956C]/20",
    green: "bg-[#C8956C]/10 text-[#C8956C] border-[#C8956C]/20",
    ghost: "bg-transparent text-[#8A9B8E] border-[#2E4434]",
    outline: "bg-transparent border-[#C8956C]/30 text-[#C8956C]"
  };

  return (
    <span title={title} className={cn("inline-flex items-center justify-center px-3 py-1 rounded-full text-[13px] font-mono border", variants[variant], className)}>
      {children}
    </span>
  );
}
