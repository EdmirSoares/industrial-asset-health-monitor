import { View, Text, StyleSheet, TextInput } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { type SharedValue } from 'react-native-reanimated';
import { useThemeColors } from '@/src/shared/theme';
import { useMetricGauge } from '../lib/useMetricGauge';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const SIZE = 100;
const CX = 50;
const CY = 56;
const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_FRACTION = 0.75;
const TOTAL_ARC = CIRCUMFERENCE * ARC_FRACTION;
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

  const { animatedCircleProps, textProps, animatedUnitStyle } = useMetricGauge({
    value,
    min,
    max,
    unit,
    color,
    warningThreshold,
    criticalThreshold,
    CIRCUMFERENCE,
    TOTAL_ARC,
  });

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
            strokeDasharray={`${TOTAL_ARC} ${CIRCUMFERENCE}`}
            strokeLinecap="round"
            transform={`rotate(${ROTATION}, ${CX}, ${CY})`}
          />
          <AnimatedCircle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            strokeWidth={7}
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeLinecap="round"
            transform={`rotate(${ROTATION}, ${CX}, ${CY})`}
            animatedProps={animatedCircleProps}
          />
        </Svg>
        <View style={styles.valueOverlay} pointerEvents="none">
          <AnimatedTextInput
            editable={false}
            animatedProps={textProps}
            style={[styles.value, { color: colors.text.primary, padding: 0, margin: 0, textAlign: 'center' }]}
          />
          <Animated.Text style={[styles.unit, animatedUnitStyle]}>{unit}</Animated.Text>
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
