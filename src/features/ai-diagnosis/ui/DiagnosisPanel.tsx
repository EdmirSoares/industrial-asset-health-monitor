import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, useThemeMode } from '@/src/shared/theme';
import { SOFT_SHADOW } from '@/src/shared/ui/shadows';
import { useDiagnosis } from '../lib/useDiagnosis';
import { useSkeletonAnimation } from '@/src/shared/lib/hooks/useSkeletonAnimation';

interface DiagnosisPanelProps {
  assetId: string;
}

export function DiagnosisPanel({ assetId }: DiagnosisPanelProps) {
  const colors = useThemeColors();
  const mode = useThemeMode();
  const cardBg = mode === 'dark' ? colors.background.darkCard : colors.background.primary;

  const { loading, result, error, load } = useDiagnosis(assetId);
  const skeletonStyle = useSkeletonAnimation();

  const aiColor = colors.feature.ai.primary;

  const severityColor =
    result?.severity === 'high'
      ? colors.status.error
      : result?.severity === 'medium'
        ? colors.status.warning
        : colors.status.success;

  return (
    <View style={[styles.card, { backgroundColor: cardBg }, SOFT_SHADOW]}>
      <View style={styles.header}>
        <Ionicons name="hardware-chip-outline" size={20} color={aiColor} />
        <Text style={[styles.title, { color: aiColor }]}>Análise Preditiva (IA)</Text>
        <TouchableOpacity onPress={load} style={styles.refreshBtn} disabled={loading}>
          <Ionicons
            name="refresh"
            size={18}
            color={loading ? colors.text.disabled : aiColor}
          />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.skeletonContainer}>
          {([100, 100, 60] as const).map((w, i) => (
            <Animated.View
              key={i}
              style={[
                styles.skeletonLine,
                { backgroundColor: colors.neutral.gray300, width: `${w}%` },
                skeletonStyle,
              ]}
            />
          ))}
        </View>
      )}

      {!loading && error && (
        <Text style={[styles.errorText, { color: colors.text.disabled }]}>
          Análise indisponível no momento.
        </Text>
      )}

      {!loading && result && !error && (
        <View style={styles.result}>
          <View style={styles.probRow}>
            <Text style={[styles.probLabel, { color: colors.text.secondary }]}>
              Falha em {result.component}:
            </Text>
            <Text style={[styles.probValue, { color: severityColor }]}>
              {(result.probability * 100).toFixed(0)}%
            </Text>
          </View>

          <View style={[styles.probBarTrack, { backgroundColor: colors.neutral.gray200 }]}>
            <View
              style={[
                styles.probBarFill,
                {
                  width: `${result.probability * 100}%`,
                  backgroundColor: severityColor,
                },
              ]}
            />
          </View>

          <Text style={[styles.horizon, { color: colors.text.disabled }]}>
            Horizonte: {result.timeHorizon}
          </Text>
          <Text style={[styles.recommendation, { color: colors.text.secondary }]}>
            {result.recommendation}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 12,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  title: { flex: 1, fontSize: 15, fontWeight: '600' },
  refreshBtn: { padding: 4 },
  skeletonContainer: { gap: 8 },
  skeletonLine: { height: 13, borderRadius: 4 },
  errorText: { fontSize: 14, textAlign: 'center', paddingVertical: 8 },
  result: { gap: 8 },
  probRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  probLabel: { fontSize: 13 },
  probValue: { fontSize: 22, fontWeight: '700' },
  probBarTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  probBarFill: { height: '100%', borderRadius: 3 },
  horizon: { fontSize: 12 },
  recommendation: { fontSize: 14, lineHeight: 20 },
});
