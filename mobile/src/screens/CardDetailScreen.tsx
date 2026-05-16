import { View, Text, ScrollView, Switch } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { VirtualCard, Card, Button } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useCards } from '@/hooks/useWalletData';
import { formatCurrency } from '@/lib/currency';

export function CardDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CardDetail'>>();
  const id = route.params.id;
  const { palette } = useTheme();
  const { data: cards } = useCards();
  const card = cards?.find((c) => c.id === id) ?? cards?.[0];
  const [frozen, setFrozen] = useState(card?.status === 'frozen');
  const [onlinePayments, setOnlinePayments] = useState(card?.online_payments ?? true);

  if (!card) {
    return (
      <View style={{ flex: 1, backgroundColor: palette.background }}>
        <ScreenHeader title="Card" />
      </View>
    );
  }

  const displayCard = { ...card, status: frozen ? 'frozen' as const : 'active' as const };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Virtual card" />
      <View style={{ padding: 20, gap: 20 }}>
        <VirtualCard card={displayCard} />

        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground }}>Freeze card</Text>
              <Text style={{ fontSize: 13, color: palette.mutedForeground }}>Temporarily disable all payments</Text>
            </View>
            <Switch value={frozen} onValueChange={setFrozen} trackColor={{ true: palette.primary }} />
          </View>
          <View style={{ height: 1, backgroundColor: palette.border, marginVertical: 8 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground }}>Online payments</Text>
              <Text style={{ fontSize: 13, color: palette.mutedForeground }}>Allow e-commerce transactions</Text>
            </View>
            <Switch value={onlinePayments} onValueChange={setOnlinePayments} trackColor={{ true: palette.primary }} />
          </View>
        </Card>

        <Card>
          <Text style={{ fontSize: 13, color: palette.mutedForeground }}>Spending limit</Text>
          <Text style={{ fontSize: 22, fontWeight: '700', color: palette.foreground, marginTop: 4 }}>
            {formatCurrency(card.spending_limit)} / month
          </Text>
          <Button title="Adjust limit" variant="outline" style={{ marginTop: 16 }} />
        </Card>
      </View>
    </ScrollView>
  );
}
