import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, useThemeShadows } from '@/src/shared/theme';
import { Asset, AssetStatus } from '../model/types';
import { StatusBadge } from '@/src/shared/ui/StatusBadge';
import { formatDate } from '@/src/shared/lib/formatters';
import { useAssetCardAnimation } from '../lib/useAssetCardAnimation';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface AssetCardProps {
  asset: Asset;
  onPress: () => void;
}

const STATUS_ICON: Record<AssetStatus, string> = {
  normal: 'checkmark-circle',
  warning: 'warning',
  critical: 'alert-circle',
  offline: 'power',
};

export function AssetCard({ asset, onPress }: AssetCardProps) {
  const colors = useThemeColors();
  const shadows = useThemeShadows();

  const { animatedStyle, onPressIn, onPressOut } = useAssetCardAnimation();

  const statusColorMap: Record<AssetStatus, string> = {
    normal: colors.status.success,
    warning: colors.status.warning,
    critical: colors.status.error,
    offline: colors.neutral.gray500,
  };

  return (
    <AnimatedTouchable
      style={[
        styles.card,
        animatedStyle,
        { backgroundColor: colors.background.primary, ...shadows.md },
      ]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text.primary }]}>{asset.name}</Text>
          <Text style={[styles.id, { color: colors.text.secondary }]}>ID: {asset.id}</Text>
          {asset.location ? (
            <Text style={[styles.location, { color: colors.text.disabled }]}>{asset.location}</Text>
          ) : null}
        </View>
        <View style={[styles.badge, { backgroundColor: statusColorMap[asset.status] }]}>
          <Ionicons name={STATUS_ICON[asset.status] as any} size={22} color="#fff" />
        </View>
      </View>
      <View style={[styles.footer, { borderTopColor: colors.border.divider }]}>
        <StatusBadge status={asset.status} showLabel size="sm" />
        {asset.lastCheck ? (
          <Text style={[styles.lastCheck, { color: colors.text.disabled }]}>
            {formatDate(asset.lastCheck)}
          </Text>
        ) : null}
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, padding: 16, marginBottom: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  info: { flex: 1, marginRight: 12 },
  name: { fontSize: 17, fontWeight: '600', marginBottom: 2 },
  id: { fontSize: 13, marginBottom: 2 },
  location: { fontSize: 12 },
  badge: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  lastCheck: { fontSize: 11 },
});
