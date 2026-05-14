'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  ShoppingBag,
  Receipt,
  Gift,
  CreditCard,
} from 'lucide-react'
import type { Transaction, Wallet } from '@/lib/types/database'
import { format } from 'date-fns'

interface TransactionsListProps {
  transactions: Transaction[]
  wallet: Wallet | null
}

const transactionTypeLabels: Record<Transaction['type'], string> = {
  credit: 'Credit',
  debit: 'Debit',
  transfer_in: 'Received',
  transfer_out: 'Sent',
  topup: 'Top Up',
  withdrawal: 'Withdrawal',
  payment: 'Payment',
  refund: 'Refund',
  reward: 'Reward',
}

const transactionTypeIcons: Record<Transaction['type'], typeof TrendingUp> = {
  credit: TrendingUp,
  debit: TrendingDown,
  transfer_in: ArrowDownLeft,
  transfer_out: ArrowUpRight,
  topup: TrendingUp,
  withdrawal: TrendingDown,
  payment: ShoppingBag,
  refund: RefreshCw,
  reward: Gift,
}

export function TransactionsList({ transactions, wallet }: TransactionsListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: wallet?.currency || 'MYR',
    }).format(amount)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.merchant_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const isIncoming = (type: Transaction['type']) => {
    return ['credit', 'transfer_in', 'topup', 'refund', 'reward'].includes(type)
  }

  const getTransactionIcon = (type: Transaction['type']) => {
    const Icon = transactionTypeIcons[type]
    const incoming = isIncoming(type)
    return (
      <div className={`flex size-10 items-center justify-center rounded-full ${
        incoming ? 'bg-success/10' : 'bg-muted'
      }`}>
        <Icon className={`size-5 ${incoming ? 'text-success' : 'text-muted-foreground'}`} />
      </div>
    )
  }

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = format(new Date(transaction.created_at), 'yyyy-MM-dd')
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(transaction)
    return groups
  }, {} as Record<string, Transaction[]>)

  const totalIncome = transactions
    .filter(t => isIncoming(t.type) && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => !isIncoming(t.type) && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transaction history</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="size-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-success/10">
                <TrendingUp className="size-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-xl font-bold text-success">{formatCurrency(totalIncome)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10">
                <TrendingDown className="size-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(totalExpense)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(wallet?.balance || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="size-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="transfer_in">Received</SelectItem>
                <SelectItem value="transfer_out">Sent</SelectItem>
                <SelectItem value="topup">Top Up</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="reward">Reward</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {filteredTransactions.length} Transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="size-16 rounded-full bg-muted flex items-center justify-center">
                  <Receipt className="size-8 text-muted-foreground" />
                </div>
              </div>
              <p className="text-muted-foreground mb-2">No transactions found</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Your transactions will appear here'}
              </p>
            </div>
          ) : (
            Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
              <div key={date}>
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                </p>
                <div className="space-y-3">
                  {dayTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      {getTransactionIcon(transaction.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {transaction.description || 
                           transaction.merchant_name || 
                           transactionTypeLabels[transaction.type]}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(transaction.created_at), 'h:mm a')}
                          </p>
                          {transaction.category && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <p className="text-xs text-muted-foreground capitalize">
                                {transaction.category}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          isIncoming(transaction.type) ? 'text-success' : 'text-foreground'
                        }`}>
                          {isIncoming(transaction.type) ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <Badge
                          variant={
                            transaction.status === 'completed' ? 'secondary' :
                            transaction.status === 'pending' ? 'outline' :
                            'destructive'
                          }
                          className="text-[10px] px-1.5 mt-1"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
