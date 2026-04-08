import { ReactNode } from "react";

export default function SectionWrapper({ 
  id, 
  children, 
  className = "",
  zIndex = 1,
  fullWidth = false,
}: { 
  id: string, 
  children: ReactNode, 
  className?: string,
  zIndex?: number,
  fullWidth?: boolean,
}) {
  return (
    <section 
      id={id} 
      data-section={id}
      className={`stack-section relative w-full h-screen flex items-center ${className}`}
      style={{ 
        padding: fullWidth ? 0 : 'var(--section-padding-y) var(--section-padding-x)',
        zIndex,
      }}
    >
      <div 
        className={`mx-auto w-full relative h-full flex items-center ${fullWidth ? 'max-w-none' : ''}`} 
        style={{ maxWidth: fullWidth ? 'none' : 'var(--max-width)' }}
      >
        {children}
      </div>
    </section>
  );
}
