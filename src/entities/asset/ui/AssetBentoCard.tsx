import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, useThemeMode } from '@/src/shared/theme';
import { SOFT_SHADOW } from '@/src/shared/ui/shadows';
import { getStatusLabel } from '@/src/shared/lib/formatters';
import { Asset, AssetStatus } from '../model/types';
import { ASSET_ICON } from '../model/mockAssets';

interface AssetBentoCardProps {
  asset: Asset;
  onPress: () => void;
}

function statusColor(status: AssetStatus, colors: ReturnType<typeof useThemeColors>) {
  if (status === 'normal') return colors.status.success;
  if (status === 'warning') return colors.status.warning;
  if (status === 'critical') return colors.status.error;
  return colors.neutral.gray500;
}

export function AssetBentoCard({ asset, onPress }: AssetBentoCardProps) {
  const colors = useThemeColors();
  const mode = useThemeMode();
  const cardBg = mode === 'dark' ? colors.background.darkCard : colors.background.primary;

  const sc = statusColor(asset.status, colors);
  const isFull = asset.status === 'critical';
  const icon = (ASSET_ICON[asset.type ?? 'generic'] ?? 'cube') as any;

  return (
    <TouchableOpacity
      style={[styles.card, isFull ? styles.cardFull : styles.cardHalf, { backgroundColor: cardBg }, SOFT_SHADOW]}
      onPress={onPress}
      activeOpacity={0.82}>

      <View style={styles.topRow}>
        <View style={[styles.iconCircle, { backgroundColor: sc + '18' }]}>
          <Ionicons name={icon} size={16} color={sc} />
        </View>
        <Ionicons name="chevron-forward" size={14} color={colors.text.disabled} />
      </View>

      <Text style={[styles.name, { color: colors.text.primary }]} numberOfLines={2}>
        {asset.name}
      </Text>

      <Text style={[styles.id, { color: colors.text.disabled }]}>
        {asset.id}
      </Text>

      {isFull && asset.location ? (
        <Text style={[styles.location, { color: colors.text.secondary }]} numberOfLines={1}>
          {asset.location}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <View style={[styles.statusPill, { backgroundColor: sc + '18' }]}>
          <View style={[styles.statusDot, { backgroundColor: sc }]} />
          <Text style={[styles.statusText, { color: sc }]}>
            {getStatusLabel(asset.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 20, padding: 14, gap: 3 },
  cardFull: { width: '100%' },
  cardHalf: { width: '49%', aspectRatio: 1.15 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 14, fontWeight: '700', lineHeight: 19 },
  id: { fontSize: 10, fontWeight: '600', letterSpacing: 0.6 },
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
