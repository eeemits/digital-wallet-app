import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Building, Wallet } from 'lucide-react'
import Link from 'next/link'

export default async function WithdrawPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const { data: wallet } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_primary', true)
    .single()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
    }).format(amount)
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Withdraw</h1>
            <p className="text-muted-foreground">Transfer to your bank account</p>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="mb-6 gradient-primary text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Wallet className="size-6" />
              <div>
                <p className="text-sm text-white/80">Available Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(wallet?.balance || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="size-5" />
              Bank Transfer
            </CardTitle>
            <CardDescription>Withdraw funds to your linked bank account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Linked Bank Account</p>
              <p className="font-medium">No bank account linked</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">RM</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="text-sm text-muted-foreground bg-muted rounded-lg p-3">
              <p>Withdrawal fee: Free</p>
              <p>Processing time: 1-3 business days</p>
            </div>

            <Button className="w-full h-12" disabled>
              Link Bank Account to Withdraw
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
