import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import {
  getWallets,
  getTransactions,
  getCards,
  sendMoney,
  topUp,
} from '@/services/wallet.service';
import {
  mockRewards,
  mockSavingsGoals,
  mockNotifications,
  mockProfile,
} from '@/constants/mock-data';
import { config } from '@/lib/config';
import { supabase } from '@/lib/supabase';
import type { Rewards, SavingsGoal, Notification, Profile } from '@/types';

export function useWallets() {
  const userId = useAuthStore((s) => s.session?.userId);
  return useQuery({
    queryKey: ['wallets', userId],
    queryFn: () => getWallets(userId!),
    enabled: !!userId,
  });
}

export function useTransactions(limit = 50) {
  const userId = useAuthStore((s) => s.session?.userId);
  return useQuery({
    queryKey: ['transactions', userId, limit],
    queryFn: () => getTransactions(userId!, limit),
    enabled: !!userId,
  });
}

export function useCards() {
  const userId = useAuthStore((s) => s.session?.userId);
  return useQuery({
    queryKey: ['cards', userId],
    queryFn: () => getCards(userId!),
    enabled: !!userId,
  });
}

export function useRewards() {
  const userId = useAuthStore((s) => s.session?.userId);
  return useQuery({
    queryKey: ['rewards', userId],
    queryFn: async (): Promise<Rewards> => {
      if (config.demoMode || !supabase) return mockRewards;
      const { data } = await supabase
        .from('rewards')
        .select('*')
        .eq('user_id', userId!)
        .single();
      return data ?? mockRewards;
    },
    enabled: !!userId,
  });
}

export function useSavingsGoals() {
  const userId = useAuthStore((s) => s.session?.userId);
  return useQuery({
    queryKey: ['savings', userId],
    queryFn: async (): Promise<SavingsGoal[]> => {
      if (config.demoMode || !supabase) return mockSavingsGoals;
      const { data } = await supabase
        .from('savings_goals')
        .select('*')
        .eq('user_id', userId!);
      return data ?? [];
    },
    enabled: !!userId,
  });
}

export function useNotifications() {
  const userId = useAuthStore((s) => s.session?.userId);
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: async (): Promise<Notification[]> => {
      if (config.demoMode || !supabase) return mockNotifications;
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId!)
        .order('created_at', { ascending: false });
      return data ?? [];
    },
    enabled: !!userId,
  });
}

export function useProfile() {
  const userId = useAuthStore((s) => s.session?.userId);
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async (): Promise<Profile> => {
      if (config.demoMode || !supabase) return mockProfile;
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId!)
        .single();
      return data ?? mockProfile;
    },
    enabled: !!userId,
  });
}

export function useSendMoney() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.session?.userId);

  return useMutation({
    mutationFn: sendMoney,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets', userId] });
      queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
    },
  });
}

export function useTopUp() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.session?.userId);

  return useMutation({
    mutationFn: topUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets', userId] });
      queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
    },
  });
}
