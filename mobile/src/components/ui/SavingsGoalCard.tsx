import { View, Text } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { formatCurrency } from '@/lib/currency';
import type { SavingsGoal } from '@/types';

const ICON_MAP: Record<string, string> = {
  shield: 'shield-checkmark',
  airplane: 'airplane',
  home: 'home',
  car: 'car',
};

type SavingsGoalCardProps = {
  goal: SavingsGoal;
};

export function SavingsGoalCard({ goal }: SavingsGoalCardProps) {
  const { palette } = useTheme();
  const progress = Math.min((goal.current_amount / goal.target_amount) * 100, 100);
  const icon = ICON_MAP[goal.icon] ?? 'flag';

  return (
    <View
      style={{
        backgroundColor: palette.card,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: palette.border,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: `${palette.primary}18`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name={icon} size={20} color={palette.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground }}>{goal.name}</Text>
          <Text style={{ fontSize: 13, color: palette.mutedForeground, marginTop: 2 }}>
            {formatCurrency(goal.current_amount)} of {formatCurrency(goal.target_amount)}
          </Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: '700', color: palette.primary }}>{Math.round(progress)}%</Text>
      </View>
      <View style={{ height: 6, backgroundColor: palette.muted, borderRadius: 3, overflow: 'hidden' }}>
        <View
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: palette.primary,
            borderRadius: 3,
          }}
        />
      </View>
    </View>
  );
}
