import { createClient } from '@/lib/supabase/client';
import BlogCard from '@/components/blog/BlogCard';

// Ensures SSG statically regenerates at most every 60 seconds
export const revalidate = 60; 

export default async function BlogArchive() {
  const supabase = createClient();
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="min-h-screen bg-[#1B2E1F] text-[#F5F0E6] pt-[var(--nav-height)] relative">
      {/* Mesh overlay */}
      <div className="mesh-overlay" />

      <div className="mx-auto w-full max-w-[900px] px-6 py-20 lg:py-32 relative z-10">
        
        <header className="mb-24" data-aos="fade-up">
          <h3 className="font-serif italic text-[#C8956C] text-lg tracking-wide mb-6">
            The Log
          </h3>
          <h1 className="font-display text-[var(--text-display)] font-medium leading-[1.1] tracking-tight">
            Transmissions.<br/>
            <span className="opacity-40 text-[#8A9B8E] font-light font-serif italic">Filtered thoughts.</span>
          </h1>
        </header>

        {(!posts || posts.length === 0) ? (
          <div className="border border-[#2E4434] bg-[#243328] p-16 text-center flex flex-col items-center justify-center min-h-[300px]">
             <span className="font-serif italic text-[#C8956C] text-4xl mb-6 tracking-wide">{"{ empty }"}</span>
             <p className="font-body text-[#8A9B8E] text-lg leading-[1.85]">No transmissions received yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map(post => (
               <div key={post.id} data-aos="fade-up">
                 <BlogCard post={post as any} />
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
