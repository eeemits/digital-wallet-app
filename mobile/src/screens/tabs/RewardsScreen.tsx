import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { RewardCard, SavingsGoalCard, Card } from '@/components/ui';
import { useRewards, useSavingsGoals } from '@/hooks/useWalletData';
import { formatCurrency } from '@/lib/currency';

const cashbackOffers = [
  { merchant: 'Grab', cashback: '8%', expires: '2 days' },
  { merchant: 'Shopee', cashback: '5%', expires: '5 days' },
  { merchant: 'Foodpanda', cashback: '10%', expires: '1 day' },
];

export function RewardsScreen() {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();
  const { data: rewards } = useRewards();
  const { data: goals } = useSavingsGoals();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }}>
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 32 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: palette.foreground }}>Rewards</Text>
        <Text style={{ fontSize: 14, color: palette.mutedForeground, marginTop: 4 }}>
          Cashback, points, and savings goals
        </Text>

        {rewards && (
          <View style={{ marginTop: 24 }}>
            <RewardCard rewards={rewards} />
          </View>
        )}

        <Text style={{ fontSize: 17, fontWeight: '700', color: palette.foreground, marginTop: 28, marginBottom: 12 }}>
          Cashback offers
        </Text>
        {cashbackOffers.map((offer) => (
          <Card key={offer.merchant} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: `${palette.primary}15`,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
              }}
            >
              <Ionicons name="pricetag" size={22} color={palette.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground }}>{offer.merchant}</Text>
              <Text style={{ fontSize: 13, color: palette.mutedForeground }}>Expires in {offer.expires}</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: '700', color: palette.success }}>{offer.cashback}</Text>
          </Card>
        ))}

        <Text style={{ fontSize: 17, fontWeight: '700', color: palette.foreground, marginTop: 20, marginBottom: 12 }}>
          Savings goals
        </Text>
        {goals?.map((goal) => (
          <SavingsGoalCard key={goal.id} goal={goal} />
        ))}

        <Card style={{ marginTop: 12, opacity: 0.7 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Ionicons name="people" size={24} color={palette.primary} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground }}>Refer a friend</Text>
              <Text style={{ fontSize: 13, color: palette.mutedForeground }}>Earn {formatCurrency(20)} per referral</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={palette.mutedForeground} />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
