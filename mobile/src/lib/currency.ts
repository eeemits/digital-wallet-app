import { CURRENCY_SYMBOL, DEFAULT_CURRENCY } from '@/constants/app';

export function formatCurrency(
  amount: number,
  options?: { hideSymbol?: boolean; compact?: boolean }
): string {
  const formatted = new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: DEFAULT_CURRENCY,
    minimumFractionDigits: options?.compact ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (options?.hideSymbol) {
    return formatted.replace(/[^\d.,-]/g, '').trim();
  }
  return formatted;
}

export function formatAmountInput(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');
  return cleaned;
}

export function parseAmount(value: string): number {
  const parsed = parseFloat(value.replace(/,/g, ''));
  return isNaN(parsed) ? 0 : parsed;
}

export function formatPoints(points: number): string {
  return `${points.toLocaleString('en-MY')} pts`;
}

export { CURRENCY_SYMBOL };
