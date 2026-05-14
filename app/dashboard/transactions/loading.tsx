import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TransactionStatsSkeleton, TransactionTableSkeleton } from '@/components/skeletons'

export default function TransactionsLoading() {
    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
                    <p className="text-muted-foreground">View and manage your transaction history</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                    <Download className="size-4 mr-2" />
                    Export
                </Button>
            </div>
            <TransactionStatsSkeleton />
            <TransactionTableSkeleton />
        </div>
    )
}
