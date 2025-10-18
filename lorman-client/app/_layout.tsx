import Header from '@/components/custom/Header';
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <View className="flex h-screen w-screen items-center justify-center">
        <View style={{ flex: 1 }} className="w-full">
          <Stack screenOptions={{ headerShown: false }} />
          <PortalHost />
        </View>
      </View>

      <Toast position="bottom"/>
    </ThemeProvider>
  );
}



