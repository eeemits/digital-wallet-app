/**
 * Centralised server-side data fetching functions.
 * Each function creates its own Supabase client so they can be called
 * independently inside Suspense boundaries without sharing state.
 */
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// ─── Auth helper ────────────────────────────────────────────────────────────

export async function getAuthUser() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) redirect('/auth/login')
    return { supabase, user }
}

// ─── Dashboard home ──────────────────────────────────────────────────────────

export async function getDashboardData(userId: string) {
    const supabase = await createClient()

    const { data: wallets } = await supabase
        .from('wallets')
        .select('id, is_primary')
        .eq('user_id', userId)

    const primaryWalletId = wallets?.find((w) => w.is_primary)?.id ?? ''
    const allWalletIds = wallets?.map((w) => w.id) ?? []

    const [walletResult, transactionsResult, cardsResult] = await Promise.all([
        supabase.from('wallets').select('*').eq('id', primaryWalletId).single(),
        supabase
            .from('transactions')
            .select('*')
            .eq('wallet_id', primaryWalletId)
            .order('created_at', { ascending: false })
            .limit(10),
        supabase
            .from('cards')
            .select('*')
            .in('wallet_id', allWalletIds)
            .limit(3),
    ])

    return {
        wallet: walletResult.data,
        transactions: transactionsResult.data ?? [],
        cards: cardsResult.data ?? [],
    }
}

// ─── Transactions ────────────────────────────────────────────────────────────

export async function getTransactionsData(userId: string) {
    const supabase = await createClient()

    const { data: wallets } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)

    const walletIds = wallets?.map((w) => w.id) ?? []
    const wallet = wallets?.find((w) => w.is_primary) ?? null

    const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .in('wallet_id', walletIds)
        .order('created_at', { ascending: false })
        .limit(100)

    return { transactions: transactions ?? [], wallet }
}

// ─── Cards ───────────────────────────────────────────────────────────────────

export async function getCardsData(userId: string) {
    const supabase = await createClient()

    const { data: wallets } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)

    const walletIds = wallets?.map((w) => w.id) ?? []
    const primaryWallet = wallets?.find((w) => w.is_primary) ?? null

    const { data: cards } = await supabase
        .from('cards')
        .select('*')
        .in('wallet_id', walletIds)
        .order('created_at', { ascending: false })

    return { cards: cards ?? [], wallet: primaryWallet }
}

// ─── Savings ─────────────────────────────────────────────────────────────────

export async function getSavingsData(userId: string) {
    const supabase = await createClient()

    const [goalsResult, walletResult] = await Promise.all([
        supabase
            .from('savings_goals')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false }),
        supabase
            .from('wallets')
            .select('*')
            .eq('user_id', userId)
            .eq('is_primary', true)
            .single(),
    ])

    return {
        goals: goalsResult.data ?? [],
        wallet: walletResult.data,
    }
}

// ─── Rewards ─────────────────────────────────────────────────────────────────

export async function getRewardsData(userId: string) {
    const supabase = await createClient()
    const { data: rewards } = await supabase
        .from('rewards')
        .select('*')
        .eq('user_id', userId)
        .single()
    return { rewards }
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettingsData(userId: string) {
    const supabase = await createClient()
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    return { profile }
}
