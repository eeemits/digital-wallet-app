import { View, Text } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from './Button';

type EmptyStateProps = {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  icon = 'wallet-outline',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { palette } = useTheme();

  return (
    <View style={{ alignItems: 'center', paddingVertical: 48, paddingHorizontal: 24 }}>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: palette.muted,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Ionicons name={icon} size={36} color={palette.mutedForeground} />
      </View>
      <Text style={{ fontSize: 18, fontWeight: '700', color: palette.foreground, textAlign: 'center' }}>
        {title}
      </Text>
      {description && (
        <Text
          style={{
            fontSize: 14,
            color: palette.mutedForeground,
            textAlign: 'center',
            marginTop: 8,
            lineHeight: 20,
          }}
        >
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <View style={{ marginTop: 24, width: '100%' }}>
          <Button title={actionLabel} onPress={onAction} />
        </View>
      )}
    </View>
  );
}
