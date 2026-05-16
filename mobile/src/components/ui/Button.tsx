import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';

type ButtonProps = PressableProps & {
  title: string;
  variant?: Variant;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function Button({
  title,
  variant = 'primary',
  loading,
  size = 'md',
  disabled,
  className,
  style,
  ...props
}: ButtonProps) {
  const { palette } = useTheme();

  const heights: Record<string, number> = { sm: 40, md: 48, lg: 56 };
  const fontSizes: Record<string, number> = { sm: 14, md: 16, lg: 17 };

  const variantStyles: Record<Variant, ViewStyle> = {
    primary: { backgroundColor: palette.primary },
    secondary: { backgroundColor: palette.secondary },
    ghost: { backgroundColor: 'transparent' },
    destructive: { backgroundColor: palette.destructive },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: palette.border,
    },
  };

  const textColors: Record<Variant, string> = {
    primary: palette.primaryForeground,
    secondary: palette.secondaryForeground,
    ghost: palette.primary,
    destructive: palette.destructiveForeground,
    outline: palette.foreground,
  };

  return (
    <Pressable
      disabled={disabled || loading}
      style={[
        {
          height: heights[size],
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        variantStyles[variant],
        style as ViewStyle,
      ]}
      className={className}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColors[variant]} />
      ) : (
        <Text
          style={{
            color: textColors[variant],
            fontSize: fontSizes[size],
            fontWeight: '600',
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
