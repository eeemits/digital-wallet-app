import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@/lib/icons';
import { formatCurrency } from '@/lib/currency';
import { maskBalance } from '@/lib/utils';
import { useWalletStore } from '@/store/wallet.store';
import { shadows } from '@/theme/tokens';

type BalanceCardProps = {
  balance: number;
  currency?: string;
  label?: string;
  onTopUp?: () => void;
  onSend?: () => void;
};

export function BalanceCard({
  balance,
  currency = 'MYR',
  label = 'Total Balance',
  onTopUp,
  onSend,
}: BalanceCardProps) {
  const { showBalance, toggleBalanceVisibility } = useWalletStore();

  return (
    <LinearGradient
      colors={['#0D9488', '#06B6D4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          borderRadius: 24,
          padding: 24,
          minHeight: 180,
        },
        shadows.lg,
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{label}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 12 }}>
            <Text style={{ color: '#fff', fontSize: 34, fontWeight: '700', letterSpacing: -0.5 }}>
              {showBalance ? formatCurrency(balance) : maskBalance(balance)}
            </Text>
            <Pressable onPress={toggleBalanceVisibility} hitSlop={12}>
              <Ionicons
                name={showBalance ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="rgba(255,255,255,0.85)"
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>{currency}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
        <Pressable
          onPress={onTopUp}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.2)',
            paddingVertical: 12,
            borderRadius: 12,
            gap: 6,
          }}
        >
          <Ionicons name="add-circle-outline" size={18} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Top Up</Text>
        </Pressable>
        <Pressable
          onPress={onSend}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.2)',
            paddingVertical: 12,
            borderRadius: 12,
            gap: 6,
          }}
        >
          <Ionicons name="arrow-up-outline" size={18} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Send</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
