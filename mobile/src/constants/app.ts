export const APP_NAME = 'Athris';
export const ASSISTANT_NAME = 'Nova';
export const DEFAULT_CURRENCY = 'MYR';
export const CURRENCY_SYMBOL = 'RM';

export const PAYMENT_LINK_BASE = 'https://athris.app/pay';

export const SESSION_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

export const REWARDS_TIERS = ['bronze', 'silver', 'gold', 'platinum'] as const;

export const TRANSACTION_TYPE_LABELS: Record<string, string> = {
  credit: 'Credit',
  debit: 'Debit',
  transfer_in: 'Received',
  transfer_out: 'Sent',
  topup: 'Top Up',
  withdrawal: 'Withdrawal',
  payment: 'Payment',
  refund: 'Refund',
  reward: 'Reward',
};

export const INCOMING_TRANSACTION_TYPES = [
  'credit',
  'transfer_in',
  'topup',
  'refund',
  'reward',
] as const;
