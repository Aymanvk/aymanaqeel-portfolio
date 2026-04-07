import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient(true); 

    // Validate authorization utilizing native cookies
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Auth context invalid' }, { status: 401 });
    }

    const { ipHash, reason } = await req.json();
    if (!ipHash) return NextResponse.json({ error: 'Missing IP metric target' }, { status: 400 });

    const { error } = await supabase
      .from('banned_ips')
      .insert({
        ip_hash: ipHash,
        reason: reason || 'Manual Administrator Intervention'
      });

    if (error) {
      // Typically a duplicate key violation if already banned
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Unknown server validation error' }, { status: 500 });
  }
}
