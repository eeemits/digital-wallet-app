import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@/lib/icons';
import { goBack } from '@/navigation/navigationRef';
import { useTheme } from '@/providers/ThemeProvider';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
};

export function ScreenHeader({ title, subtitle, showBack = true, rightAction }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();

  return (
    <View
      style={{
        paddingTop: insets.top + 8,
        paddingHorizontal: 20,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: palette.background,
      }}
    >
      {showBack && (
        <Pressable
          onPress={goBack}
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: palette.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <Ionicons name="chevron-back" size={22} color={palette.foreground} />
        </Pressable>
      )}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: palette.foreground }}>{title}</Text>
        {subtitle && (
          <Text style={{ fontSize: 13, color: palette.mutedForeground, marginTop: 2 }}>{subtitle}</Text>
        )}
      </View>
      {rightAction}
    </View>
  );
}
