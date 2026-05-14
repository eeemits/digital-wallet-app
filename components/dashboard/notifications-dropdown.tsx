'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell } from 'lucide-react'
import type { Notification } from '@/lib/types/database'

interface NotificationsDropdownProps {
    notifications: Notification[]
}

export function NotificationsDropdown({ notifications }: NotificationsDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="size-5" />
                    {notifications.length > 0 && (
                        <Badge
                            className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-[10px]"
                            variant="destructive"
                        >
                            {notifications.length}
                        </Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No new notifications
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <DropdownMenuItem
                            key={notification.id}
                            className="flex flex-col items-start gap-1 p-3"
                        >
                            <span className="font-medium">{notification.title}</span>
                            <span className="text-xs text-muted-foreground line-clamp-2">
                                {notification.message}
                            </span>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
