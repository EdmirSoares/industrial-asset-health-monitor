import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, useThemeMode } from '@/src/shared/theme';
import { SOFT_SHADOW } from '@/src/shared/ui/shadows';
import { TelemetryChart } from '@/src/features/telemetry-monitor/ui/TelemetryChart';
import { MetricGauge } from '@/src/features/telemetry-monitor/ui/MetricGauge';
import { useLiveTelemetry, SENSOR_CONFIG } from '@/src/features/telemetry-monitor/lib/useLiveTelemetry';
import { formatTime } from '@/src/shared/lib/formatters';

interface TelemetryPanelProps {
  assetId?: string;
}

export function TelemetryPanel({ assetId }: TelemetryPanelProps) {
  const colors = useThemeColors();
  const mode = useThemeMode();
  const cardBg = mode === 'dark' ? colors.background.darkCard : colors.background.primary;

  const {
    vibration,
    temperature,
    pressure,
    rpm,
    vibrationHistory,
    loading,
    lastUpdated,
  } = useLiveTelemetry(assetId);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: cardBg }, SOFT_SHADOW]}>
        <View style={styles.cardHeader}>
          <Ionicons name="pulse" size={18} color={colors.feature.telemetry.primary} />
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>
            Vibração em Tempo Real
          </Text>
          {lastUpdated && (
            <Text style={[styles.timestamp, { color: colors.text.disabled }]}>
              {formatTime(lastUpdated)}
            </Text>
          )}
          {loading && (
            <Text style={[styles.timestamp, { color: colors.text.disabled }]}>
              Atualizando…
            </Text>
          )}
        </View>
        <TelemetryChart
          history={vibrationHistory}
          maxValue={100}
          color={colors.feature.telemetry.primary}
        />
        <View style={styles.chartFooter}>
          <Text style={[styles.chartFooterLabel, { color: colors.text.disabled }]}>
            {SENSOR_CONFIG.vibration.min} Hz
          </Text>
          <Text style={[styles.chartFooterLabel, { color: colors.text.disabled }]}>
            {SENSOR_CONFIG.vibration.max} Hz
          </Text>
        </View>
      </View>

      <View style={styles.gaugeGrid}>
        <View style={[styles.gaugeCard, { backgroundColor: cardBg }, SOFT_SHADOW]}>
          <MetricGauge
            value={temperature}
            min={SENSOR_CONFIG.temperature.min}
            max={SENSOR_CONFIG.temperature.max}
            unit="°C"
            label="Temperatura"
            color={colors.feature.telemetry.temperature}
            warningThreshold={82}
            criticalThreshold={90}
          />
        </View>

        <View style={[styles.gaugeCard, { backgroundColor: cardBg }, SOFT_SHADOW]}>
          <MetricGauge
            value={pressure}
            min={SENSOR_CONFIG.pressure.min}
            max={SENSOR_CONFIG.pressure.max}
            unit="bar"
            label="Pressão"
            color={colors.feature.telemetry.vibration}
            warningThreshold={7.0}
            criticalThreshold={8.0}
          />
        </View>

        <View style={[styles.gaugeCard, { backgroundColor: cardBg }, SOFT_SHADOW]}>
          <MetricGauge
            value={rpm}
            min={SENSOR_CONFIG.rpm.min}
            max={SENSOR_CONFIG.rpm.max}
            unit="RPM"
            label="Rotação"
            color={colors.primary.main}
            warningThreshold={2400}
            criticalThreshold={2700}
          />
        </View>

        <View style={[styles.gaugeCard, { backgroundColor: cardBg }, SOFT_SHADOW]}>
          <MetricGauge
            value={vibration}
            min={SENSOR_CONFIG.vibration.min}
            max={SENSOR_CONFIG.vibration.max}
            unit="Hz"
            label="Vibração"
            color={colors.feature.telemetry.primary}
            warningThreshold={65}
            criticalThreshold={75}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  card: { borderRadius: 16, padding: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  cardTitle: { flex: 1, fontSize: 15, fontWeight: '600' },
  timestamp: { fontSize: 10 },
  chartFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  chartFooterLabel: { fontSize: 10 },
  gaugeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gaugeCard: {
    flex: 1,
    minWidth: '44%',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});
