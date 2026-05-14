import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TopUp } from '@/components/dashboard/topup'

export default async function TopUpPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const { data: wallet } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_primary', true)
    .single()

  return <TopUp wallet={wallet} />
}
