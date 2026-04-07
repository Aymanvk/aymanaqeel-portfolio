import { ReactNode } from "react";

export default function SectionWrapper({ 
  id, 
  children, 
  className = "",
  zIndex = 1,
}: { 
  id: string, 
  children: ReactNode, 
  className?: string,
  zIndex?: number,
}) {
  return (
    <section 
      id={id} 
      data-section={id}
      className={`stack-section relative w-full h-screen flex items-center ${className}`}
      style={{ 
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        zIndex,
      }}
    >
      <div className="mx-auto w-full relative h-full flex items-center" style={{ maxWidth: 'var(--max-width)' }}>
        {children}
      </div>
    </section>
  );
}
