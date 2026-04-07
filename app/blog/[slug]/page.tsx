import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import PostContent from '@/components/blog/PostContent';
import CommentSection from '@/components/blog/CommentSection';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60;

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient(); 

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    notFound(); 
  }

  // Fetch approved comments exclusively natively joining
  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', post.id)
    .eq('status', 'approved')
    .order('created_at', { ascending: true });

  return (
    <div className="min-h-screen bg-[#1B2E1F] text-[#F5F0E6] pt-[var(--nav-height)] pb-32">
      <div className="mx-auto w-full max-w-[800px] px-6 py-16">
        
        <Link href="/blog" className="editorial-link text-[11px] mb-12 inline-flex">
          ← Back to Transmissions
        </Link>
        
        <header className="mb-16">
          <div className="font-mono text-[#C8956C] text-sm mb-6 flex items-center gap-4">
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8 text-[#F5F0E6]">
            {post.title}
          </h1>
          {post.cover_image_url && (
            <div className="w-full aspect-[21/9] relative bg-[#243328] border border-[#2E4434] mb-12 overflow-hidden">
              <Image 
                src={post.cover_image_url} 
                alt="Post Cover" 
                fill 
                className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" 
                unoptimized 
              />
            </div>
          )}
        </header>

        <PostContent content={post.content} />
        
        <CommentSection postId={post.id} comments={(comments as any) || []} />
      </div>
    </div>
  );
}
