import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import type { MainTabParamList } from './types';
import { HomeScreen } from '@/screens/tabs/HomeScreen';
import { WalletScreen } from '@/screens/tabs/WalletScreen';
import { PayScreen } from '@/screens/tabs/PayScreen';
import { RewardsScreen } from '@/screens/tabs/RewardsScreen';
import { ProfileScreen } from '@/screens/tabs/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  const { palette, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.mutedForeground,
        tabBarStyle: {
          backgroundColor: palette.card,
          borderTopColor: palette.border,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => <Ionicons name="wallet" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Pay"
        component={PayScreen}
        options={{
          title: 'Pay',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code" size={size + 4} color={isDark ? '#2DD4BF' : palette.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, size }) => <Ionicons name="gift" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
