import { INCOMING_TRANSACTION_TYPES } from '@/constants/app';
import type { Transaction } from '@/types';

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function isIncomingTransaction(type: Transaction['type']): boolean {
  return (INCOMING_TRANSACTION_TYPES as readonly string[]).includes(type);
}

export function generateReferenceId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export function maskBalance(balance: number): string {
  return '••••••';
}

export function getInitials(name?: string | null): string {
  if (!name) return 'A';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' });
  }
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return date.toLocaleDateString('en-MY', { weekday: 'short' });
  return date.toLocaleDateString('en-MY', { day: 'numeric', month: 'short' });
}
