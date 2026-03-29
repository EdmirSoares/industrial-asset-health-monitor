import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useThemeColors, useThemeMode } from '@/src/shared/theme';
import { SOFT_SHADOW } from '@/src/shared/ui/shadows';
import { getStatusLabel } from '@/src/shared/lib/formatters';
import { Asset, AssetStatus } from '../model/types';
import { ASSET_ICON } from '../model/mockAssets';

interface AssetBentoCardProps {
  asset: Asset;
  isFullWidth?: boolean;
  onPress: () => void;
}

function statusColor(status: AssetStatus, colors: ReturnType<typeof useThemeColors>) {
  if (status === 'normal') return colors.status.success;
  if (status === 'warning') return colors.status.warning;
  if (status === 'critical') return colors.status.error;
  return colors.neutral.gray500;
}

export function AssetBentoCard({ asset, isFullWidth, onPress }: AssetBentoCardProps) {
  const colors = useThemeColors();
  const mode = useThemeMode();
  const cardBg = mode === 'dark' ? colors.background.darkCard : colors.background.primary;

  const sc = statusColor(asset.status, colors);
  const isFull = isFullWidth ?? false;
  const icon = (ASSET_ICON[asset.type ?? 'generic'] ?? 'cube') as any;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isFull ? styles.cardFull : styles.cardHalf,
        { backgroundColor: cardBg },
        SOFT_SHADOW,
      ]}
      onPress={onPress}
      activeOpacity={0.82}>
      <View style={styles.topRow}>
        <Feather name="chevron-right" size={48} color={colors.primary.main + '40'} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text.primary }]} numberOfLines={2}>
          {asset.name}
        </Text>

        <Text style={[styles.id, { color: colors.text.primary + '80' }]}>{asset.id}</Text>

        {isFull && asset.location ? (
          <Text style={[styles.location, { color: colors.text.secondary }]} numberOfLines={1}>
            {asset.location}
          </Text>
        ) : null}

        <View style={styles.footer}>
          <View style={[styles.statusPill, { backgroundColor: sc + '18' }]}>
            <View style={[styles.statusDot, { backgroundColor: sc }]} />
            <Text style={[styles.statusText, { color: sc }]}>{getStatusLabel(asset.status)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 20, padding: 14, gap: 3, position: 'relative' },
  cardFull: { flex: 1 },
  cardHalf: { flex: 1, minWidth: '45%', aspectRatio: 1.15 },
  topRow: {
    transform: [{ rotate: '-45deg' }],
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  name: { fontSize: 18, fontWeight: '900', lineHeight: 22 },
  id: { fontSize: 12, fontWeight: '600', letterSpacing: 0.6, paddingBottom: 12 },
  location: { fontSize: 11, marginTop: 1 },
  footer: { marginTop: 10 },
  statusPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
});
