import { useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Pressable,
  type ViewToken,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@/lib/icons';
import { navigate } from '@/navigation/navigationRef';
import { setSecureItem, secureKeys } from '@/lib/secure-storage';
import { APP_NAME } from '@/constants/app';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: 'wallet' as const,
    title: `Welcome to ${APP_NAME}`,
    description: 'Your premium digital wallet for everyday banking, transfers, and rewards.',
  },
  {
    id: '2',
    icon: 'qr-code' as const,
    title: 'Pay anywhere',
    description: 'Send money, scan QR, pay bills, and split expenses — all in seconds.',
  },
  {
    id: '3',
    icon: 'sparkles' as const,
    title: 'Meet Nova',
    description: 'Your AI financial companion for insights, savings tips, and smart guidance.',
  },
];

export function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index);
  }).current;

  const finish = async () => {
    await setSecureItem(secureKeys.ONBOARDING_COMPLETE, 'true');
    navigate('Login');
  };

  return (
    <LinearGradient colors={['#0B1120', '#134E4A']} style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width, flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 28,
                backgroundColor: 'rgba(45, 212, 191, 0.15)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40,
              }}
            >
              <Ionicons name={item.icon} size={48} color="#2DD4BF" />
            </View>
            <Text style={{ color: '#fff', fontSize: 28, fontWeight: '700', textAlign: 'center' }}>
              {item.title}
            </Text>
            <Text
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 16,
                lineHeight: 24,
              }}
            >
              {item.description}
            </Text>
          </View>
        )}
      />

      <View style={{ paddingHorizontal: 24, paddingBottom: 48 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === index ? '#2DD4BF' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </View>

        {index < slides.length - 1 ? (
          <Pressable
            onPress={() => flatListRef.current?.scrollToIndex({ index: index + 1 })}
            style={{
              backgroundColor: '#0D9488',
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>Continue</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={finish}
            style={{
              backgroundColor: '#0D9488',
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>Get Started</Text>
          </Pressable>
        )}

        {index < slides.length - 1 && (
          <Pressable onPress={finish} style={{ alignItems: 'center', marginTop: 16 }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Skip</Text>
          </Pressable>
        )}
      </View>
    </LinearGradient>
  );
}
