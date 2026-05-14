'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Receipt,
  Plus,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react'
import type { Wallet, Transaction, Card as CardType } from '@/lib/types/database'
import { useState } from 'react'
import { format } from 'date-fns'

interface DashboardHomeProps {
  wallet: Wallet | null
  transactions: Transaction[]
  cards: CardType[]
}

const quickActions = [
  { title: 'Send', icon: ArrowUpRight, href: '/dashboard/send', color: 'bg-blue-500' },
  { title: 'Receive', icon: ArrowDownLeft, href: '/dashboard/receive', color: 'bg-green-500' },
  { title: 'Scan QR', icon: QrCode, href: '/dashboard/scan', color: 'bg-purple-500' },
  { title: 'Pay Bills', icon: Receipt, href: '/dashboard/bills', color: 'bg-orange-500' },
]

export function DashboardHome({ wallet, transactions, cards }: DashboardHomeProps) {
  const [showBalance, setShowBalance] = useState(true)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
    }).format(amount)
  }

  const getTransactionIcon = (type: Transaction['type']) => {
    const isIncoming = ['credit', 'transfer_in', 'topup', 'refund', 'reward'].includes(type)
    return isIncoming ? (
      <div className="flex size-10 items-center justify-center rounded-full bg-success/10">
        <TrendingUp className="size-5 text-success" />
      </div>
    ) : (
      <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10">
        <TrendingDown className="size-5 text-destructive" />
      </div>
    )
  }

  const getTransactionAmount = (transaction: Transaction) => {
    const isIncoming = ['credit', 'transfer_in', 'topup', 'refund', 'reward'].includes(transaction.type)
    return (
      <span className={isIncoming ? 'text-success' : 'text-foreground'}>
        {isIncoming ? '+' : '-'}{formatCurrency(transaction.amount)}
      </span>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Balance Card */}
      <Card className="gradient-primary overflow-hidden border-0 shadow-lg py-0 text-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-white/80">Total Balance</p>
              <div className="flex items-center gap-3 mt-1">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {showBalance ? formatCurrency(wallet?.balance || 0) : '••••••'}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/80 hover:text-white hover:bg-white/20"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </Button>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
              {wallet?.currency || 'MYR'}
            </Badge>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
              <Link href="/dashboard/topup">
                <Plus className="size-4 mr-2" />
                Top Up
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
              <Link href="/dashboard/withdraw">
                Withdraw
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border hover:bg-accent transition-colors"
          >
            <div className={`flex size-12 items-center justify-center rounded-full ${action.color} text-white`}>
              <action.icon className="size-5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{action.title}</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/transactions" className="text-primary text-sm">
                View All
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No transactions yet</p>
                <p className="text-xs mt-1">Your transaction history will appear here</p>
              </div>
            ) : (
              transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-3">
                  {getTransactionIcon(transaction.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {transaction.description || transaction.merchant_name || transaction.type.replace('_', ' ')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(transaction.created_at), 'MMM d, h:mm a')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {getTransactionAmount(transaction)}
                    </p>
                    <Badge
                      variant={transaction.status === 'completed' ? 'secondary' : 'outline'}
                      className="text-[10px] px-1.5"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Cards Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">My Cards</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/cards" className="text-primary text-sm">
                Manage
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {cards.length === 0 ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-3">
                  <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                    <CreditCard className="size-6 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">No cards yet</p>
                <Button asChild size="sm">
                  <Link href="/dashboard/cards/new">
                    <Plus className="size-4 mr-2" />
                    Create Virtual Card
                  </Link>
                </Button>
              </div>
            ) : (
              cards.map((card) => (
                <div
                  key={card.id}
                  className="relative overflow-hidden rounded-xl p-4 gradient-primary text-white"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-xs text-white/70">Athris</p>
                      <p className="text-xs text-white/70 capitalize">{card.card_type} Card</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${card.status === 'active'
                        ? 'bg-white/20 text-white'
                        : 'bg-orange-500/20 text-orange-200'
                        }`}
                    >
                      {card.status}
                    </Badge>
                  </div>
                  <p className="font-mono text-lg tracking-wider mb-2">
                    •••• •••• •••• {card.card_number_last4}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-white/60">EXPIRES</p>
                      <p className="text-sm">{format(new Date(card.expires_at), 'MM/yy')}</p>
                    </div>
                    <CreditCard className="size-8 text-white/30" />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
