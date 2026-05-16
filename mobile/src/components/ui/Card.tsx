import { View, type ViewProps } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { shadows } from '@/theme/tokens';

type CardProps = ViewProps & {
  padded?: boolean;
};

export function Card({ children, style, padded = true, ...props }: CardProps) {
  const { palette } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: palette.card,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: palette.border,
          padding: padded ? 20 : 0,
        },
        shadows.md,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
