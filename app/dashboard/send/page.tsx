import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SendMoney } from '@/components/dashboard/send-money'

export default async function SendPage() {
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

  return <SendMoney wallet={wallet} />
}
