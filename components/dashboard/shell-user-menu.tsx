'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Settings, LogOut, ChevronUp, Moon, Sun } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ShellUserMenuProps {
    userInitials: string
    fullName: string
    email: string
    avatarUrl?: string | null
}

export function ShellUserMenu({ userInitials, fullName, email, avatarUrl }: ShellUserMenuProps) {
    const router = useRouter()
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'))
    }, [])

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark')
        setIsDark(prev => !prev)
    }

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/auth/login')
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="size-8 rounded-lg">
                        <AvatarImage src={avatarUrl || undefined} alt={fullName} />
                        <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                            {userInitials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{fullName}</span>
                        <span className="truncate text-xs text-muted-foreground">{email}</span>
                    </div>
                    <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="size-8 rounded-lg">
                            <AvatarImage src={avatarUrl || undefined} alt={fullName} />
                            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                                {userInitials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{fullName}</span>
                            <span className="truncate text-xs text-muted-foreground">{email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                        <Settings className="size-4 mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleTheme}>
                    {isDark ? <Sun className="size-4 mr-2" /> : <Moon className="size-4 mr-2" />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="size-4 mr-2" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
