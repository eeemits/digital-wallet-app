import { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { navigate } from '@/navigation/navigationRef';
import { useTheme } from '@/providers/ThemeProvider';
import { Button, Input } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { signUp } from '@/services/auth.service';

const schema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name'),
    email: z.string().email('Enter a valid email'),
    phone: z.string().min(10, 'Enter a valid phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export function RegisterScreen() {
  const { palette } = useTheme();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, data.fullName);
      navigate('Otp', { email: data.email });
    } catch {
      navigate('Otp', { email: data.email });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: palette.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="Create account" subtitle="Join Athris in minutes" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Full name" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.fullName?.message} />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Email" keyboardType="email-address" autoCapitalize="none" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.email?.message} />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Phone" prefix="+60" keyboardType="phone-pad" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.phone?.message} />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Password" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} error={errors.password?.message} />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Confirm password" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} error={errors.confirmPassword?.message} />
          )}
        />
        <Button title="Continue" onPress={handleSubmit(onSubmit)} loading={loading} size="lg" />
        <Pressable onPress={() => navigate('Login')} style={{ alignItems: 'center', marginTop: 8 }}>
          <Text style={{ color: palette.mutedForeground }}>Already have an account? Sign in</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
