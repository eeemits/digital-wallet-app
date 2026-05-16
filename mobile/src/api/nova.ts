import { config } from '@/lib/config';
import type { NPCMessage } from '@/types';

export type NovaChatRequest = {
  messages: Array<{ role: string; content: string; parts?: Array<{ type: string; text: string }> }>;
  userId: string;
};

/** Stream Nova chat via Next.js POST /api/chat */
export async function sendNovaMessage(
  userId: string,
  messages: NPCMessage[]
): Promise<string> {
  const uiMessages = messages.map((m) => ({
    role: m.role,
    content: m.content,
    parts: [{ type: 'text', text: m.content }],
  }));

  const response = await fetch(`${config.apiUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: uiMessages, userId }),
  });

  if (!response.ok) {
    throw new Error('Failed to reach Nova');
  }

  const text = await response.text();
  return parseStreamResponse(text);
}

function parseStreamResponse(raw: string): string {
  const lines = raw.split('\n').filter((l) => l.startsWith('0:'));
  return lines
    .map((line) => {
      try {
        const json = JSON.parse(line.slice(2));
        return json?.text ?? '';
      } catch {
        return '';
      }
    })
    .join('');
}

/** Demo fallback responses when API unavailable */
export function getNovaDemoResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('balance')) {
    return 'Your main wallet balance is **RM 12,450.75**. Your savings wallet has **RM 5,200.00**. Would you like me to help you set a spending limit?';
  }
  if (lower.includes('spend') || lower.includes('spending')) {
    return 'This week you spent the most on **Food (RM 420)** — about 32% of total spending. Shopping was second at RM 310. I can suggest ways to cut food delivery costs if you\'d like.';
  }
  if (lower.includes('save') || lower.includes('saving')) {
    return 'You\'re RM 3,500 away from your Emergency Fund goal. To save **RM 500 this month**, try reducing food delivery by 2 orders/week — that could save ~RM 180. Want me to set up a weekly savings reminder?';
  }
  if (lower.includes('subscription')) {
    return 'Based on recent transactions, you have recurring payments to **Netflix (RM 55)**, **Spotify (RM 19.90)**, and **iCloud (RM 11.90)**. Total: **RM 86.80/month**.';
  }
  if (lower.includes('afford')) {
    return 'With your current balance and typical monthly spending, you have about **RM 8,200** in discretionary funds this month. For purchases over RM 500, I\'d recommend checking your savings goals first.';
  }
  if (lower.includes('flag') || lower.includes('fraud')) {
    return 'The flagged transaction (RM 899 at an unknown merchant) was unusual because it\'s 3x your average online purchase and from a new vendor. If this wasn\'t you, freeze your card immediately from the Cards tab.';
  }
  return 'I\'m Nova, your Athris financial assistant. I can help with balances, spending insights, savings goals, and transaction questions. What would you like to know?';
}
