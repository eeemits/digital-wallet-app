import { config, isSupabaseConfigured } from '@/lib/config';
import { supabase } from '@/lib/supabase';
import { DEMO_USER } from '@/constants/mock-data';
import type { AuthSession } from '@/types';

export async function signIn(email: string, password: string): Promise<AuthSession> {
  if (config.demoMode || !isSupabaseConfigured()) {
    return {
      userId: DEMO_USER.id,
      email: email || DEMO_USER.email,
      fullName: DEMO_USER.fullName,
    };
  }

  const { data, error } = await supabase!.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!data.user) throw new Error('Sign in failed');

  return {
    userId: data.user.id,
    email: data.user.email ?? email,
    fullName: data.user.user_metadata?.full_name,
  };
}

export async function signUp(
  email: string,
  password: string,
  fullName: string
): Promise<void> {
  if (config.demoMode || !isSupabaseConfigured()) return;

  const { error } = await supabase!.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    await supabase.auth.signOut();
  }
}

export async function getSession(): Promise<AuthSession | null> {
  if (config.demoMode || !isSupabaseConfigured()) return null;

  const { data } = await supabase!.auth.getSession();
  if (!data.session?.user) return null;

  return {
    userId: data.session.user.id,
    email: data.session.user.email ?? '',
    fullName: data.session.user.user_metadata?.full_name,
  };
}
