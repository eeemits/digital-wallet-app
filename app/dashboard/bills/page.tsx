import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Receipt, Zap, Phone, Wifi, Droplets, ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'

const billCategories = [
  { name: 'Electricity', icon: Zap, description: 'TNB, SESB, SESCO' },
  { name: 'Water', icon: Droplets, description: 'Air Selangor, PAIP' },
  { name: 'Telco', icon: Phone, description: 'Prepaid & Postpaid' },
  { name: 'Internet', icon: Wifi, description: 'TM, Maxis, Celcom' },
]

export default function BillsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pay Bills</h1>
            <p className="text-muted-foreground">Pay your utility bills instantly</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Bill Categories</CardTitle>
            <CardDescription>Select a category to pay your bills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {billCategories.map((category) => (
                <button
                  key={category.name}
                  className="flex items-center gap-3 p-4 rounded-xl border hover:bg-muted transition-colors text-left"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <category.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Saved Billers</CardTitle>
            <CardDescription>Your frequently paid bills</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                <Receipt className="size-6 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              No saved billers yet. Pay a bill to save it here for quick access.
            </p>
            <Button variant="outline" size="sm">
              <Plus className="size-4 mr-2" />
              Add Biller
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
