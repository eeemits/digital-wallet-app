import { TextInput, View, Text, type TextInputProps } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  prefix?: string;
};

export function Input({ label, error, prefix, style, ...props }: InputProps) {
  const { palette } = useTheme();

  return (
    <View style={{ gap: 6 }}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '500', color: palette.foreground }}>
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: palette.card,
          borderWidth: 1,
          borderColor: error ? palette.destructive : palette.border,
          borderRadius: 14,
          paddingHorizontal: 16,
          height: 52,
        }}
      >
        {prefix && (
          <Text style={{ fontSize: 16, fontWeight: '600', color: palette.mutedForeground, marginRight: 8 }}>
            {prefix}
          </Text>
        )}
        <TextInput
          placeholderTextColor={palette.mutedForeground}
          style={[
            {
              flex: 1,
              fontSize: 16,
              color: palette.foreground,
            },
            style,
          ]}
          {...props}
        />
      </View>
      {error && (
        <Text style={{ fontSize: 12, color: palette.destructive }}>{error}</Text>
      )}
    </View>
  );
}
