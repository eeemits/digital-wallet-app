import { create } from 'zustand';
import type { NPCMessage } from '@/types';

type NPCState = {
  messages: NPCMessage[];
  isTyping: boolean;
  addMessage: (message: NPCMessage) => void;
  setTyping: (typing: boolean) => void;
  clearMessages: () => void;
};

export const useNPCStore = create<NPCState>((set) => ({
  messages: [],
  isTyping: false,
  addMessage: (message) =>
    set((s) => ({ messages: [...s.messages, message] })),
  setTyping: (isTyping) => set({ isTyping }),
  clearMessages: () => set({ messages: [] }),
}));
