import { CardsGridSkeleton } from '@/components/skeletons'

export default function CardsLoading() {
    return (
        <div className="p-4 md:p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">My Cards</h1>
                <p className="text-muted-foreground">Manage your virtual and physical cards</p>
            </div>
            <CardsGridSkeleton />
        </div>
    )
}
