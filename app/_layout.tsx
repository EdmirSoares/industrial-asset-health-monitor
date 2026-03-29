import { Stack } from 'expo-router';
import { useThemeColors } from '@/src/shared/theme';

export default function Layout() {
  const colors = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.secondary },
      }}>
      <Stack.Screen name="index" options={{ title: 'Ativos Industriais' }} />
      <Stack.Screen
        name="scan"
        options={{ title: 'Escanear QR Code', presentation: 'modal' }}
      />
      <Stack.Screen name="asset/[id]" options={{ title: 'Detalhes do Ativo' }} />
    </Stack>
  );
}
