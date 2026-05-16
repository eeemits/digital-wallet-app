import { View, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Button, Card } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui';

export function WithdrawScreen() {
  const { palette } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Withdraw" />
      <EmptyState
        icon="business-outline"
        title="Link your bank account"
        description="Withdraw funds to your linked Malaysian bank account. Bank linking will be available soon."
        actionLabel="Notify me"
        onAction={() => {}}
      />
    </View>
  );
}
