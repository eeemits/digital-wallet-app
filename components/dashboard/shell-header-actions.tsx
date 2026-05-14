/**
 * Async server component — fetches unread notifications and renders the
 * header action buttons (notifications dropdown + Ask Nova).
 *
 * Wrapped in Suspense inside DashboardShell so it streams in independently.
 */
import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'
import { NotificationsDropdown } from './notifications-dropdown'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

interface ShellHeaderActionsProps {
    user: User
}

export async function ShellHeaderActions({ user }: ShellHeaderActionsProps) {
    const supabase = await createClient()
    const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('read', false)
        .order('created_at', { ascending: false })
        .limit(5)

    return (
        <>
            <NotificationsDropdown notifications={notifications ?? []} />
            <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link href="/dashboard/assistant" prefetch={true}>
                    <MessageCircle className="size-4" />
                    <span className="hidden sm:inline">Ask Nova</span>
                </Link>
            </Button>
        </>
    )
}
