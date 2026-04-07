'use client';

import { useRef } from "react";
import SplitReveal from "@/components/ui/SplitReveal";
import { motion, useMotionValue, useTransform } from "framer-motion";

const targetProjects = [
  {
    id: "aires",
    title: "AIRES",
    description: "An AI-powered Intelligent Recruitment & Evaluation System utilizing NLP to rank and match applicant resumes strictly against distinct job parameter datasets.",
    tech: ["MERN Stack", "Python FastAPI", "NLP", "Redux"],
    url: "#",
    github: "#", 
    bg: "#F5F0E6",
    textColor: "#1B2E1F",
    mutedColor: "#1B2E1F",
    alignment: "right" as const,
  },
  {
    id: "bizcod",
    title: "BIZCOD Bookstore",
    description: "A digital sanctuary supporting a local used-book seller in Malappuram. Engineered an interactive showcase that elevated his physical storefront directly to the web with integrated search.",
    tech: ["HTML/CSS", "Vanilla JS", "Bootstrap", "GSAP"],
    url: "https://aymanvk.github.io/bizcodbookstore.github.io/",
    github: "https://github.com/aymanvk/bizcodbookstore.github.io",
    bg: "#1B2E1F",
    textColor: "#F5F0E6",
    mutedColor: "#8A9B8E",
    alignment: "left" as const,
  }
];

// Reusable Tilt Image Component
function TiltCard({ proj }: { proj: typeof targetProjects[0] }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const isDark = proj.bg === '#1B2E1F';

  return (
    <motion.div 
      className="w-full md:w-[55%] aspect-[16/10] overflow-hidden relative group cursor-none shadow-2xl"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="w-full h-full"
        style={{ 
          rotateX, rotateY, transformStyle: "preserve-3d",
          backgroundColor: isDark ? '#243328' : '#EDE8DE',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="font-serif italic text-lg md:text-2xl tracking-wide opacity-30"
            style={{ color: isDark ? '#F5F0E6' : '#1B2E1F' }}
          >
            {proj.title}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ proj, showHeader, zIndex }: { proj: typeof targetProjects[0], showHeader: boolean, zIndex: number }) {
  const isDark = proj.bg === '#1B2E1F';

  return (
    <section 
      id={showHeader ? "projects" : `projects-${proj.id}`} 
      data-section={showHeader ? "projects" : `projects-${proj.id}`}
      className="stack-section relative w-full h-screen flex items-center overflow-hidden"
      style={{ 
        backgroundColor: proj.bg,
        zIndex,
        padding: 'var(--section-padding-y) var(--section-padding-x)',
      }}
    >
      {/* Mesh overlay for dark sections */}
      {isDark && <div className="mesh-overlay" />}

      <div className="mx-auto w-full relative h-full flex items-center z-10" style={{ maxWidth: 'var(--max-width)' }}>
        <div className="w-full flex-1 flex flex-col justify-center gap-12 md:gap-16">
          
          {showHeader && (
            <div>
              <h3 className="font-serif italic text-[#C8956C] text-lg tracking-wide mb-4">
                Featured Work
              </h3>
              <SplitReveal text="Proof of Work." className={`font-display text-[var(--text-display)] font-medium leading-tight ${isDark ? 'text-[#F5F0E6]' : 'text-[#1B2E1F]'}`} />
            </div>
          )}

          <div className={`flex flex-col ${proj.alignment === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-12 lg:gap-16 items-center`}>
            <TiltCard proj={proj} />
            
            <div className="w-full md:w-[45%] flex flex-col">
              <h3 className="font-display text-3xl md:text-5xl font-medium mb-4 md:mb-6" style={{ color: proj.textColor }}>{proj.title}</h3>
              <p className="font-body text-base md:text-lg leading-[1.85] mb-6 md:mb-8" style={{ color: proj.mutedColor, opacity: 0.7 }}>
                {proj.description}
              </p>

              {/* Tech stack — plain monospace, dot-separated */}
              <div className="tech-stack mb-8 md:mb-10">
                {proj.tech.map((t, i) => (
                  <span key={t}>
                    {t}
                    {i < proj.tech.length - 1 && <span className="mx-2 opacity-40">·</span>}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 items-center">
                <a 
                  href={proj.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="editorial-link"
                  style={{ color: proj.textColor, borderColor: `${proj.mutedColor}40` }}
                >
                  View Live <span className="text-base leading-none">→</span>
                </a>
                <a 
                  href={proj.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="editorial-link"
                  style={{ color: proj.textColor, borderColor: `${proj.mutedColor}40` }}
                >
                  Source <span className="text-base leading-none">→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <>
      <ProjectCard proj={targetProjects[0]} showHeader={true} zIndex={4} />
      <ProjectCard proj={targetProjects[1]} showHeader={false} zIndex={5} />
    </>
  );
}
