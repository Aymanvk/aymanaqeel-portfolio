import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="w-full relative">
      {/* Each section is 100vh tall and sticky at top:0.
          The outer container's total height = 100vh * number of sections,
          giving each section its own scroll zone before the next one overlaps it. */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}
