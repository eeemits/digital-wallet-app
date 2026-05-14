'use client'

/**
 * Renders the populated sidebar header, rewards widget, and user menu.
 * This is a client component only because ShellUserMenu needs useRouter.
 * It receives all data as props — no fetching here.
 */
import { Sparkles } from 'lucide-react'
import {
    SidebarGroup,
    SidebarGroupContent,
} from '@/components/ui/sidebar'
import { ShellUserMenu } from './shell-user-menu'
import type { User } from '@supabase/supabase-js'
import type { Profile, Wallet, Rewards, Notification } from '@/lib/types/database'

interface ShellSidebarContentProps {
    user: User
    profile: Profile | null
    wallet: Wallet | null
    rewards: Rewards | null
    notifications: Notification[]
}

export function ShellSidebarContent({
    user,
    profile,
    wallet,
    rewards,
    notifications: _notifications,
}: ShellSidebarContentProps) {
    const userInitials = profile?.full_name
        ? profile.full_name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
        : user.email?.[0].toUpperCase() ?? 'U'

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(amount)

    return (
        <>
            {/* Wallet balance shown in header — passed down via data attribute trick */}
            {wallet && (
                <span
                    id="shell-wallet-balance"
                    data-balance={formatCurrency(wallet.balance)}
                    className="sr-only"
                    aria-hidden="true"
                />
            )}

            {/* Rewards widget */}
            {rewards && (
                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className="mx-2 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-3 border border-primary/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="size-4 text-primary" />
                                <span className="text-xs font-medium text-primary capitalize">
                                    {rewards.tier} Member
                                </span>
                            </div>
                            <div className="text-lg font-bold text-foreground">
                                {rewards.points_balance.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">Reward Points</div>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            )}

            {/* User menu (sign-out, theme toggle) */}
            <ShellUserMenu
                userInitials={userInitials}
                fullName={profile?.full_name ?? 'User'}
                email={user.email ?? ''}
                avatarUrl={profile?.avatar_url}
            />
        </>
    )
}
