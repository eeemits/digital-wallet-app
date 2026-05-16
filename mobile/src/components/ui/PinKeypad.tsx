import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@/lib/icons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useTheme } from '@/providers/ThemeProvider';

type PinKeypadProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

export function PinKeypad({ value, onChange, maxLength = 6 }: PinKeypadProps) {
  const { palette } = useTheme();

  const handlePress = (digit: string) => {
    if (value.length >= maxLength) return;
    ReactNativeHapticFeedback.trigger('impactLight');
    onChange(value + digit);
  };

  const handleDelete = () => {
    ReactNativeHapticFeedback.trigger('impactLight');
    onChange(value.slice(0, -1));
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <View style={{ gap: 24 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
        {Array.from({ length: maxLength }).map((_, i) => (
          <View
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: i < value.length ? palette.primary : palette.border,
            }}
          />
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
        {keys.map((key, index) => {
          if (key === '') {
            return <View key={index} style={{ width: 80, height: 80 }} />;
          }
          return (
            <Pressable
              key={index}
              onPress={() => (key === 'del' ? handleDelete() : handlePress(key))}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: palette.secondary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {key === 'del' ? (
                <Ionicons name="backspace-outline" size={28} color={palette.foreground} />
              ) : (
                <Text style={{ fontSize: 28, fontWeight: '500', color: palette.foreground }}>{key}</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
