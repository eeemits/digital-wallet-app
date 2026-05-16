import { View } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Input, Button } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';

export function SplitBillScreen() {
  const { palette } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Split bill" subtitle="Divide expenses with friends" />
      <View style={{ padding: 20, gap: 16 }}>
        <Input label="Total amount" prefix="RM" keyboardType="decimal-pad" placeholder="0.00" />
        <Input label="Number of people" keyboardType="number-pad" placeholder="2" />
        <Button title="Create split request" size="lg" />
      </View>
    </View>
  );
}
