import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import { MealsScreen } from './screens/MealsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ScannerScreen } from './screens/ScannerScreen';
import { TrackerScreen } from './screens/TrackerScreen';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

const AppTabs = createBottomTabNavigator({
  screens: {
    Tracker: {
      screen: TrackerScreen,
      options: {
        title: 'Tracker',
        headerShown: false,
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
      },
    },
    Meals: {
      screen: MealsScreen,
      options: {
        title: 'Meals',
        headerShown: false,
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="fork.knife" color={color} />,
      },
    },
    Scanner: {
      screen: ScannerScreen,
      options: {
        title: 'Scanner',
        headerShown: false,
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="barcode.viewfinder" color={color} />,
      },
    },
    Profile: {
      screen: ProfileScreen,
      options: {
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
    tabBarStyle: Platform.select({
      ios: {
        // Use a transparent background on iOS to show the blur effect
        position: 'absolute',
      },
      default: {},
    }),
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    AppTabs: {
      screen: AppTabs,
      options: {
        headerShown: false,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
