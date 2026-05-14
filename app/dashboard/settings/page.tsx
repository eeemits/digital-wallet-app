/**
 * Settings page.
 *
 * Header renders immediately. Profile form streams in via Suspense.
 */
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsSkeleton } from '@/components/skeletons'
import { getSettingsData } from '@/lib/data/queries'
import { SettingsPage } from '@/components/dashboard/settings-page'

// ─── Async data component ────────────────────────────────────────────────────

async function SettingsContent({ userId }: { userId: string }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { profile } = await getSettingsData(userId)
  return <SettingsPage user={user} profile={profile} />
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function Settings() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* ── Header — renders immediately ── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* ── Form — streams in ── */}
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContent userId={user.id} />
      </Suspense>
    </div>
  )
}
