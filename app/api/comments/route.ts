import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { hashIP } from '@/lib/utils';
import { evaluateComment } from '@/lib/moderation';

export async function POST(req: Request) {
  try {
    const { postId, message } = await req.json();
    if (!postId || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    // Using Service Role configuration exclusively for server inserts bypassing public RLS limit
    const supabase = createServerSupabaseClient(true);
    
    // Hash IP securely mapping X-Forwarded-For typically populated by Vercel
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const hashedIp = hashIP(ip);

    // 1. Fast fail if IP is banned
    const { data: bannedData } = await supabase
      .from('banned_ips')
      .select('id')
      .eq('ip_hash', hashedIp)
      .single();

    if (bannedData) {
      return NextResponse.json({ error: 'Action not allowed' }, { status: 403 });
    }

    // 2. Evaluate toxicity score dynamically
    const { isClean, score } = await evaluateComment(message);
    const status = isClean ? 'pending' : 'rejected';

    // 3. Persist Comment
    const { error: insertError } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        message: message,
        status: status,
        ip_hash: hashedIp,
        perspective_score: score
      });

    if (insertError) {
      // Supabase validation crash (e.g. invalid UUID)
      return NextResponse.json({ error: 'Failed to insert comment' }, { status: 400 });
    }

    return NextResponse.json({ success: true, status }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
