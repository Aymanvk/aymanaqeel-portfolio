'use client';
import { useScrollSection } from "@/hooks/useScrollSection";
import { motion } from "framer-motion";

const sections = ["hero", "about", "skills", "projects", "education", "contact"];

export default function ScrollProgress() {
  const activeSection = useScrollSection(sections);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-50 mix-blend-difference hidden md:flex">
      {sections.map((section) => {
        const isActive = activeSection === section;
        return (
          <a
            key={section}
            href={`#${section}`}
            className="group relative flex items-center justify-center p-2"
            aria-label={`Scroll to ${section}`}
          >
            <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] uppercase tracking-widest text-[#F5F0E6] whitespace-nowrap">
              {section}
            </span>
            <motion.div 
              className={`rounded-full transition-colors duration-300 ${isActive ? 'w-2 h-2 opacity-100 bg-[#C8956C]' : 'w-1.5 h-1.5 opacity-30 group-hover:opacity-100 bg-[#F5F0E6]'}`}
              animate={{
                scale: isActive ? 1.4 : 1,
              }}
            />
          </a>
        );
      })}
    </div>
  );
}
