import { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { navigate } from '@/navigation/navigationRef';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Button, Input } from '@/components/ui';
import { useLogin, useDemoLogin } from '@/hooks/useAuth';
import { APP_NAME } from '@/constants/app';
import { config } from '@/lib/config';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export function LoginScreen() {
  const { palette } = useTheme();
  const login = useLogin();
  const demoLogin = useDemoLogin();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');
    try {
      await login(data.email, data.password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: palette.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 60 }}>
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              backgroundColor: palette.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Ionicons name="wallet" size={32} color={palette.primaryForeground} />
          </View>
          <Text style={{ fontSize: 28, fontWeight: '700', color: palette.foreground }}>Welcome back</Text>
          <Text style={{ fontSize: 15, color: palette.mutedForeground, marginTop: 8 }}>
            Sign in to your {APP_NAME} account
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="••••••••"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />
        </View>

        <Pressable onPress={() => navigate('ForgotPassword')} style={{ alignSelf: 'flex-end', marginTop: 12 }}>
          <Text style={{ color: palette.primary, fontSize: 14, fontWeight: '500' }}>Forgot password?</Text>
        </Pressable>

        {error ? (
          <Text style={{ color: palette.destructive, fontSize: 14, marginTop: 12, textAlign: 'center' }}>{error}</Text>
        ) : null}

        <View style={{ marginTop: 24, gap: 12 }}>
          <Button title="Sign In" onPress={handleSubmit(onSubmit)} loading={loading} />
          {config.demoMode && (
            <Button title="Try Demo Account" variant="outline" onPress={demoLogin} />
          )}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 32 }}>
          <Text style={{ color: palette.mutedForeground }}>Don't have an account? </Text>
          <Pressable onPress={() => navigate('Register')}>
            <Text style={{ color: palette.primary, fontWeight: '600' }}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
