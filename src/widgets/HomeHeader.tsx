import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, useThemeMode } from '@/src/shared/theme';
import { ThemeToggle } from '@/src/shared/ui/ThemeToggle';
import { SOFT_SHADOW } from '@/src/shared/ui/shadows';

interface HomeHeaderProps {
  totalAssets: number;
  onScanPress: () => void;
}

export function HomeHeader({ totalAssets, onScanPress }: HomeHeaderProps) {
  const colors = useThemeColors();
  const mode = useThemeMode();
  const cardBg = mode === 'dark' ? colors.background.darkCard : colors.background.primary;

  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Ativos {'\n'} Industriais
        </Text>
        <Text style={[styles.sub, { color: colors.text.disabled }]}>
          {totalAssets} equipamentos monitorados
        </Text>
      </View>

      <View style={styles.actions}>
        <ThemeToggle size={22} />
        <TouchableOpacity
          style={[styles.scanBtn, { backgroundColor: cardBg }, SOFT_SHADOW]}
          onPress={onScanPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="qr-code" size={20} color={colors.primary.main} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 32,
  },
  titleBlock: { flexDirection: 'column', alignItems: 'flex-start' },
  title: { fontSize: 32, fontWeight: '800', letterSpacing: -0.3 },
  sub: { fontSize: 12, marginTop: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  scanBtn: {
    width: 38,
    height: 38,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
