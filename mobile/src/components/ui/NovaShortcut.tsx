import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@/lib/icons';
import { navigate } from '@/navigation/navigationRef';
import { ASSISTANT_NAME } from '@/constants/app';
import { shadows } from '@/theme/tokens';

export function NovaShortcut() {
  return (
    <Pressable onPress={() => navigate('Nova')}>
      <LinearGradient
        colors={['#134E4A', '#0D9488']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          {
            borderRadius: 20,
            padding: 18,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
          },
          shadows.md,
        ]}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="sparkles" size={24} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Ask {ASSISTANT_NAME}</Text>
          <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 2 }}>
            Your AI financial companion
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.8)" />
      </LinearGradient>
    </Pressable>
  );
}
