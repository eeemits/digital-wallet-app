import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function SavingsLoading() {
    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-36" />
                    <Skeleton className="h-4 w-52" />
                </div>
                <Skeleton className="h-9 w-32" />
            </div>

            {/* Summary card */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-12 rounded-full" />
                        <div className="space-y-1.5">
                            <Skeleton className="h-3 w-28" />
                            <Skeleton className="h-7 w-36" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Goals */}
            <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <Skeleton className="h-2 w-full rounded-full" />
                            <Skeleton className="h-3 w-28" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
