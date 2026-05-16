import { View, Text, ScrollView, Switch } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { Card, Input, Button } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useProfile } from '@/hooks/useWalletData';

export function SettingsScreen() {
  const { palette } = useTheme();
  const { data: profile } = useProfile();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Settings" />
      <View style={{ padding: 20, gap: 20 }}>
        <Input label="Full name" defaultValue={profile?.full_name ?? ''} />
        <Input label="Phone" defaultValue={profile?.phone ?? ''} />
        <Button title="Save changes" />

        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: palette.foreground }}>Push notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: palette.primary }} />
          </View>
          <View style={{ height: 1, backgroundColor: palette.border, marginVertical: 12 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: palette.foreground }}>Biometric login</Text>
            <Switch value={biometric} onValueChange={setBiometric} trackColor={{ true: palette.primary }} />
          </View>
        </Card>

        <Text style={{ fontSize: 13, color: palette.mutedForeground, lineHeight: 20 }}>
          Session timeout: 15 minutes. Device management and audit logs available in production.
        </Text>
      </View>
    </ScrollView>
  );
}
