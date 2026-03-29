import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/src/shared/theme';
import { AssetStatus } from '@/src/entities/asset/model/types';
import { getStatusLabel } from '@/src/shared/lib/formatters';
import { usePulseAnimation } from '@/src/shared/lib/hooks/usePulseAnimation';

interface AssetHeaderProps {
  assetId: string;
  location?: string;
  status: AssetStatus;
  onBack: () => void;
}

export function AssetHeader({ assetId, location, status, onBack }: AssetHeaderProps) {
  const colors = useThemeColors();

  const statusColorMap: Record<AssetStatus, string> = {
    normal: colors.status.success,
    warning: colors.status.warning,
    critical: colors.status.error,
    offline: colors.neutral.gray500,
  };

  const statusColor = statusColorMap[status];

  const pulseStyle = usePulseAnimation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Ionicons name="arrow-back" size={26} color={colors.text.primary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.id, { color: colors.text.secondary }]}>ID: {assetId}</Text>
        {location ? (
          <Text style={[styles.location, { color: colors.text.disabled }]}>{location}</Text>
        ) : null}
      </View>

      <View style={styles.statusBlock}>
        <Animated.View
          style={[styles.statusDot, { backgroundColor: statusColor }, pulseStyle]}
        />
        <Text style={[styles.statusLabel, { color: statusColor }]}>
          {getStatusLabel(status)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  backButton: { padding: 4 },
  content: { flex: 1 },
  name: { fontSize: 19, fontWeight: '700', marginBottom: 1 },
  id: { fontSize: 24, fontWeight: '700' },
  location: { fontSize: 12, marginTop: 1 },
  statusBlock: { alignItems: 'center', gap: 8, flexDirection: 'row' },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
});
