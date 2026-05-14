'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ArrowLeft,
  Copy,
  Check,
  QrCode,
  Share2,
  Mail,
} from 'lucide-react'
import type { Profile } from '@/lib/types/database'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface ReceiveMoneyProps {
  user: User
  profile: Profile | null
}

export function ReceiveMoney({ user, profile }: ReceiveMoneyProps) {
  const [copied, setCopied] = useState(false)
  const [requestAmount, setRequestAmount] = useState('')

  const paymentLink = `https://athris.app/pay/${user.id.slice(0, 8)}`
  const paymentId = `ATHRIS-${user.id.slice(0, 8).toUpperCase()}`

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    const shareData = {
      title: 'Pay me on Athris',
      text: `Send me money on Athris! ${requestAmount ? `Amount requested: RM ${requestAmount}` : ''}`,
      url: paymentLink,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData)
    } else {
      handleCopy(paymentLink)
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
            <h1 className="text-2xl font-bold text-foreground">Receive Money</h1>
            <p className="text-muted-foreground">Share your payment details</p>
          </div>
        </div>

        {/* QR Code Card */}
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle>Your Payment QR Code</CardTitle>
            <CardDescription>Scan to pay {profile?.full_name || user.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {/* QR Code Placeholder */}
            <div className="w-48 h-48 bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed">
              <div className="text-center">
                <QrCode className="size-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">QR Code</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Payment ID</p>
              <p className="font-mono font-bold text-lg">{paymentId}</p>
            </div>
          </CardContent>
        </Card>

        {/* Request Amount */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Request Specific Amount</CardTitle>
            <CardDescription>Optional: Add an amount to your payment request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="amount" className="sr-only">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">RM</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={requestAmount}
                    onChange={(e) => setRequestAmount(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Share Payment Link</CardTitle>
            <CardDescription>Send your link via email or copy it directly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Payment Link */}
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={paymentLink}
                className="h-12 font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 flex-shrink-0"
                onClick={() => handleCopy(paymentLink)}
              >
                {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12" onClick={handleShare}>
                <Share2 className="size-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                className="h-12"
                onClick={() => {
                  const subject = encodeURIComponent('Pay me on Athris')
                  const body = encodeURIComponent(`Send me money on Athris!\n\nPayment Link: ${paymentLink}${requestAmount ? `\nAmount: RM ${requestAmount}` : ''}`)
                  window.open(`mailto:?subject=${subject}&body=${body}`)
                }}
              >
                <Mail className="size-4 mr-2" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
