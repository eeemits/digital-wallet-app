export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  kyc_status: 'pending' | 'verified' | 'rejected'
  created_at: string
  updated_at: string
}

export interface Wallet {
  id: string
  user_id: string
  name: string
  currency: string
  balance: number
  is_primary: boolean
  status: 'active' | 'frozen' | 'closed'
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  wallet_id: string
  type: 'credit' | 'debit' | 'transfer_in' | 'transfer_out' | 'topup' | 'withdrawal' | 'payment' | 'refund' | 'reward'
  amount: number
  balance_after: number
  description: string | null
  category: string | null
  merchant_name: string | null
  reference_id: string | null
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  metadata: Record<string, unknown>
  created_at: string
}

export interface Card {
  id: string
  wallet_id: string
  card_number_last4: string
  card_type: 'virtual' | 'physical'
  status: 'active' | 'frozen' | 'cancelled'
  spending_limit: number
  online_payments: boolean
  expires_at: string
  created_at: string
}

export interface SavingsGoal {
  id: string
  user_id: string
  name: string
  target_amount: number
  current_amount: number
  target_date: string | null
  icon: string
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Rewards {
  id: string
  user_id: string
  points_balance: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  total_points_earned: number
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  read: boolean
  metadata: Record<string, unknown>
  created_at: string
}

export interface NPCConversation {
  id: string
  user_id: string
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: string
  }>
  context: Record<string, unknown>
  created_at: string
  updated_at: string
}
