import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Ativos Industriais',
        }}
      />
      <Stack.Screen
        name="scan"
        options={{
          title: 'Escanear QR Code',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="asset/[id]"
        options={{
          title: 'Detalhes do Ativo',
        }}
      />
    </Stack>
  );
}
