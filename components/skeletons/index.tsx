/**
 * Reusable skeleton components used as Suspense fallbacks.
 * Kept as server components (no "use client") — pure markup.
 */
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// ─── Dashboard home ──────────────────────────────────────────────────────────

export function BalanceCardSkeleton() {
    return (
        <div className="rounded-2xl bg-muted/40 p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-48" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
            </div>
            <div className="flex gap-3">
                <Skeleton className="h-8 w-24 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-md" />
            </div>
        </div>
    )
}

export function QuickActionsSkeleton() {
    return (
        <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-2xl border">
                    <Skeleton className="size-12 rounded-full" />
                    <Skeleton className="h-3 w-12" />
                </div>
            ))}
        </div>
    )
}

export function RecentTransactionsSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-8 w-16" />
            </CardHeader>
            <CardContent className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="size-10 rounded-full" />
                        <div className="flex-1 space-y-1.5">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                        <div className="space-y-1.5 text-right">
                            <Skeleton className="h-4 w-16 ml-auto" />
                            <Skeleton className="h-4 w-12 ml-auto" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export function CardsPreviewSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-8 w-16" />
            </CardHeader>
            <CardContent className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="rounded-xl bg-muted/40 p-4 space-y-4">
                        <div className="flex justify-between">
                            <div className="space-y-1.5">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <Skeleton className="h-6 w-14 rounded-full" />
                        </div>
                        <Skeleton className="h-6 w-48" />
                        <div className="flex justify-between">
                            <div className="space-y-1">
                                <Skeleton className="h-2 w-12" />
                                <Skeleton className="h-4 w-10" />
                            </div>
                            <Skeleton className="size-8 rounded" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

// ─── Transactions page ───────────────────────────────────────────────────────

export function TransactionStatsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-10 rounded-full" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-6 w-28" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export function TransactionTableSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-40 mb-2" />
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl">
                        <Skeleton className="size-10 rounded-full" />
                        <div className="flex-1 space-y-1.5">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/3" />
                        </div>
                        <div className="text-right space-y-1.5">
                            <Skeleton className="h-4 w-20 ml-auto" />
                            <Skeleton className="h-4 w-14 ml-auto" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

// ─── Cards page ──────────────────────────────────────────────────────────────

export function CardsGridSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <div className="p-6 bg-muted/40 space-y-6">
                        <div className="flex justify-between">
                            <div className="space-y-1.5">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <Skeleton className="h-6 w-14 rounded-full" />
                        </div>
                        <Skeleton className="h-6 w-48" />
                        <div className="flex justify-between">
                            <div className="space-y-1">
                                <Skeleton className="h-2 w-12" />
                                <Skeleton className="h-4 w-10" />
                            </div>
                            <Skeleton className="size-8 rounded" />
                        </div>
                    </div>
                    <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-6 w-10 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-40" />
                        <div className="flex gap-2">
                            <Skeleton className="h-9 flex-1" />
                            <Skeleton className="h-9 flex-1" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

// ─── Savings page ────────────────────────────────────────────────────────────

export function SavingsOverviewSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-10 rounded-full" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-3 w-28" />
                                <Skeleton className="h-7 w-36" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export function SavingsGoalsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-3">
                                <Skeleton className="size-10 rounded-full" />
                                <div className="space-y-1.5">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-2 w-full rounded-full" />
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-9 w-full" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

// ─── Rewards page ────────────────────────────────────────────────────────────

export function RewardsOverviewSkeleton() {
    return (
        <Card className="overflow-hidden">
            <div className="p-6 bg-muted/40 space-y-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                    <Skeleton className="size-16 rounded-full" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-3 w-40" />
            </div>
            <CardContent className="p-4">
                <div className="flex justify-between items-center">
                    <div className="space-y-1.5">
                        <Skeleton className="h-3 w-36" />
                        <Skeleton className="h-5 w-28" />
                    </div>
                    <Skeleton className="h-9 w-24" />
                </div>
            </CardContent>
        </Card>
    )
}

export function RewardsListSkeleton() {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, col) => (
                <Card key={col}>
                    <CardHeader>
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-4 w-48" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl border">
                                <Skeleton className="size-12 rounded-full" />
                                <div className="flex-1 space-y-1.5">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                                <div className="text-right space-y-1">
                                    <Skeleton className="h-4 w-12 ml-auto" />
                                    <Skeleton className="h-3 w-10 ml-auto" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

// ─── Settings page ───────────────────────────────────────────────────────────

export function SettingsSkeleton() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-44" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Skeleton className="size-20 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-9 w-28" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="space-y-1.5">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </div>
                    <Skeleton className="h-10 w-28" />
                </CardContent>
            </Card>
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-40" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Array.from({ length: 3 }).map((_, j) => (
                            <div key={j} className="flex items-center justify-between py-2 border-b last:border-0">
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-36" />
                                    <Skeleton className="h-3 w-48" />
                                </div>
                                <Skeleton className="h-6 w-10 rounded-full" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
