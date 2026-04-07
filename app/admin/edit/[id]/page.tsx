import { redirect, notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import PostEditor from '@/components/admin/PostEditor';

export const revalidate = 0;

export default async function EditPost({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/admin/login');

  const { data: post, error } = await supabase.from('posts').select('*').eq('id', params.id).single();
  if (error || !post) notFound();

  return (
    <div className="w-full">
      <h1 className="font-display text-4xl font-medium mb-10 text-[#F5F0E6]">Edit Transmission</h1>
      <PostEditor initialData={post} />
    </div>
  );
}
