/**
 * Savings page.
 *
 * Header renders immediately. Overview stats + goals grid stream in.
 */
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SavingsOverviewSkeleton, SavingsGoalsSkeleton } from '@/components/skeletons'
import { getSavingsData } from '@/lib/data/queries'
import { SavingsGoals } from '@/components/dashboard/savings-goals'

// ─── Async data component ────────────────────────────────────────────────────

async function SavingsContent({ userId }: { userId: string }) {
  const { goals, wallet } = await getSavingsData(userId)
  return <SavingsGoals goals={goals} wallet={wallet} userId={userId} />
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function SavingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* ── Header — renders immediately ── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Savings Goals</h1>
        <p className="text-muted-foreground">Track your progress towards financial goals</p>
      </div>

      {/* ── Content — streams in ── */}
      <Suspense
        fallback={
          <>
            <SavingsOverviewSkeleton />
            <SavingsGoalsSkeleton />
          </>
        }
      >
        <SavingsContent userId={user.id} />
      </Suspense>
    </div>
  )
}
