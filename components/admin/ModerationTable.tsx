'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Comment } from '@/types';
import { formatDate } from '@/lib/utils';

export default function ModerationTable({ initialComments }: { initialComments: Comment[] }) {
  const supabase = createClient();
  const [comments, setComments] = useState(initialComments);

  const handleUpdate = async (id: string, newStatus: string, ipHash: string) => {
    const { error } = await supabase.from('comments').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setComments(comments.map(c => c.id === id ? { ...c, status: newStatus as any } : c));
    } else {
      alert("Error updating status.");
    }
  };

  const handleBan = async (id: string, ipHash: string) => {
    const reason = prompt("Ban reason (optional):", "Malicious Intent / Toxicity Dashboard Ban");
    if (reason === null) return;

    await supabase.from('comments').update({ status: 'rejected' }).eq('id', id);
    
    const res = await fetch('/api/admin/ban', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ipHash, reason })
    });
    
    if (res.ok) {
       setComments(comments.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
       alert("Target hash fully restricted globally.");
    } else {
       alert("Ban execution failed.");
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="bg-[#243328] border border-[#2E4434] overflow-x-auto w-full max-w-[90vw]">
        <table className="w-full text-left font-body min-w-[800px]">
          <thead className="font-mono text-xs text-[#8A9B8E] uppercase tracking-widest border-b border-[#2E4434] bg-[#1B2E1F]">
            <tr>
              <th className="p-6 font-medium">Date</th>
              <th className="p-6 font-medium">Message & Target</th>
              <th className="p-6 font-medium">Security Validation</th>
              <th className="p-6 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className="border-b justify-start border-[#2E4434] last:border-0 hover:bg-[#2E4434]/30 transition-colors">
                <td className="p-6 align-top w-48 font-mono text-[11px] text-[#8A9B8E]">
                  {formatDate(comment.created_at)}
                </td>
                <td className="p-6 align-top w-[40%] text-[#F5F0E6] text-[15px] leading-relaxed">
                  <span className="font-mono text-[10px] uppercase text-[#C8956C] mb-2 block tracking-widest">
                    ID: {comment.id.split('-')[0]} // POST: {comment.post_id.split('-')[0]}
                  </span>
                  {comment.message}
                </td>
                <td className="p-6 align-top">
                  <div className="flex flex-col gap-3">
                    <span className={`w-max px-3 py-1 rounded-sm font-mono text-[10px] uppercase tracking-wider
                      ${comment.status === 'pending' ? 'bg-[#C8956C]/10 text-[#C8956C] border border-[#C8956C]/20' : ''}
                      ${comment.status === 'approved' ? 'bg-[#6B8F71]/15 text-[#8FBC8F] border border-[#6B8F71]/20' : ''}
                      ${comment.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : ''}
                    `}>
                      {comment.status}
                    </span>
                    {comment.perspective_score && (
                      <span className="font-mono text-[10px] text-[#8A9B8E] opacity-80">
                        P-SCORE: {comment.perspective_score.toFixed(3)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-6 align-top text-right">
                  <div className="flex flex-col gap-3 items-end">
                    {comment.status !== 'approved' && (
                      <button onClick={() => handleUpdate(comment.id, 'approved', comment.ip_hash)} className="font-mono text-[11px] text-[#8FBC8F] hover:underline font-medium tracking-widest uppercase">Approve</button>
                    )}
                    {comment.status !== 'rejected' && (
                      <button onClick={() => handleUpdate(comment.id, 'rejected', comment.ip_hash)} className="font-mono text-[11px] text-red-400 hover:underline font-medium tracking-widest uppercase mt-1">Reject</button>
                    )}
                    {comment.status !== 'approved' && (
                       <button onClick={() => handleBan(comment.id, comment.ip_hash)} className="font-mono text-[10px] text-[#8A9B8E] mt-3 border border-[#2E4434] px-3 py-1.5 hover:border-red-400 hover:text-red-400 transition-colors bg-[#1B2E1F]">GLOBALLY BAN IP HASH</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {comments.length === 0 && (
          <div className="p-12 text-center text-[#8A9B8E] font-mono text-sm tracking-widest uppercase">
             Queue is definitively clean.
          </div>
        )}
      </div>
    </div>
  );
}
