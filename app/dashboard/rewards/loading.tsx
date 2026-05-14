import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function RewardsLoading() {
    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-36" />
                <Skeleton className="h-4 w-56" />
            </div>

            {/* Points summary */}
            <Card className="overflow-hidden border-0">
                <div className="p-6 bg-muted/40">
                    <div className="flex items-center justify-between mb-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                        <Skeleton className="h-8 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                    <Skeleton className="h-3 w-40 mt-2" />
                </div>
            </Card>

            {/* Rewards list */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-xl border">
                            <Skeleton className="size-10 rounded-full" />
                            <div className="flex-1 space-y-1.5">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
