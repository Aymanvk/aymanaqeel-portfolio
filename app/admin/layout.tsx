import { createServerSupabaseClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen bg-[#1B2E1F] text-[#F5F0E6] px-6 md:px-12 pt-[calc(var(--nav-height)+3rem)]">
       {session && (
         <nav className="mb-12 border-b border-[#2E4434] pb-6 flex gap-8 font-mono text-sm uppercase tracking-widest items-center">
           <Link href="/admin" className="text-[#8A9B8E] hover:text-[#F5F0E6] transition-colors">Dashboard</Link>
           <Link href="/admin/new-post" className="text-[#8A9B8E] hover:text-[#F5F0E6] transition-colors">Draft Post</Link>
           <Link href="/admin/moderate" className="text-[#8A9B8E] hover:text-[#C8956C] transition-colors">Moderation Queue</Link>
         </nav>
       )}
       <div className="max-w-7xl mx-auto">
         {children}
       </div>
    </div>
  );
}
