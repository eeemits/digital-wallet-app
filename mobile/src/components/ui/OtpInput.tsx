import { useRef, useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
};

export function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const { palette } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
        {Array.from({ length }).map((_, i) => (
          <View
            key={i}
            style={{
              width: 48,
              height: 56,
              borderRadius: 14,
              borderWidth: 2,
              borderColor: focused && i === value.length ? palette.primary : palette.border,
              backgroundColor: palette.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextInput
              editable={false}
              value={value[i] ?? ''}
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: palette.foreground,
                textAlign: 'center',
              }}
            />
          </View>
        ))}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(t) => onChange(t.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        style={{ position: 'absolute', opacity: 0, height: 0 }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus
      />
    </Pressable>
  );
}
