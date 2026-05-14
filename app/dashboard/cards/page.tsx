/**
 * Cards page.
 *
 * Header renders immediately. Card grid streams in via Suspense.
 */
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CardsGridSkeleton } from '@/components/skeletons'
import { getCardsData } from '@/lib/data/queries'
import { CardsManager } from '@/components/dashboard/cards-manager'

// ─── Async data component ────────────────────────────────────────────────────

async function CardsContent({ userId }: { userId: string }) {
  const { cards, wallet } = await getCardsData(userId)
  return <CardsManager cards={cards} wallet={wallet} />
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function CardsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* ── Header — renders immediately ── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Cards</h1>
        <p className="text-muted-foreground">Manage your virtual and physical cards</p>
      </div>

      {/* ── Cards grid — streams in ── */}
      <Suspense fallback={<CardsGridSkeleton />}>
        <CardsContent userId={user.id} />
      </Suspense>
    </div>
  )
}
