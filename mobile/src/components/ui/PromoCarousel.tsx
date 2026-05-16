import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { shadows } from '@/theme/tokens';

const promos = [
  {
    id: '1',
    title: '5% Cashback',
    subtitle: 'On all food delivery this weekend',
    colors: ['#7C3AED', '#A855F7'] as [string, string],
  },
  {
    id: '2',
    title: 'Refer & Earn',
    subtitle: 'Get RM 20 for each friend who joins',
    colors: ['#0D9488', '#14B8A6'] as [string, string],
  },
  {
    id: '3',
    title: 'Gold Tier Boost',
    subtitle: '2x points on all transactions',
    colors: ['#D97706', '#F59E0B'] as [string, string],
  },
];

export function PromoCarousel() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
      {promos.map((promo) => (
        <Pressable key={promo.id}>
          <LinearGradient
            colors={promo.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              {
                width: 280,
                borderRadius: 18,
                padding: 20,
                minHeight: 100,
                justifyContent: 'center',
              },
              shadows.md,
            ]}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{promo.title}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 6 }}>
              {promo.subtitle}
            </Text>
          </LinearGradient>
        </Pressable>
      ))}
    </ScrollView>
  );
}
