import SectionWrapper from "@/components/ui/SectionWrapper";
import SplitReveal from "@/components/ui/SplitReveal";

interface SkillItem {
  category: string;
  skills: { name: string; context: string }[];
}

const skillsData: SkillItem[] = [
  {
    category: "FRONTEND",
    skills: [
      { name: "Next.js 14", context: "App Router, Server Actions, SSG/SSR" },
      { name: "React Web/Native", context: "Hooks, Context, Zustand, Reanimated" },
      { name: "TypeScript", context: "Generics, Strict Mode, Interfaces" },
      { name: "Tailwind CSS", context: "Custom Configs, Dynamic rendering" },
      { name: "Framer & GSAP", context: "ScrollTrigger, Orchestrations" }
    ]
  },
  {
    category: "BACKEND",
    skills: [
      { name: "Node.js & Express", context: "REST APIs, MVC pattern" },
      { name: "Supabase / PostgreSQL", context: "RLS, RPCs, Edge Functions" },
      { name: "MongoDB", context: "Mongoose, Aggregations Pipelines" },
      { name: "Python", context: "FastAPI, Data processing scripts" }
    ]
  },
  {
    category: "TOOLS & DEPLOY",
    skills: [
      { name: "Git / GitHub", context: "Actions, CI/CD, Conventional Commits" },
      { name: "Vercel / Render", context: "Edge caching, Serverless deployments" },
      { name: "Figma", context: "UI/UX, Prototyping, Design Systems" }
    ]
  }
];

export default function Skills() {
  return (
    <SectionWrapper id="skills" zIndex={3} className="flex-col justify-center bg-[#1B2E1F]">
      {/* Radial mesh overlay */}
      <div className="mesh-overlay" />

      <div className="w-full flex-1 flex flex-col justify-center py-20 relative z-10">
        
        <div className="mb-12" data-aos="fade-up">
          <h3 className="font-serif italic text-[#C8956C] text-lg tracking-wide mb-4">
            Technical Arsenal
          </h3>
          <SplitReveal 
            text="I don't just write code. I build systems." 
            className="font-display text-[var(--text-display)] font-medium leading-tight" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((group, groupIdx) => (
            <div 
              key={group.category} 
              className="flex flex-col"
              data-aos="fade-up"
              data-aos-delay={groupIdx * 150}
            >
              <h4 className="font-mono text-[#8A9B8E] text-sm mb-6 border-b border-[#2E4434] pb-2">
                {group.category}
              </h4>
              <div className="flex flex-col gap-3">
                {group.skills.map(skill => (
                  <div 
                    key={skill.name} 
                    className="group relative p-4 bg-[#243328] border border-[#2E4434] rounded-lg transition-all duration-300 hover:bg-[#2E4434] overflow-hidden"
                  >
                    <div className="flex flex-col z-10 relative">
                      <span className="font-medium text-[#F5F0E6] transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[11px] text-[#8A9B8E] mt-1 opacity-80">
                        {skill.context}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
