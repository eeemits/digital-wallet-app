/**
 * Route-level loading state for the dashboard home.
 * Shows while the layout is still streaming in (first load only).
 * On subsequent navigations, the Suspense boundary inside page.tsx handles it.
 */
import {
    BalanceCardSkeleton,
    QuickActionsSkeleton,
    RecentTransactionsSkeleton,
    CardsPreviewSkeleton,
} from '@/components/skeletons'

export default function DashboardLoading() {
    return (
        <div className="p-4 md:p-6 space-y-6">
            <BalanceCardSkeleton />
            <QuickActionsSkeleton />
            <div className="grid gap-6 md:grid-cols-2">
                <RecentTransactionsSkeleton />
                <CardsPreviewSkeleton />
            </div>
        </div>
    )
}
