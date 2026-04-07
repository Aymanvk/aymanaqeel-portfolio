'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) router.push('/admin');
    };
    checkSession();
  }, [router, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-[#243328] border border-[#2E4434] p-8 md:p-12">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-medium mb-2 text-[#F5F0E6]">Restricted Access</h1>
          <p className="font-mono text-xs text-[#8A9B8E] uppercase tracking-widest">System Administrator Only</p>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] text-[#8A9B8E] uppercase tracking-widest">Admin Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full bg-transparent border-b border-[#2E4434] focus:border-[#C8956C] outline-none py-2 text-[#F5F0E6] font-body text-base transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] text-[#8A9B8E] uppercase tracking-widest">Passphrase</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full bg-transparent border-b border-[#2E4434] focus:border-[#C8956C] outline-none py-2 text-[#F5F0E6] font-body text-base transition-colors"
            />
          </div>

          {error && <p className="text-red-400 font-mono text-xs mt-2">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="mt-6 w-full editorial-link justify-center py-4 disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "AUTHORIZE →"}
          </button>
        </form>
      </div>
    </div>
  );
}
