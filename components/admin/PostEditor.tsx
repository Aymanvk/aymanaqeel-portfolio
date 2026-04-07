'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/utils';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// Client-side execution wrapper mapping to prevent hydrated ID mismatches native to UIW 
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function PostEditor({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [published, setPublished] = useState(initialData?.published || false);
  const [loading, setLoading] = useState(false);
  
  const handleSave = async (isPublished: boolean) => {
    setLoading(true);
    const finalSlug = slug || slugify(title);

    const postPayload = {
      title,
      slug: finalSlug,
      excerpt,
      content,
      published: isPublished
    };

    let result;
    if (initialData?.id) {
      result = await supabase.from('posts').update(postPayload).eq('id', initialData.id);
    } else {
      result = await supabase.from('posts').insert(postPayload).select().single();
    }

    setLoading(false);
    if (!result.error) {
      router.push('/admin');
      router.refresh();
    } else {
      alert(result.error.message);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 bg-[#243328] p-8 border border-[#2E4434] rounded-sm">
       <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Transmission Title..."
          className="bg-transparent border-b border-[#2E4434] focus:border-[#C8956C] outline-none py-4 text-3xl font-display font-medium text-[#F5F0E6] placeholder:opacity-30"
       />
       <input 
          type="text" 
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder={`Slug (optional, automatically generates to: ${slugify(title)})`}
          className="bg-transparent text-[#8A9B8E] font-mono text-sm outline-none w-full"
       />
       <textarea 
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief 1-2 sentence excerpt for card preview..."
          rows={3}
          className="bg-[#1B2E1F] border border-[#2E4434] p-4 text-[#F5F0E6] font-body text-base w-full rounded-sm outline-none focus:border-[#C8956C] resize-none placeholder:text-[#8A9B8E]"
       />
       
       <div data-color-mode="dark" className="border border-[#2E4434]">
         <MDEditor 
            value={content} 
            onChange={(val) => setContent(val || '')} 
            height={500} 
            preview="edit"
            className="!bg-[#1B2E1F]"
         />
       </div>

       <div className="flex justify-between items-center mt-8 border-t border-[#2E4434] pt-8">
          <button 
             onClick={() => router.push('/admin')}
             className="font-mono text-[#8A9B8E] hover:text-[#F5F0E6] transition-colors text-sm"
          >
             CANCEL
          </button>
          
          <div className="flex gap-4">
            <button 
               onClick={() => handleSave(false)} 
               disabled={loading || !title || !content}
               className="px-6 py-3 border border-[#2E4434] text-[#F5F0E6] font-mono text-sm uppercase tracking-widest hover:border-[#C8956C] transition-colors disabled:opacity-50"
            >
               SAVE DRAFT
            </button>
            <button 
               onClick={() => handleSave(true)} 
               disabled={loading || !title || !content}
               className="editorial-link px-6 py-3 disabled:opacity-50 text-sm uppercase tracking-widest"
            >
               {published ? 'UPDATE LIVE →' : 'PUBLISH NOW →'}
            </button>
          </div>
       </div>
    </div>
  );
}
