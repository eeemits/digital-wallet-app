/**
 * Transactions page.
 *
 * The page shell (header + filters) renders immediately.
 * The stats and transaction table stream in via Suspense.
 */
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  TransactionStatsSkeleton,
  TransactionTableSkeleton,
} from '@/components/skeletons'
import { getTransactionsData } from '@/lib/data/queries'
import { TransactionsList } from '@/components/dashboard/transactions-list'

// ─── Async data component ────────────────────────────────────────────────────

async function TransactionsContent({ userId }: { userId: string }) {
  const { transactions, wallet } = await getTransactionsData(userId)
  return <TransactionsList transactions={transactions} wallet={wallet} />
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function TransactionsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* ── Header — renders immediately ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transaction history</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="size-4 mr-2" />
          Export
        </Button>
      </div>

      {/* ── Stats + table — stream in ── */}
      <Suspense
        fallback={
          <>
            <TransactionStatsSkeleton />
            <TransactionTableSkeleton />
          </>
        }
      >
        <TransactionsContent userId={user.id} />
      </Suspense>
    </div>
  )
}
