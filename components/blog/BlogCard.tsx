import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Post } from '@/types';

export default function BlogCard({ post }: { post: Post }) {
  // Approximate reading time based on 200 words per minute
  const wordCount = post.content.split(/\s+/g).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <Link href={`/blog/${post.slug}`} className="group block w-full">
      <article className="border border-[#2E4434] bg-[#243328] p-6 md:p-8 transition-all duration-300 hover:bg-[#2E4434] hover:-translate-y-1 relative overflow-hidden h-full flex flex-col justify-between gap-6">
        
        {/* Subtle left hover bar — warm amber */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8956C] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-[#8A9B8E] font-mono text-xs">
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
            <span>·</span>
            <span>{readTime} min read</span>
          </div>

          <h3 className="font-display text-2xl font-medium group-hover:text-[#C8956C] transition-colors leading-tight text-[#F5F0E6]">
            {post.title}
          </h3>
          
          <p className="font-body text-[#8A9B8E] text-base line-clamp-3 leading-[1.85]">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
