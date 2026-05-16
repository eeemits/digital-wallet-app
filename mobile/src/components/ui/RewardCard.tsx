import { View, Text } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { formatPoints } from '@/lib/currency';
import type { Rewards } from '@/types';

type RewardCardProps = {
  rewards: Rewards;
};

const TIER_COLORS: Record<string, [string, string]> = {
  bronze: ['#92400E', '#B45309'],
  silver: ['#475569', '#64748B'],
  gold: ['#B45309', '#D97706'],
  platinum: ['#4C1D95', '#7C3AED'],
};

export function RewardCard({ rewards }: RewardCardProps) {
  const colors = TIER_COLORS[rewards.tier] ?? TIER_COLORS.bronze;

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 20, padding: 20 }}
    >
      <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, textTransform: 'capitalize' }}>
        {rewards.tier} Member
      </Text>
      <Text style={{ color: '#fff', fontSize: 32, fontWeight: '700', marginTop: 8 }}>
        {formatPoints(rewards.points_balance)}
      </Text>
      <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 4 }}>
        {rewards.total_points_earned.toLocaleString()} lifetime points
      </Text>
    </LinearGradient>
  );
}
