import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { BudgetAppProvider } from '@/Contexts/BudgetAppContext';

//SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  return (
    <BudgetAppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </BudgetAppProvider>
  );
}
