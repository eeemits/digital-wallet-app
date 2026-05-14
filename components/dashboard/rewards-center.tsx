'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Gift,
  Star,
  Crown,
  Sparkles,
  ShoppingBag,
  Coffee,
  Plane,
  Utensils,
  ChevronRight,
} from 'lucide-react'
import type { Rewards } from '@/lib/types/database'

interface RewardsCenterProps {
  rewards: Rewards | null
}

const tiers = [
  { name: 'bronze', minPoints: 0, maxPoints: 1000, color: 'from-amber-600 to-amber-800', icon: Star },
  { name: 'silver', minPoints: 1000, maxPoints: 5000, color: 'from-slate-400 to-slate-600', icon: Star },
  { name: 'gold', minPoints: 5000, maxPoints: 15000, color: 'from-yellow-400 to-yellow-600', icon: Crown },
  { name: 'platinum', minPoints: 15000, maxPoints: Infinity, color: 'from-slate-700 to-slate-900', icon: Sparkles },
]

const redeemableRewards = [
  { id: 1, name: 'Coffee Voucher', description: 'RM10 at participating cafes', points: 200, icon: Coffee, category: 'Food & Drinks' },
  { id: 2, name: 'Shopping Discount', description: '10% off at selected stores', points: 500, icon: ShoppingBag, category: 'Shopping' },
  { id: 3, name: 'Restaurant Credit', description: 'RM50 dining voucher', points: 1000, icon: Utensils, category: 'Food & Drinks' },
  { id: 4, name: 'Travel Miles', description: '500 airline miles', points: 2000, icon: Plane, category: 'Travel' },
]

const earnMoreWays = [
  { title: 'Make a payment', description: 'Earn 1 point per RM1 spent', points: '+1-100' },
  { title: 'Refer a friend', description: 'When they make their first transaction', points: '+100' },
  { title: 'Monthly active bonus', description: 'Use Athris 10+ times/month', points: '+50' },
  { title: 'Complete your profile', description: 'Add all required information', points: '+25' },
]

export function RewardsCenter({ rewards }: RewardsCenterProps) {
  const currentTier = tiers.find(t => t.name === rewards?.tier) || tiers[0]
  const nextTier = tiers[tiers.indexOf(currentTier) + 1]
  
  const pointsToNextTier = nextTier 
    ? nextTier.minPoints - (rewards?.total_points_earned || 0)
    : 0
  
  const progressToNextTier = nextTier
    ? ((rewards?.total_points_earned || 0) - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints) * 100
    : 100

  const TierIcon = currentTier.icon

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Rewards</h1>
        <p className="text-muted-foreground">Earn points and unlock exclusive benefits</p>
      </div>

      {/* Points Overview */}
      <Card className="overflow-hidden">
        <div className={`p-6 text-white bg-gradient-to-br ${currentTier.color}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className="bg-white/20 text-white border-0 mb-2 capitalize">
                <TierIcon className="size-3 mr-1" />
                {rewards?.tier || 'bronze'} Member
              </Badge>
              <p className="text-sm text-white/80">Available Points</p>
              <p className="text-4xl font-bold">{(rewards?.points_balance || 0).toLocaleString()}</p>
            </div>
            <div className="size-16 rounded-full bg-white/20 flex items-center justify-center">
              <Gift className="size-8" />
            </div>
          </div>
          
          {nextTier && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/80">Progress to {nextTier.name}</span>
                <span className="font-medium">{pointsToNextTier.toLocaleString()} points to go</span>
              </div>
              <Progress value={progressToNextTier} className="h-2 bg-white/20" />
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Earned (Lifetime)</p>
              <p className="text-lg font-semibold">{(rewards?.total_points_earned || 0).toLocaleString()} points</p>
            </div>
            <Button variant="outline" size="sm">
              View History
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Redeem Rewards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Redeem Rewards</CardTitle>
            <CardDescription>Use your points for exclusive perks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {redeemableRewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center gap-4 p-3 rounded-xl border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <reward.icon className="size-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{reward.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{reward.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{reward.points.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">
              View All Rewards
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Earn More Points */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Earn More Points</CardTitle>
            <CardDescription>Ways to boost your rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {earnMoreWays.map((way, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl bg-muted/50"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-success/10">
                  <Sparkles className="size-5 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{way.title}</p>
                  <p className="text-sm text-muted-foreground">{way.description}</p>
                </div>
                <Badge variant="secondary" className="text-success">
                  {way.points}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tier Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Membership Tiers</CardTitle>
          <CardDescription>Unlock more benefits as you earn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tiers.map((tier) => {
              const isCurrentTier = tier.name === rewards?.tier
              const TierIcon = tier.icon
              return (
                <div
                  key={tier.name}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    isCurrentTier 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border'
                  }`}
                >
                  <div className={`inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br ${tier.color} text-white mb-2`}>
                    <TierIcon className="size-6" />
                  </div>
                  <p className="font-semibold capitalize">{tier.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {tier.minPoints.toLocaleString()}+ pts
                  </p>
                  {isCurrentTier && (
                    <Badge className="mt-2 text-xs">Current</Badge>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
