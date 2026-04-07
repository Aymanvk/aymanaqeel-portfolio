import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import PostEditor from '@/components/admin/PostEditor';

// Native bypass SSG config 
export const revalidate = 0;

export default async function NewPost() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/admin/login');

  return (
    <div className="w-full">
      <h1 className="font-display text-4xl font-medium mb-10 text-[#C8956C]">Draft New Transmission</h1>
      <PostEditor />
    </div>
  );
}
