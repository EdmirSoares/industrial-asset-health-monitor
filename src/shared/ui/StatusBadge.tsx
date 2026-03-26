import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '@/src/shared/theme';
import { AssetStatus } from '@/src/entities/asset/model/types';
import { getStatusLabel } from '@/src/shared/lib/formatters';

interface StatusBadgeProps {
  status: AssetStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, showLabel = false, size = 'md' }: StatusBadgeProps) {
  const colors = useThemeColors();

  const colorMap: Record<AssetStatus, string> = {
    normal: colors.status.success,
    warning: colors.status.warning,
    critical: colors.status.error,
    offline: colors.neutral.gray500,
  };

  const dotSize = size === 'sm' ? 8 : 12;
  const color = colorMap[status];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dot,
          { width: dotSize, height: dotSize, borderRadius: dotSize / 2, backgroundColor: color },
        ]}
      />
      {showLabel && (
        <Text style={[styles.label, { color, fontSize: size === 'sm' ? 11 : 13 }]}>
          {getStatusLabel(status)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: {},
  label: { fontWeight: '700', letterSpacing: 0.5 },
});
