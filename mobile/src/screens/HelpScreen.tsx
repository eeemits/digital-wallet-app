import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Card } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';

const faqs = [
  { q: 'How do I top up my wallet?', a: 'Go to Home → Top Up or Wallet → Add funds. FPX and card payments supported.' },
  { q: 'How does Nova work?', a: 'Nova is your AI assistant. Ask about spending, savings, and transactions.' },
  { q: 'Is my money safe?', a: 'Athris uses bank-grade encryption, PIN protection, and fraud monitoring.' },
];

export function HelpScreen() {
  const { palette } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Help center" />
      <View style={{ padding: 20, gap: 12 }}>
        {faqs.map((faq) => (
          <Card key={faq.q}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground }}>{faq.q}</Text>
            <Text style={{ fontSize: 14, color: palette.mutedForeground, marginTop: 8, lineHeight: 20 }}>{faq.a}</Text>
          </Card>
        ))}
        <Pressable>
          <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Ionicons name="chatbubbles-outline" size={24} color={palette.primary} />
            <View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground }}>Contact support</Text>
              <Text style={{ fontSize: 13, color: palette.mutedForeground }}>support@athris.app</Text>
            </View>
          </Card>
        </Pressable>
      </View>
    </ScrollView>
  );
}
