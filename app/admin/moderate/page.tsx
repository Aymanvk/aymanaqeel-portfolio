import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import ModerationTable from '@/components/admin/ModerationTable';

export const revalidate = 0;

export default async function Moderate() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/admin/login');

  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
     console.error("Critical table validation failure", error);
  }

  return (
    <div className="w-full">
      <h1 className="font-display text-4xl font-medium mb-4 text-[#F5F0E6]">Signal Moderation</h1>
      <p className="font-mono text-sm text-[#8A9B8E] mb-12">Authorize clean traffic. Reject bad actors.</p>
      <ModerationTable initialComments={(comments as any) || []} />
    </div>
  );
}
