import { config, isSupabaseConfigured } from '@/lib/config';
import { generateReferenceId } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import {
  mockCards,
  mockTransactions,
  mockWallets,
  DEMO_USER,
} from '@/constants/mock-data';
import type { Card, Transaction, Wallet } from '@/types';

export async function getWallets(userId: string): Promise<Wallet[]> {
  if (config.demoMode || !isSupabaseConfigured()) {
    return mockWallets;
  }
  const { data, error } = await supabase!
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .order('is_primary', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPrimaryWallet(userId: string): Promise<Wallet | null> {
  const wallets = await getWallets(userId);
  return wallets.find((w) => w.is_primary) ?? wallets[0] ?? null;
}

export async function getTransactions(
  userId: string,
  limit = 50
): Promise<Transaction[]> {
  if (config.demoMode || !isSupabaseConfigured()) {
    return mockTransactions.slice(0, limit);
  }
  const { data: wallets } = await supabase!
    .from('wallets')
    .select('id')
    .eq('user_id', userId);
  const walletIds = wallets?.map((w) => w.id) ?? [];
  const { data, error } = await supabase!
    .from('transactions')
    .select('*')
    .in('wallet_id', walletIds)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function getCards(userId: string): Promise<Card[]> {
  if (config.demoMode || !isSupabaseConfigured()) {
    return mockCards;
  }
  const { data: wallets } = await supabase!
    .from('wallets')
    .select('id')
    .eq('user_id', userId);
  const walletIds = wallets?.map((w) => w.id) ?? [];
  const { data, error } = await supabase!
    .from('cards')
    .select('*')
    .in('wallet_id', walletIds);
  if (error) throw error;
  return data ?? [];
}

export async function sendMoney(params: {
  userId: string;
  walletId: string;
  amount: number;
  recipient: string;
  note?: string;
}): Promise<Transaction> {
  if (config.demoMode || !isSupabaseConfigured()) {
    const wallet = mockWallets.find((w) => w.id === params.walletId)!;
    const newBalance = wallet.balance - params.amount;
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      wallet_id: params.walletId,
      type: 'transfer_out',
      amount: params.amount,
      balance_after: newBalance,
      description: params.note ?? `To ${params.recipient}`,
      category: 'transfer',
      merchant_name: null,
      reference_id: generateReferenceId('TXN'),
      status: 'completed',
      metadata: { recipient: params.recipient },
      created_at: new Date().toISOString(),
    };
    wallet.balance = newBalance;
    mockTransactions.unshift(tx);
    return tx;
  }

  const { data: wallet } = await supabase!
    .from('wallets')
    .select('*')
    .eq('id', params.walletId)
    .single();

  if (!wallet || wallet.balance < params.amount) {
    throw new Error('Insufficient balance');
  }

  const newBalance = wallet.balance - params.amount;
  const { data: tx, error: txError } = await supabase!
    .from('transactions')
    .insert({
      wallet_id: params.walletId,
      type: 'transfer_out',
      amount: params.amount,
      balance_after: newBalance,
      description: params.note ?? `To ${params.recipient}`,
      status: 'completed',
      reference_id: generateReferenceId('TXN'),
    })
    .select()
    .single();

  if (txError) throw txError;

  await supabase!
    .from('wallets')
    .update({ balance: newBalance })
    .eq('id', params.walletId);

  return tx;
}

export async function topUp(params: {
  walletId: string;
  amount: number;
}): Promise<Transaction> {
  if (config.demoMode || !isSupabaseConfigured()) {
    const wallet = mockWallets.find((w) => w.id === params.walletId)!;
    const newBalance = wallet.balance + params.amount;
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      wallet_id: params.walletId,
      type: 'topup',
      amount: params.amount,
      balance_after: newBalance,
      description: 'Mobile top up',
      category: 'topup',
      merchant_name: null,
      reference_id: generateReferenceId('TOP'),
      status: 'completed',
      metadata: {},
      created_at: new Date().toISOString(),
    };
    wallet.balance = newBalance;
    mockTransactions.unshift(tx);
    return tx;
  }

  const { data: wallet } = await supabase!
    .from('wallets')
    .select('*')
    .eq('id', params.walletId)
    .single();

  if (!wallet) throw new Error('Wallet not found');

  const newBalance = wallet.balance + params.amount;
  const { data: tx, error } = await supabase!
    .from('transactions')
    .insert({
      wallet_id: params.walletId,
      type: 'topup',
      amount: params.amount,
      balance_after: newBalance,
      description: 'Top up',
      status: 'completed',
      reference_id: generateReferenceId('TOP'),
    })
    .select()
    .single();

  if (error) throw error;

  await supabase!.from('wallets').update({ balance: newBalance }).eq('id', params.walletId);
  return tx;
}

export { DEMO_USER };
