import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
  runOnJS,
  useDerivedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { useThemeColors } from '@/src/shared/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 100;
const CX = 50;
const CY = 56;
const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_FRACTION = 0.75;
const TOTAL_ARC = CIRCUMFERENCE * ARC_FRACTION;
const GAP = CIRCUMFERENCE - TOTAL_ARC;
const ROTATION = 135;

interface MetricGaugeProps {
  value: SharedValue<number>;
  min: number;
  max: number;
  unit: string;
  label: string;
  color: string;
  warningThreshold?: number;
  criticalThreshold?: number;
}

export function MetricGauge({
  value,
  min,
  max,
  unit,
  label,
  color,
  warningThreshold,
  criticalThreshold,
}: MetricGaugeProps) {
  const colors = useThemeColors();
  const [displayValue, setDisplayValue] = useState((min + max) / 2);
  const [statusColor, setStatusColor] = useState(color);

  const fraction = useDerivedValue(() => {
    'worklet';
    const f = (value.value - min) / (max - min);
    return Math.max(0, Math.min(1, f));
  });

  const animatedProps = useAnimatedProps(() => {
    'worklet';
    const filled = fraction.value * TOTAL_ARC;
    return {
      strokeDashoffset: TOTAL_ARC - filled,
    };
  });

  useAnimatedReaction(
    () => value.value,
    (current) => {
      runOnJS(setDisplayValue)(current);
    },
  );

  useAnimatedReaction(
    () => value.value,
    (current) => {
      if (criticalThreshold !== undefined && current >= criticalThreshold) {
        runOnJS(setStatusColor)(colors.status.error);
      } else if (warningThreshold !== undefined && current >= warningThreshold) {
        runOnJS(setStatusColor)(colors.status.warning);
      } else {
        runOnJS(setStatusColor)(color);
      }
    },
  );

  const formattedValue =
    unit === 'RPM'
      ? `${Math.round(displayValue)}`
      : unit === 'bar'
        ? displayValue.toFixed(1)
        : displayValue.toFixed(1);

  return (
    <View style={styles.container}>
      <View style={styles.svgWrapper}>
        <Svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <Circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke={colors.neutral.gray200}
            strokeWidth={7}
            strokeDasharray={[TOTAL_ARC, GAP]}
            strokeLinecap="round"
            transform={`rotate(${ROTATION}, ${CX}, ${CY})`}
          />
          <AnimatedCircle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke={statusColor}
            strokeWidth={7}
            strokeDasharray={[TOTAL_ARC, GAP]}
            strokeLinecap="round"
            transform={`rotate(${ROTATION}, ${CX}, ${CY})`}
            animatedProps={animatedProps}
          />
        </Svg>
        <View style={styles.valueOverlay} pointerEvents="none">
          <Text style={[styles.value, { color: colors.text.primary }]}>{formattedValue}</Text>
          <Text style={[styles.unit, { color: statusColor + '99' }]}>{unit}</Text>
        </View>
      </View>
      <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  svgWrapper: { width: SIZE, height: SIZE, position: 'relative' },
  valueOverlay: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: { fontSize: 18, fontWeight: '700', lineHeight: 22 },
  unit: { fontSize: 12, fontWeight: '600' },
  label: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
});
