/**
 * Dashboard layout — auth check only.
 *
 * Shell data (profile, wallet balance, rewards, notifications) is fetched
 * inside DashboardShell via a Suspense boundary so it never blocks navigation.
 * Each page fetches only its own data, also inside Suspense.
 */
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  )
}
