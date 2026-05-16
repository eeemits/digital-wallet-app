import { z } from 'zod';

export const sendMoneySchema = z.object({
  recipient: z.string().min(3, 'Enter recipient ID or phone'),
  amount: z.string().refine((v) => parseFloat(v.replace(/,/g, '')) > 0, 'Enter a valid amount'),
  note: z.string().optional(),
});

export const topUpSchema = z.object({
  amount: z.string().refine((v) => parseFloat(v.replace(/,/g, '')) > 0, 'Enter a valid amount'),
});
