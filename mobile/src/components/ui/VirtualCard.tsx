import { View, Text } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@/lib/icons';
import type { Card } from '@/types';
import { shadows } from '@/theme/tokens';

type VirtualCardProps = {
  card: Card;
  compact?: boolean;
};

export function VirtualCard({ card, compact }: VirtualCardProps) {
  const frozen = card.status === 'frozen';

  return (
    <LinearGradient
      colors={frozen ? ['#475569', '#334155'] : ['#0F766E', '#115E59', '#134E4A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          borderRadius: 20,
          padding: compact ? 20 : 24,
          aspectRatio: compact ? undefined : 1.6,
          minHeight: compact ? 120 : 200,
          justifyContent: 'space-between',
        },
        shadows.lg,
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: '700', letterSpacing: 2 }}>
          ATHRIS
        </Text>
        <Ionicons name="wifi" size={22} color="rgba(255,255,255,0.7)" style={{ transform: [{ rotate: '90deg' }] }} />
      </View>

      {!compact && (
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 24 }}>Virtual Card</Text>
      )}

      <View>
        <Text
          style={{
            color: '#fff',
            fontSize: compact ? 18 : 22,
            fontWeight: '600',
            letterSpacing: 3,
            fontVariant: ['tabular-nums'],
          }}
        >
          •••• •••• •••• {card.card_number_last4}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
          <View>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>VALID THRU</Text>
            <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>
              {new Date(card.expires_at).toLocaleDateString('en-MY', {
                month: '2-digit',
                year: '2-digit',
              })}
            </Text>
          </View>
          {frozen && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="snow" size={14} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>FROZEN</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}
