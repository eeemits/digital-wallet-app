import { View, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

type CategoryData = { category: string; amount: number; percentage: number };

type SpendingChartProps = {
  data: CategoryData[];
};

const CHART_COLORS = ['#0D9488', '#22C55E', '#06B6D4', '#F97316', '#A855F7'];

export function SpendingChart({ data }: SpendingChartProps) {
  const { palette } = useTheme();

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden' }}>
        {data.map((item, i) => (
          <View
            key={item.category}
            style={{
              flex: item.percentage,
              backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
            }}
          />
        ))}
      </View>
      {data.map((item, i) => (
        <View key={item.category} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
            }}
          />
          <Text style={{ flex: 1, fontSize: 14, color: palette.foreground }}>{item.category}</Text>
          <Text style={{ fontSize: 14, fontWeight: '600', color: palette.foreground }}>
            RM {item.amount}
          </Text>
          <Text style={{ fontSize: 12, color: palette.mutedForeground, width: 36, textAlign: 'right' }}>
            {item.percentage}%
          </Text>
        </View>
      ))}
    </View>
  );
}
