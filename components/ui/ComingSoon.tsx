'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function ComingSoon() {
  const searchParams = useSearchParams();
  const previewParam = searchParams.get('preview');
  const previewSecret = process.env.NEXT_PUBLIC_PREVIEW_SECRET || 'true';

  // If the URL contains ?preview=true (or the secret value), bypass the overlay
  if (previewParam === previewSecret) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden">
      {/* Backdrop Blur Layer */}
      <div 
        className="absolute inset-0 z-0 backdrop-blur-[12px]" 
        style={{ backgroundColor: 'rgba(27, 46, 31, 0.4)' }}
      />
      
      {/* Main Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#1B2E1F]">
        {/* Mesh Gradient Overlay */}
        <div className="mesh-overlay opacity-60 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-20 text-center flex flex-col gap-6 px-6">
          <h1 
            className="text-[#F5F0E6] leading-none uppercase tracking-tighter"
            style={{ 
              fontFamily: 'Tanker, var(--font-display), sans-serif',
              fontSize: 'clamp(4rem, 15vw, 12rem)',
            }}
          >
            Coming Soon
          </h1>
          <p className="font-mono text-[#8A9B8E] italic tracking-[0.3em] uppercase text-xs md:text-sm">
            Something is being built here.
          </p>
        </div>
      </div>
    </div>
  );
}
