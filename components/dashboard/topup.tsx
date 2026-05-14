'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ArrowLeft,
  Plus,
  Wallet,
  CreditCard,
  Building,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import type { Wallet as WalletType } from '@/lib/types/database'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface TopUpProps {
  wallet: WalletType | null
}

type Step = 'amount' | 'method' | 'processing' | 'success' | 'error'

const paymentMethods = [
  { id: 'card', name: 'Debit/Credit Card', icon: CreditCard, description: 'Visa, Mastercard' },
  { id: 'bank', name: 'Online Banking', icon: Building, description: 'FPX, DuitNow' },
]

export function TopUp({ wallet }: TopUpProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('amount')
  const [amount, setAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: wallet?.currency || 'MYR',
    }).format(value)
  }

  const quickAmounts = [50, 100, 200, 500, 1000]

  const handleTopUp = async () => {
    setStep('processing')
    setIsLoading(true)
    setError(null)

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      const supabase = createClient()
      const parsedAmount = parseFloat(amount)

      // Create transaction
      const { error: txError } = await supabase.from('transactions').insert({
        wallet_id: wallet?.id,
        type: 'topup',
        amount: parsedAmount,
        balance_after: (wallet?.balance || 0) + parsedAmount,
        description: `Top up via ${selectedMethod === 'card' ? 'Card' : 'Online Banking'}`,
        status: 'completed',
        reference_id: `TOP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      })

      if (txError) throw txError

      // Update wallet balance
      const { error: walletError } = await supabase
        .from('wallets')
        .update({ balance: (wallet?.balance || 0) + parsedAmount })
        .eq('id', wallet?.id)

      if (walletError) throw walletError

      setStep('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to top up')
      setStep('error')
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-2xl font-bold text-foreground">Top Up</h1>
            <p className="text-muted-foreground">Add funds to your wallet</p>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="mb-6 gradient-primary text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Wallet className="size-6" />
              <div>
                <p className="text-sm text-white/80">Current Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(wallet?.balance || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {step === 'amount' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <Plus className="size-4 text-primary" />
                </div>
                Enter Amount
              </CardTitle>
              <CardDescription>How much would you like to add?</CardDescription>
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

              <Button
                className="w-full h-12"
                onClick={() => setStep('method')}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'method' && (
          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
              <CardDescription>Choose how you want to top up {formatCurrency(parseFloat(amount))}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`flex size-12 items-center justify-center rounded-full ${
                    selectedMethod === method.id ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    <method.icon className="size-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </button>
              ))}

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 h-12" onClick={() => setStep('amount')}>
                  Back
                </Button>
                <Button
                  className="flex-1 h-12"
                  onClick={handleTopUp}
                  disabled={!selectedMethod}
                >
                  Top Up {formatCurrency(parseFloat(amount))}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'processing' && (
          <Card className="text-center">
            <CardContent className="pt-8 pb-6 space-y-4">
              <div className="flex justify-center">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Wallet className="size-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Processing Payment</h3>
                <p className="text-muted-foreground">Please wait while we process your top up...</p>
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
                <h3 className="text-xl font-bold mb-1">Top Up Successful!</h3>
                <p className="text-muted-foreground">
                  {formatCurrency(parseFloat(amount))} has been added to your wallet
                </p>
              </div>
              <div className="bg-muted rounded-xl p-4">
                <p className="text-sm text-muted-foreground">New Balance</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency((wallet?.balance || 0) + parseFloat(amount))}
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Button className="w-full" onClick={() => router.push('/dashboard')}>
                  Back to Dashboard
                </Button>
                <Button variant="outline" className="w-full" onClick={() => {
                  setStep('amount')
                  setAmount('')
                  setSelectedMethod(null)
                }}>
                  Top Up Again
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
                <h3 className="text-xl font-bold mb-1">Top Up Failed</h3>
                <p className="text-muted-foreground">{error}</p>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <Button className="w-full" onClick={() => setStep('method')}>
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
