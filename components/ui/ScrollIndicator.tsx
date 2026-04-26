'use client';

import { useScrollSection } from "@/hooks/useScrollSection";
import { motion, useScroll, useTransform } from "framer-motion";

const sectionData = [
  { id: "hero", label: "MAIN", theme: "dark" },
  { id: "about", label: "ABOUT", theme: "light" },
  { id: "skills", label: "SKILLS", theme: "dark" },
  { id: "projects", label: "PROJECTS", theme: "dark" },
  { id: "education", label: "EDUCATION", theme: "light" },
  { id: "contact", label: "CONTACT", theme: "dark" },
];

export default function ScrollIndicator() {
  const activeSection = useScrollSection(sectionData.map((s) => s.id));
  
  const { scrollYProgress } = useScroll();
  
  // The dot's position travels directly mapped from 5vh to 95vh purely off scroll progress
  const dotTop = useTransform(scrollYProgress, [0, 1], ["5vh", "95vh"]);

  // Determine current theme
  const currentSectionInfo = sectionData.find((s) => s.id === activeSection);
  const isLight = currentSectionInfo?.theme === "light";

  // Map theme colors
  const themeColors = {
    line: isLight ? 'rgba(27,46,31,0.15)' : 'rgba(245,240,230,0.12)',
    anchorBorder: isLight ? 'rgba(27,46,31,0.25)' : 'rgba(245,240,230,0.2)',
    labelInactive: isLight ? 'rgba(27,46,31,0.35)' : 'rgba(245,240,230,0.25)',
    labelActive: isLight ? '#8B5E3C' : '#C8956C',
    travellingDot: isLight ? '#8B5E3C' : '#C8956C',
    travellingDotShadow: isLight ? '0 0 12px rgba(139,94,60,0.5)' : '0 0 12px rgba(200,149,108,0.5)'
  };

  return (
    <div className="fixed right-10 top-0 bottom-0 z-50 hidden md:block w-8 h-[100vh] pointer-events-none">
      
      {/* Permanent Fallback Baseline */}
      <div 
        className="absolute top-0 bottom-0 w-[1px] -z-20 pointer-events-none" 
        style={{ left: '2.5px', backgroundColor: 'rgba(245,240,230,0.08)' }} 
      />

      {/* Animated Crossfading Line */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[1px] -z-10 pointer-events-none" 
        style={{ left: '2.5px' }} 
        animate={{ backgroundColor: themeColors.line }}
        transition={{ duration: 0.4 }}
      />

      {/* Travelling dot */}
      <motion.div
        className="absolute w-[12px] h-[12px] rounded-full z-20 pointer-events-none"
        style={{ 
          top: dotTop,
          left: '-3px',
          marginTop: '-6px' // exact offset so 'top' defines the center
        }}
        animate={{ 
          backgroundColor: themeColors.travellingDot,
          boxShadow: themeColors.travellingDotShadow
        }}
        transition={{ duration: 0.4 }}
      />

      {sectionData.map((sec, index) => {
        const isActive = activeSection === sec.id;
        
        // 5 evenly spaced intervals over a 90vh span (between 5vh and 95vh).
        // 90 / 5 = 18vh per step.
        const topPosition = `calc(5vh + ${index * 18}vh)`;
        
        return (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="absolute flex items-center group cursor-pointer -translate-y-1/2 pointer-events-auto"
            style={{ top: topPosition, left: 0 }}
            aria-label={`Scroll to ${sec.label}`}
          >
            <div className="relative flex items-center justify-center w-[6px] h-[6px] flex-shrink-0">
              {/* Anchor dot */}
              <motion.div 
                className="w-[6px] h-[6px] rounded-full bg-transparent"
                style={{ borderStyle: 'solid', borderWidth: '1px' }}
                animate={{ borderColor: themeColors.anchorBorder }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Section label */}
            <motion.span
              className="ml-5 text-[11px] tracking-[0.16em] uppercase"
              style={{
                writingMode: 'vertical-rl',
                fontFamily: "'Geist Mono', monospace",
              }}
              animate={{ color: isActive ? themeColors.labelActive : themeColors.labelInactive }}
              transition={{ duration: 0.4 }}
            >
              {sec.label}
            </motion.span>
          </a>
        );
      })}
    </div>
  );
}
