import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ReceiveMoney } from '@/components/dashboard/receive-money'

export default async function ReceivePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return <ReceiveMoney user={user} profile={profile} />
}
