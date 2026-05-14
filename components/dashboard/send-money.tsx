'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowUpRight,
  ArrowLeft,
  User,
  Wallet,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import type { Wallet as WalletType } from '@/lib/types/database'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface SendMoneyProps {
  wallet: WalletType | null
}

type Step = 'recipient' | 'amount' | 'confirm' | 'success' | 'error'

export function SendMoney({ wallet }: SendMoneyProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('recipient')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: wallet?.currency || 'MYR',
    }).format(value)
  }

  const handleSend = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // In a real app, you would:
      // 1. Validate recipient exists
      // 2. Create a transfer record
      // 3. Update both wallets in a transaction
      
      // For demo, we'll create a transaction and update the wallet
      const parsedAmount = parseFloat(amount)
      
      if (parsedAmount > (wallet?.balance || 0)) {
        throw new Error('Insufficient balance')
      }

      // Create outgoing transaction
      const { error: txError } = await supabase.from('transactions').insert({
        wallet_id: wallet?.id,
        type: 'transfer_out',
        amount: parsedAmount,
        balance_after: (wallet?.balance || 0) - parsedAmount,
        description: note || `Transfer to ${recipientEmail}`,
        status: 'completed',
        reference_id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      })

      if (txError) throw txError

      // Update wallet balance
      const { error: walletError } = await supabase
        .from('wallets')
        .update({ balance: (wallet?.balance || 0) - parsedAmount })
        .eq('id', wallet?.id)

      if (walletError) throw walletError

      setStep('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send money')
      setStep('error')
    } finally {
      setIsLoading(false)
    }
  }

  const quickAmounts = [50, 100, 200, 500]

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
            <h1 className="text-2xl font-bold text-foreground">Send Money</h1>
            <p className="text-muted-foreground">Transfer funds securely</p>
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

        {step === 'recipient' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="size-4 text-primary" />
                </div>
                Recipient Details
              </CardTitle>
              <CardDescription>Enter the recipient&apos;s email address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="recipient@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button
                className="w-full h-12"
                onClick={() => setStep('amount')}
                disabled={!recipientEmail || !recipientEmail.includes('@')}
              >
                Continue
                <ArrowUpRight className="size-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'amount' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <Wallet className="size-4 text-primary" />
                </div>
                Enter Amount
              </CardTitle>
              <CardDescription>How much would you like to send?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl text-muted-foreground">RM</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-4xl font-bold h-16 text-center border-0 bg-transparent focus-visible:ring-0 w-48"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                  >
                    RM {quickAmount}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note (optional)</Label>
                <Textarea
                  id="note"
                  placeholder="What's this for?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-12" onClick={() => setStep('recipient')}>
                  Back
                </Button>
                <Button
                  className="flex-1 h-12"
                  onClick={() => setStep('confirm')}
                  disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > (wallet?.balance || 0)}
                >
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'confirm' && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Transfer</CardTitle>
              <CardDescription>Review the details before sending</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To</span>
                  <span className="font-medium">{recipientEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-lg">{formatCurrency(parseFloat(amount))}</span>
                </div>
                {note && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Note</span>
                    <span className="text-right max-w-[200px] truncate">{note}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-muted-foreground">Fee</span>
                  <span className="text-success font-medium">Free</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-12" onClick={() => setStep('amount')}>
                  Back
                </Button>
                <Button
                  className="flex-1 h-12"
                  onClick={handleSend}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'success' && (
          <Card className="text-center">
            <CardContent className="pt-8 pb-6 space-y-4">
              <div className="flex justify-center">
                <div className="size-16 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="size-8 text-success" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Transfer Successful!</h3>
                <p className="text-muted-foreground">
                  {formatCurrency(parseFloat(amount))} sent to {recipientEmail}
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <Button className="w-full" onClick={() => router.push('/dashboard')}>
                  Back to Dashboard
                </Button>
                <Button variant="outline" className="w-full" onClick={() => {
                  setStep('recipient')
                  setRecipientEmail('')
                  setAmount('')
                  setNote('')
                }}>
                  Send Another
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'error' && (
          <Card className="text-center">
            <CardContent className="pt-8 pb-6 space-y-4">
              <div className="flex justify-center">
                <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="size-8 text-destructive" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Transfer Failed</h3>
                <p className="text-muted-foreground">{error}</p>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <Button className="w-full" onClick={() => setStep('confirm')}>
                  Try Again
                </Button>
                <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard')}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
