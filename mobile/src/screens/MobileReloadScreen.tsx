import { View, Text, ScrollView, Pressable } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Input, Button, Card } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';

const telcos = ['Celcom', 'Maxis', 'Digi', 'U Mobile', 'Tune Talk'];

export function MobileReloadScreen() {
  const { palette } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Mobile reload" />
      <View style={{ padding: 20, gap: 16 }}>
        <Input label="Phone number" prefix="+60" keyboardType="phone-pad" />
        <Text style={{ fontSize: 14, fontWeight: '600', color: palette.foreground }}>Select telco</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {telcos.map((t) => (
            <Pressable key={t}>
              <Card style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
                <Text style={{ fontWeight: '600', color: palette.foreground }}>{t}</Text>
              </Card>
            </Pressable>
          ))}
        </View>
        <Input label="Amount" prefix="RM" keyboardType="decimal-pad" />
        <Button title="Reload now" size="lg" />
      </View>
    </ScrollView>
  );
}
