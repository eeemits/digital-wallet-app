import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Card } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';

const categories = [
  { name: 'Electricity', icon: 'flash' as const },
  { name: 'Water', icon: 'water' as const },
  { name: 'Internet', icon: 'wifi' as const },
  { name: 'Mobile', icon: 'phone-portrait' as const },
  { name: 'Insurance', icon: 'shield' as const },
  { name: 'Council', icon: 'business' as const },
];

export function BillPayScreen() {
  const { palette } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Pay bills" />
      <View style={{ padding: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {categories.map((cat) => (
          <Pressable key={cat.name} style={{ width: '47%' }}>
            <Card style={{ alignItems: 'center', paddingVertical: 24 }}>
              <Ionicons name={cat.icon} size={28} color={palette.primary} />
              <Text style={{ marginTop: 10, fontSize: 14, fontWeight: '600', color: palette.foreground }}>{cat.name}</Text>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
