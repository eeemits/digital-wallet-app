/**
 * DashboardShell — persistent layout wrapper.
 *
 * This is a Server Component. It renders the sidebar chrome immediately
 * (nav links, logo, header) and streams in the user-specific sidebar data
 * (balance, rewards, user menu) via a Suspense boundary.
 *
 * Because this component has no "use client", it does NOT re-render on
 * every navigation — only the {children} slot updates.
 */
import * as React from 'react'
import Link from 'next/link'
import { Suspense } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import {
  Wallet,
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { NavActiveLink } from './nav-active-link'
import { ShellData } from './shell-data'
import { ShellHeaderActions } from './shell-header-actions'
import { Skeleton } from '@/components/ui/skeleton'
import { NavItems } from '@/lib/types/nav-bar-link'

interface DashboardShellProps {
  children: React.ReactNode
  user: User
}

const navItems: NavItems[] = [
  { title: 'Dashboard', href: '/dashboard', icon: "layout-dashboard" },
  { title: 'Transactions', href: '/dashboard/transactions', icon: "arrow-up-down" },
  { title: 'Cards', href: '/dashboard/cards', icon: "credit-card" },
  { title: 'Savings', href: '/dashboard/savings', icon: "piggy-bank" },
  { title: 'Rewards', href: '/dashboard/rewards', icon: "gift" },
]

const accountItems: NavItems[] = [
  { title: 'Settings', href: '/dashboard/settings', icon: "settings" },
]

/** Lightweight skeleton shown while ShellData streams in */
function SidebarDataSkeleton() {
  return (
    <div className="px-3 space-y-3 py-2">
      <div className="rounded-xl border border-primary/20 p-3 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="flex items-center gap-2 p-2">
        <Skeleton className="size-8 rounded-lg" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  )
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        {/* ── Header: logo + wallet name — renders immediately ── */}
        <SidebarHeader className="pb-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/dashboard" prefetch={true}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg gradient-primary text-white">
                    <Wallet className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Athris</span>
                    <span className="truncate text-xs text-muted-foreground">
                      Digital Wallet
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* ── Nav links — render immediately, active state via NavActiveLink ── */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <NavActiveLink
                      href={item.href}
                      title={item.title}
                      icon={item.icon}
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <NavActiveLink
                      href={item.href}
                      title={item.title}
                      icon={item.icon}
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/*
           * ShellData fetches profile/wallet/rewards/notifications.
           * Wrapped in Suspense so it streams in without blocking the sidebar
           * chrome or the page content.
           * ShellData also renders SidebarFooter with the user menu inside it.
           */}
          <Suspense fallback={<SidebarDataSkeleton />}>
            <ShellData user={user} />
          </Suspense>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        {/* ── Top header — renders immediately ── */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="flex items-center gap-2">
            {/*
             * Notifications dropdown + Ask Nova button.
             * ShellHeaderActions is a small client component that receives
             * notifications as props once ShellData resolves.
             */}
            <Suspense
              fallback={
                <div className="flex items-center gap-2">
                  <Skeleton className="size-9 rounded-md" />
                  <Skeleton className="h-9 w-24 rounded-md" />
                </div>
              }
            >
              <ShellHeaderActions user={user} />
            </Suspense>
          </div>
        </header>

        {/* ── Page content — only this region changes on navigation ── */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
