import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, useThemeMode } from '@/src/shared/theme';
import { SOFT_SHADOW } from '@/src/shared/ui/shadows';

interface ScanCtaBannerProps {
  onPress: () => void;
}

export function ScanCtaBanner({ onPress }: ScanCtaBannerProps) {
  const colors = useThemeColors();
  const mode = useThemeMode();
  const cardBg = mode === 'dark' ? colors.background.darkCard : colors.background.primary;

  return (
    <TouchableOpacity
      style={[styles.banner, { backgroundColor: cardBg }, SOFT_SHADOW]}
      onPress={onPress}
      activeOpacity={0.85}>
      <View style={styles.iconBg}>
        <Ionicons name="qr-code-outline" size={182} color={colors.feature.scan.accent} />
      </View>
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Escanear{'\n'}QR Code
        </Text>
        <Text style={[styles.sub, { color: colors.text.primary + '90' }]}>
          Identifique qualquer{'\n'}equipamento
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 14,
    paddingLeft: 32,
    gap: 24,
    aspectRatio: 2,
  },
  iconBg: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 12,
  },
  textBlock: { flex: 1 },
  title: { fontSize: 32, fontWeight: '900' },
  sub: { fontSize: 14, marginTop: 2 },
});
