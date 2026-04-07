import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const revalidate = 0; // Disable static caching for admin panel

export default async function AdminDashboard() {
  const supabase = createServerSupabaseClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/admin/login');
  }

  // Fetch posts overview
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, published, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="w-full">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="font-display text-4xl font-medium mb-2 text-[#F5F0E6]">Command Center</h1>
          <p className="font-mono text-sm text-[#8A9B8E]">Manage Transmissions & Signals</p>
        </div>
      </header>

      <section className="bg-[#243328] border border-[#2E4434] p-8">
        <div className="flex justify-between items-center mb-8 border-b border-[#2E4434] pb-4">
           <h2 className="font-mono text-lg tracking-widest uppercase text-[#C8956C]">Transmissions (Posts)</h2>
           <Link href="/admin/new-post" className="editorial-link text-xs">
              + COMPOSE →
           </Link>
        </div>

        {(!posts || posts.length === 0) ? (
          <p className="text-[#8A9B8E] font-mono text-sm">No transmissions logged.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map(post => (
              <div key={post.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-[#1B2E1F] border border-[#2E4434] hover:border-[#8A9B8E] transition-colors gap-4">
                <div className="flex flex-col">
                  <span className="font-medium font-display text-xl mb-1 text-[#F5F0E6]">{post.title}</span>
                  <div className="flex gap-4 font-mono text-xs text-[#8A9B8E] items-center">
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span className={`px-2 py-0.5 rounded-sm ${post.published ? 'bg-[#C8956C]/15 text-[#C8956C]' : 'bg-[#F5F0E6]/10 text-[#F5F0E6]'}`}>
                      {post.published ? 'LIVE' : 'DRAFT'}
                    </span>
                  </div>
                </div>
                
                <Link href={`/admin/edit/${post.id}`} className="editorial-link text-xs">
                  EDIT →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
