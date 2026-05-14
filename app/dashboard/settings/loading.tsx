import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function SettingsLoading() {
    return (
        <div className="p-4 md:p-6 space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Profile section */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-28" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="size-16 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-1.5">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Preferences section */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-28" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                            <Skeleton className="h-6 w-10 rounded-full" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
