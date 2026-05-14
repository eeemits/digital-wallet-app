'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  CreditCard,
  Plus,
  Snowflake,
  Settings,
  Trash2,
  Eye,
  EyeOff,
  Globe,
  Wallet,
} from 'lucide-react'
import type { Card as CardType, Wallet as WalletType } from '@/lib/types/database'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface CardsManagerProps {
  cards: CardType[]
  wallet: WalletType | null
}

export function CardsManager({ cards, wallet }: CardsManagerProps) {
  const router = useRouter()
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null)
  const [showCardNumber, setShowCardNumber] = useState<Record<string, boolean>>({})
  const [isCreating, setIsCreating] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const generateCardNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString()
  }

  const handleCreateCard = async () => {
    setIsCreating(true)
    try {
      const supabase = createClient()
      
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 3)

      const { error } = await supabase.from('cards').insert({
        wallet_id: wallet?.id,
        card_number_last4: generateCardNumber(),
        card_type: 'virtual',
        status: 'active',
        spending_limit: 5000,
        online_payments: true,
        expires_at: expiryDate.toISOString().split('T')[0],
      })

      if (error) throw error
      router.refresh()
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Failed to create card:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleToggleFreeze = async (card: CardType) => {
    try {
      const supabase = createClient()
      const newStatus = card.status === 'active' ? 'frozen' : 'active'
      
      await supabase
        .from('cards')
        .update({ status: newStatus })
        .eq('id', card.id)

      router.refresh()
    } catch (error) {
      console.error('Failed to update card:', error)
    }
  }

  const toggleShowNumber = (cardId: string) => {
    setShowCardNumber(prev => ({ ...prev, [cardId]: !prev[cardId] }))
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Cards</h1>
          <p className="text-muted-foreground">Manage your virtual and physical cards</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              New Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Virtual Card</DialogTitle>
              <DialogDescription>
                Create a new virtual card for secure online shopping. The card will be linked to your primary wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="rounded-xl gradient-primary p-6 text-white mb-4">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-xs text-white/70">Athris</p>
                    <p className="text-xs text-white/70">Virtual Card</p>
                  </div>
                  <CreditCard className="size-8 text-white/30" />
                </div>
                <p className="font-mono text-lg tracking-wider mb-2">
                  •••• •••• •••• ••••
                </p>
                <div className="flex justify-between items-end text-sm">
                  <span>New Card</span>
                  <span>Valid for 3 years</span>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="size-4 text-muted-foreground" />
                  <span>Linked to: {wallet?.name || 'Primary Wallet'}</span>
                </div>
                <p className="text-muted-foreground">
                  Default spending limit: RM 5,000/month
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCard} disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Card'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards Grid */}
      {cards.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="size-16 rounded-full bg-muted flex items-center justify-center">
                <CreditCard className="size-8 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">No cards yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first virtual card to start making secure online payments.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="size-4 mr-2" />
              Create Virtual Card
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Card key={card.id} className="overflow-hidden">
              {/* Card Visual */}
              <div className={`p-6 text-white ${
                card.status === 'frozen' 
                  ? 'bg-gradient-to-br from-slate-400 to-slate-600' 
                  : 'gradient-primary'
              }`}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-xs text-white/70">Athris</p>
                    <p className="text-xs text-white/70 capitalize">{card.card_type} Card</p>
                  </div>
                  <Badge 
                    className={`text-xs ${
                      card.status === 'active' 
                        ? 'bg-white/20 text-white border-0' 
                        : card.status === 'frozen'
                        ? 'bg-blue-400/30 text-blue-100 border-0'
                        : 'bg-red-400/30 text-red-100 border-0'
                    }`}
                  >
                    {card.status === 'frozen' && <Snowflake className="size-3 mr-1" />}
                    {card.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-mono text-lg tracking-wider">
                    {showCardNumber[card.id] 
                      ? `4532 7821 9012 ${card.card_number_last4}`
                      : `•••• •••• •••• ${card.card_number_last4}`
                    }
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-white/70 hover:text-white hover:bg-white/20"
                    onClick={() => toggleShowNumber(card.id)}
                  >
                    {showCardNumber[card.id] ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                  </Button>
                </div>
                <div className="flex justify-between items-end text-sm">
                  <div>
                    <p className="text-[10px] text-white/60">EXPIRES</p>
                    <p>{format(new Date(card.expires_at), 'MM/yy')}</p>
                  </div>
                  <CreditCard className="size-8 text-white/30" />
                </div>
              </div>

              {/* Card Actions */}
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="size-4 text-muted-foreground" />
                    <Label htmlFor={`online-${card.id}`} className="text-sm">Online payments</Label>
                  </div>
                  <Switch
                    id={`online-${card.id}`}
                    checked={card.online_payments}
                    disabled={card.status === 'frozen'}
                  />
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Spending limit: RM {card.spending_limit.toLocaleString()}/month</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={card.status === 'frozen' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                    onClick={() => handleToggleFreeze(card)}
                  >
                    <Snowflake className="size-4 mr-2" />
                    {card.status === 'frozen' ? 'Unfreeze' : 'Freeze'}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="size-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
