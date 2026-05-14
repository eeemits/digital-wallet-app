/**
 * Rewards page.
 *
 * Header renders immediately. Points overview + rewards list stream in.
 */
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { RewardsOverviewSkeleton, RewardsListSkeleton } from '@/components/skeletons'
import { getRewardsData } from '@/lib/data/queries'
import { RewardsCenter } from '@/components/dashboard/rewards-center'

// ─── Async data component ────────────────────────────────────────────────────

async function RewardsContent({ userId }: { userId: string }) {
  const { rewards } = await getRewardsData(userId)
  return <RewardsCenter rewards={rewards} />
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function RewardsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* ── Header — renders immediately ── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Rewards</h1>
        <p className="text-muted-foreground">Earn points and unlock exclusive benefits</p>
      </div>

      {/* ── Content — streams in ── */}
      <Suspense
        fallback={
          <>
            <RewardsOverviewSkeleton />
            <RewardsListSkeleton />
          </>
        }
      >
        <RewardsContent userId={user.id} />
      </Suspense>
    </div>
  )
}
