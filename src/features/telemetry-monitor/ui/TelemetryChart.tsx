import { View, StyleSheet } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import Animated, { type SharedValue } from 'react-native-reanimated';
import { useTelemetryChart } from '../lib/useTelemetryChart';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CHART_W = 400;
const CHART_H = 130;
const PADDING_V = 8;

interface TelemetryChartProps {
  history: SharedValue<number[]>;
  maxValue?: number;
  color?: string;
}

export function TelemetryChart({ history, maxValue = 100, color = '#00E5FF' }: TelemetryChartProps) {
  const { animatedFillProps, animatedLineProps } = useTelemetryChart(history, maxValue, CHART_W, CHART_H, PADDING_V);

  const gridY25 = CHART_H - PADDING_V - 0.25 * (CHART_H - PADDING_V * 2);
  const gridY50 = CHART_H - PADDING_V - 0.5 * (CHART_H - PADDING_V * 2);
  const gridY75 = CHART_H - PADDING_V - 0.75 * (CHART_H - PADDING_V * 2);

  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height={CHART_H}
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        preserveAspectRatio="none">
        <Line x1={0} y1={gridY25} x2={CHART_W} y2={gridY25} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        <Line x1={0} y1={gridY50} x2={CHART_W} y2={gridY50} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <Line x1={0} y1={gridY75} x2={CHART_W} y2={gridY75} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        <AnimatedPath animatedProps={animatedFillProps} fill={`${color}18`} stroke="none" />
        <AnimatedPath
          animatedProps={animatedLineProps}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
