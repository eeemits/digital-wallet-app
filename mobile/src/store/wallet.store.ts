import { create } from 'zustand';
import type { Wallet } from '@/types';

type WalletState = {
  showBalance: boolean;
  selectedWalletId: string | null;
  toggleBalanceVisibility: () => void;
  setSelectedWallet: (id: string | null) => void;
};

export const useWalletStore = create<WalletState>((set) => ({
  showBalance: true,
  selectedWalletId: null,
  toggleBalanceVisibility: () => set((s) => ({ showBalance: !s.showBalance })),
  setSelectedWallet: (selectedWalletId) => set({ selectedWalletId }),
}));

export function getTotalBalance(wallets: Wallet[]): number {
  return wallets.reduce((sum, w) => sum + w.balance, 0);
}
