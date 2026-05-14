'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
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
  PiggyBank,
  Plus,
  Target,
  Plane,
  Home,
  Car,
  GraduationCap,
  Gift,
  TrendingUp,
} from 'lucide-react'
import type { SavingsGoal, Wallet } from '@/lib/types/database'
import { format, differenceInDays } from 'date-fns'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface SavingsGoalsProps {
  goals: SavingsGoal[]
  wallet: Wallet | null
  userId: string
}

const goalIcons: Record<string, typeof PiggyBank> = {
  'piggy-bank': PiggyBank,
  'plane': Plane,
  'home': Home,
  'car': Car,
  'graduation': GraduationCap,
  'gift': Gift,
  'target': Target,
}

const iconOptions = [
  { id: 'piggy-bank', icon: PiggyBank, label: 'Savings' },
  { id: 'plane', icon: Plane, label: 'Travel' },
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'car', icon: Car, label: 'Car' },
  { id: 'graduation', icon: GraduationCap, label: 'Education' },
  { id: 'gift', icon: Gift, label: 'Gift' },
]

export function SavingsGoals({ goals, wallet, userId }: SavingsGoalsProps) {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    icon: 'piggy-bank',
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
    }).format(amount)
  }

  const handleCreateGoal = async () => {
    setIsCreating(true)
    try {
      const supabase = createClient()
      
      const { error } = await supabase.from('savings_goals').insert({
        user_id: userId,
        name: newGoal.name,
        target_amount: parseFloat(newGoal.targetAmount),
        target_date: newGoal.targetDate || null,
        icon: newGoal.icon,
        current_amount: 0,
        status: 'active',
      })

      if (error) throw error
      
      setNewGoal({ name: '', targetAmount: '', targetDate: '', icon: 'piggy-bank' })
      setIsDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Failed to create goal:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const totalSaved = goals.reduce((sum, g) => sum + g.current_amount, 0)
  const totalTarget = goals.reduce((sum, g) => sum + g.target_amount, 0)

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Savings Goals</h1>
          <p className="text-muted-foreground">Track your progress towards financial goals</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Savings Goal</DialogTitle>
              <DialogDescription>
                Set a new financial goal to work towards.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Vacation Fund"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Target Amount (RM)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="5000"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Target Date (optional)</Label>
                <Input
                  id="date"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setNewGoal({ ...newGoal, icon: option.id })}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
                          newGoal.icon === option.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className="size-5" />
                        <span className="text-[10px]">{option.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateGoal} 
                disabled={isCreating || !newGoal.name || !newGoal.targetAmount}
              >
                {isCreating ? 'Creating...' : 'Create Goal'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <PiggyBank className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Saved</p>
                <p className="text-xl font-bold text-primary">{formatCurrency(totalSaved)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                <Target className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Target</p>
                <p className="text-xl font-bold">{formatCurrency(totalTarget)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-success/10">
                <TrendingUp className="size-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Goals</p>
                <p className="text-xl font-bold">{goals.filter(g => g.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      {goals.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="size-16 rounded-full bg-muted flex items-center justify-center">
                <PiggyBank className="size-8 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">No savings goals yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first goal to start tracking your savings progress.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="size-4 mr-2" />
              Create Your First Goal
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {goals.map((goal) => {
            const Icon = goalIcons[goal.icon] || PiggyBank
            const progress = (goal.current_amount / goal.target_amount) * 100
            const daysLeft = goal.target_date 
              ? differenceInDays(new Date(goal.target_date), new Date())
              : null

            return (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{goal.name}</CardTitle>
                        {goal.target_date && (
                          <CardDescription>
                            {daysLeft !== null && daysLeft > 0 
                              ? `${daysLeft} days left`
                              : daysLeft === 0 
                              ? 'Due today'
                              : 'Overdue'}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                    {progress >= 100 && (
                      <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                        Completed!
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        {formatCurrency(goal.current_amount)} saved
                      </span>
                      <span className="font-medium">
                        {formatCurrency(goal.target_amount)}
                      </span>
                    </div>
                    <Progress value={Math.min(progress, 100)} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {progress.toFixed(1)}% complete
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Add Funds
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
