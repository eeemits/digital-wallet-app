import { create } from 'zustand';
import type { AuthSession } from '@/types';

type AuthState = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pinVerified: boolean;
  hasPin: boolean;
  biometricEnabled: boolean;
  setSession: (session: AuthSession | null) => void;
  setLoading: (loading: boolean) => void;
  setPinVerified: (verified: boolean) => void;
  setHasPin: (has: boolean) => void;
  setBiometricEnabled: (enabled: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isAuthenticated: false,
  isLoading: true,
  pinVerified: false,
  hasPin: false,
  biometricEnabled: false,
  setSession: (session) =>
    set({ session, isAuthenticated: !!session, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  setPinVerified: (pinVerified) => set({ pinVerified }),
  setHasPin: (hasPin) => set({ hasPin }),
  setBiometricEnabled: (biometricEnabled) => set({ biometricEnabled }),
  logout: () =>
    set({
      session: null,
      isAuthenticated: false,
      pinVerified: false,
    }),
}));
