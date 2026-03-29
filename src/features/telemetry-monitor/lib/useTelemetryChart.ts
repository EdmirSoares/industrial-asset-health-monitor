import { useAnimatedProps } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

export function useTelemetryChart(
    history: SharedValue<number[]>,
    maxValue: number,
    CHART_W: number,
    CHART_H: number,
    PADDING_V: number
) {
    const animatedFillProps = useAnimatedProps(() => {
        'worklet';
        const pts = history.value;
        if (pts.length < 2) return { d: '' };

        const n = pts.length;
        let d = '';
        for (let i = 0; i < n; i++) {
            const x = (i / (n - 1)) * CHART_W;
            const normalized = pts[i] / maxValue;
            const y = CHART_H - PADDING_V - normalized * (CHART_H - PADDING_V * 2);
            d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
        }
        d += ` L ${CHART_W} ${CHART_H} L 0 ${CHART_H} Z`;
        return { d };
    });

    const animatedLineProps = useAnimatedProps(() => {
        'worklet';
        const pts = history.value;
        if (pts.length < 2) return { d: '' };

        const n = pts.length;
        let d = '';
        for (let i = 0; i < n; i++) {
            const x = (i / (n - 1)) * CHART_W;
            const normalized = pts[i] / maxValue;
            const y = CHART_H - PADDING_V - normalized * (CHART_H - PADDING_V * 2);
            d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
        }
        return { d };
    });

    return { animatedFillProps, animatedLineProps };
}
