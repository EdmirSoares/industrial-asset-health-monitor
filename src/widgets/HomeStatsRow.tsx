import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors, useThemeMode } from '@/src/shared/theme';
import { SOFT_SHADOW } from '@/src/shared/ui/shadows';

interface HomeStatsRowProps {
  total: number;
  operational: number;
  alerts: number;
}

interface StatCardProps {
  value: number;
  label: string;
  valueColor: string;
  bg: string;
}

function StatCard({ value, label, valueColor, bg }: StatCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: bg }, SOFT_SHADOW]}>
      <Text style={[styles.value, { color: valueColor }]}>
        {value < 10 ? `0${value}` : value}
      </Text>
      <Text style={[styles.label, { color: valueColor + '90' }]}>{label}</Text>
    </View>
  );
}

export function HomeStatsRow({ total, operational, alerts }: HomeStatsRowProps) {
  const colors = useThemeColors();
  const mode = useThemeMode();
  const cardBg = mode === 'dark' ? colors.background.darkCard : colors.background.primary;

  return (
    <View style={styles.row}>
      <StatCard value={total} label="TOTAL" valueColor={colors.text.primary} bg={cardBg} />
      <StatCard value={operational} label="OK" valueColor={colors.status.success} bg={cardBg} />
      <StatCard
        value={alerts}
        label="ALERTAS"
        valueColor={alerts > 0 ? colors.status.error : colors.text.disabled}
        bg={cardBg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  card: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 13,
    paddingHorizontal: 12,
    aspectRatio: 1,
  },
  value: { fontSize: 52, fontWeight: '800' },
  label: { fontSize: 12, fontWeight: '700', letterSpacing: 0.9, marginTop: 3, alignSelf: 'flex-end' },
});
