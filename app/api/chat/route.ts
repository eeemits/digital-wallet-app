import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
  tool,
} from 'ai'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

export const maxDuration = 30

// System prompt for Nova, the NPC financial assistant
const systemPrompt = `You are Nova, an AI financial assistant for Athris digital wallet. You help users manage their money, understand their spending, and make better financial decisions.

Your personality:
- Friendly, professional, and helpful
- You speak in a warm, conversational tone
- You provide clear, actionable financial advice
- You're knowledgeable about personal finance, budgeting, and saving

Your capabilities:
- Help users understand their spending patterns
- Provide tips for saving money
- Explain transaction details
- Answer questions about Athris features
- Give personalized financial insights based on their data

Guidelines:
- Always be encouraging about financial progress
- Keep responses concise but helpful
- Use the currency format RM (Malaysian Ringgit)
- If you don't have enough information, ask clarifying questions
- Never share sensitive financial data unless the user specifically asks about their own account

Remember: You're here to help users feel confident about their finances!`

export async function POST(req: Request) {
  const { messages, userId }: { messages: UIMessage[], userId?: string } = await req.json()

  // Fetch user's financial context if userId is provided
  let userContext = ''
  if (userId) {
    const supabase = await createClient()
    
    const [walletResult, transactionsResult, rewardsResult] = await Promise.all([
      supabase.from('wallets').select('*').eq('user_id', userId).eq('is_primary', true).single(),
      supabase.from('transactions').select('*').eq('wallet_id', (await supabase.from('wallets').select('id').eq('user_id', userId).eq('is_primary', true).single()).data?.id || '').order('created_at', { ascending: false }).limit(10),
      supabase.from('rewards').select('*').eq('user_id', userId).single(),
    ])

    if (walletResult.data) {
      userContext = `
User's Financial Context:
- Wallet Balance: RM ${walletResult.data.balance.toFixed(2)}
- Rewards Tier: ${rewardsResult.data?.tier || 'bronze'}
- Rewards Points: ${rewardsResult.data?.points_balance || 0}
- Recent Transactions: ${transactionsResult.data?.length || 0} transactions found
${transactionsResult.data?.slice(0, 5).map(t => 
  `  - ${t.type}: RM ${t.amount} (${t.description || 'No description'})`
).join('\n') || ''}
`
    }
  }

  const result = streamText({
    model: 'openai/gpt-4o-mini',
    system: systemPrompt + (userContext ? `\n\n${userContext}` : ''),
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
    tools: {
      getBalance: tool({
        description: 'Get the user\'s current wallet balance',
        inputSchema: z.object({}),
        execute: async () => {
          if (!userId) return { error: 'User not authenticated' }
          const supabase = await createClient()
          const { data } = await supabase.from('wallets').select('balance').eq('user_id', userId).eq('is_primary', true).single()
          return { balance: data?.balance || 0, currency: 'MYR' }
        },
      }),
      getSpendingSummary: tool({
        description: 'Get a summary of the user\'s recent spending by category',
        inputSchema: z.object({
          days: z.number().optional().describe('Number of days to analyze (default 30)'),
        }),
        execute: async ({ days = 30 }) => {
          if (!userId) return { error: 'User not authenticated' }
          const supabase = await createClient()
          const { data: wallet } = await supabase.from('wallets').select('id').eq('user_id', userId).eq('is_primary', true).single()
          if (!wallet) return { error: 'No wallet found' }
          
          const startDate = new Date()
          startDate.setDate(startDate.getDate() - days)
          
          const { data: transactions } = await supabase
            .from('transactions')
            .select('*')
            .eq('wallet_id', wallet.id)
            .in('type', ['debit', 'payment', 'transfer_out', 'withdrawal'])
            .gte('created_at', startDate.toISOString())
          
          const total = transactions?.reduce((sum, t) => sum + t.amount, 0) || 0
          const byCategory = transactions?.reduce((acc, t) => {
            const cat = t.category || 'Other'
            acc[cat] = (acc[cat] || 0) + t.amount
            return acc
          }, {} as Record<string, number>) || {}
          
          return { totalSpent: total, byCategory, period: `${days} days`, transactionCount: transactions?.length || 0 }
        },
      }),
      getSavingsTips: tool({
        description: 'Get personalized savings tips based on spending patterns',
        inputSchema: z.object({}),
        execute: async () => {
          return {
            tips: [
              'Set up automatic transfers to a savings goal each payday',
              'Review your subscriptions monthly - you might find ones you forgot about',
              'Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings',
              'Track your daily expenses for a week to identify spending leaks',
              'Consider meal prepping to reduce food delivery expenses',
            ],
          }
        },
      }),
    },
    maxSteps: 3,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
