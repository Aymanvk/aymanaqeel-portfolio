import React from 'react';

export default function ComingSoonFallback() {
  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden">
      {/* Static Background Layer (Matches ComingSoon.tsx) */}
      <div className="absolute inset-0 bg-[#1B2E1F]" />
      
      {/* Content Container (Matches ComingSoon.tsx) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Mesh Gradient Overlay */}
        <div className="mesh-overlay opacity-60 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-20 text-center flex flex-col gap-6 px-6">
          <h1 
            className="text-[#F5F0E6] leading-none uppercase tracking-tighter animate-reveal opacity-0"
            style={{ 
              fontFamily: 'Tanker, var(--font-display), sans-serif',
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              animationDelay: '0.4s'
            }}
          >
            Coming Soon
          </h1>
          <p className="font-mono text-[#8A9B8E] italic tracking-[0.3em] uppercase text-xs md:text-sm animate-reveal opacity-0" style={{ animationDelay: '1.0s' }}>
            Something is being built here.
          </p>
        </div>
      </div>
    </div>
  );
}
