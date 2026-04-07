'use client';
import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Comment } from '@/types';

export default function CommentSection({ postId, comments }: { postId: string, comments: Comment[] }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "rejected">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, message }),
      });

      if (res.status === 403) {
         setStatus("rejected");
         return;
      }

      const data = await res.json();
      if (res.ok) {
        if (data.status === 'rejected') {
          setStatus("rejected");
        } else {
          setStatus("success");
        }
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="mt-24 pt-16 border-t border-[#2E4434]">
      <h3 className="font-display text-3xl font-medium mb-10 text-[#F5F0E6]">Thoughts?</h3>
      
      {/* Private Submission Form */}
      <div className="bg-[#243328] border border-[#2E4434] p-6 md:p-8 mb-16 relative">
        {status === 'success' ? (
          <div className="text-center py-8">
            <h4 className="font-mono text-[#C8956C] mb-2">Message received.</h4>
            <p className="text-[#8A9B8E] text-sm font-body">Your comment is currently pending security review.</p>
            <button onClick={() => setStatus('idle')} className="mt-6 editorial-link text-xs">Write another →</button>
          </div>
        ) : status === 'rejected' ? (
          <div className="text-center py-8">
            <h4 className="font-mono text-red-400 mb-2 mt-2 text-xl font-medium">Submission Blocked.</h4>
            <p className="text-[#8A9B8E] text-sm font-body">Your message violates community safety guidelines.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea 
              name="message"
              required 
              rows={3}
              className="w-full bg-transparent border-b border-[#2E4434] focus:border-[#C8956C] outline-none py-3 text-[#F5F0E6] font-body text-[15px] transition-colors resize-none mb-6 placeholder-[#8A9B8E]/50"
              placeholder="Drop a thought anonymously..."
            />
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] text-[#8A9B8E] uppercase tracking-widest hidden md:inline-block border border-[#2E4434] px-3 py-1 bg-[#1B2E1F]/50">Strictly Moderated</span>
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="editorial-link disabled:opacity-50 w-max"
              >
                {status === "loading" ? "SCANNING..." : "SUBMIT →"}
              </button>
            </div>
            {status === 'error' && <p className="text-red-400 text-xs mt-2 font-mono">Transmission failed. Try again.</p>}
          </form>
        )}
      </div>

      {/* Render Approved Comments */}
      <div className="flex flex-col gap-10">
        {comments.length === 0 ? (
          <p className="font-mono text-[13px] text-[#8A9B8E] opacity-80 pl-4 border-l border-[#2E4434]">No public thoughts yet. Be the first to break the ice.</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-5 items-start">
               {/* Anonymous Avatar Base */}
               <div className="w-10 h-10 rounded-sm bg-[#243328] border border-[#2E4434] flex items-center justify-center font-mono text-[#8A9B8E] shrink-0 text-xs font-medium">
                 AN
               </div>
               <div className="flex flex-col pt-1">
                 <div className="flex items-center gap-4 mb-2">
                   <span className="font-medium text-[15px] tracking-wide text-[#F5F0E6]">Anonymous</span>
                   <span className="font-mono text-[11px] text-[#8A9B8E]">{formatDate(comment.created_at)}</span>
                 </div>
                 <p className="font-body text-base text-[#c8c2b0] leading-[1.85]">
                   {comment.message}
                 </p>
               </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
