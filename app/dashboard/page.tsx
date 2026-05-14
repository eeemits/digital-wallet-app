/**
 * Dashboard home page.
 *
 * Renders the page shell immediately. Data sections stream in via Suspense.
 * The route transition is instant — no blocking awaits at the page level.
 */
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
  BalanceCardSkeleton,
  QuickActionsSkeleton,
  RecentTransactionsSkeleton,
  CardsPreviewSkeleton,
} from '@/components/skeletons'
import { getDashboardData } from '@/lib/data/queries'
import { DashboardHome } from '@/components/dashboard/dashboard-home'

// ─── Async data component ────────────────────────────────────────────────────

async function DashboardContent({ userId }: { userId: string }) {
  const { wallet, transactions, cards } = await getDashboardData(userId)
  return <DashboardHome wallet={wallet} transactions={transactions} cards={cards} />
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    // Suspense wraps the entire content — the loading.tsx skeleton shows
    // instantly while DashboardContent fetches data.
    <Suspense
      fallback={
        <div className="p-4 md:p-6 space-y-6">
          <BalanceCardSkeleton />
          <QuickActionsSkeleton />
          <div className="grid gap-6 md:grid-cols-2">
            <RecentTransactionsSkeleton />
            <CardsPreviewSkeleton />
          </div>
        </div>
      }
    >
      <DashboardContent userId={user.id} />
    </Suspense>
  )
}
