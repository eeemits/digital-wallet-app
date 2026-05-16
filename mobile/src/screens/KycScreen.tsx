import { View } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Button, Card } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/ui';

export function KycScreen() {
  const { palette } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Identity verification" subtitle="Required for higher limits" />
      <EmptyState
        icon="id-card-outline"
        title="Verify your identity"
        description="Upload your MyKad and complete a quick selfie check to unlock full wallet features."
        actionLabel="Start verification"
        onAction={() => {}}
      />
      <View style={{ padding: 20 }}>
        <Card>
          <Button title="Upload MyKad (placeholder)" variant="outline" />
        </Card>
      </View>
    </View>
  );
}
