/**
 * Async server component — fetches sidebar data and renders:
 *   1. The rewards widget (inside SidebarContent)
 *   2. The user menu (inside SidebarFooter via a portal-like pattern)
 *
 * Both are streamed in via the Suspense boundary in DashboardShell.
 */
import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'
import { RewardsSidebarWidget } from './rewards-sidebar-widget'
import { ShellUserMenu } from './shell-user-menu'
import {
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

interface ShellDataProps {
    user: User
}

export async function ShellData({ user }: ShellDataProps) {
    const supabase = await createClient()

    const [profileResult, walletResult, rewardsResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase
            .from('wallets')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_primary', true)
            .single(),
        supabase.from('rewards').select('*').eq('user_id', user.id).single(),
    ])

    const profile = profileResult.data
    const rewards = rewardsResult.data

    const userInitials = profile?.full_name
        ? profile.full_name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
        : user.email?.[0].toUpperCase() ?? 'U'

    return (
        <>
            {/* Rewards widget — rendered inside SidebarContent via Suspense */}
            {rewards && <RewardsSidebarWidget rewards={rewards} />}

            {/* User menu — rendered inside SidebarFooter */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <ShellUserMenu
                            userInitials={userInitials}
                            fullName={profile?.full_name ?? 'User'}
                            email={user.email ?? ''}
                            avatarUrl={profile?.avatar_url}
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </>
    )
}
