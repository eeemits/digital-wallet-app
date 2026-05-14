// app/assistant/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AssistantClient from './assistant-client'

export default async function AssistantPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <AssistantClient userId={user.id} />
}