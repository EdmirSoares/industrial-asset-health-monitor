import {
    useAnimatedProps,
    useDerivedValue,
    useAnimatedStyle,
    type SharedValue,
} from 'react-native-reanimated';
import { useThemeColors } from '@/src/shared/theme';

interface UseMetricGaugeProps {
    value: SharedValue<number>;
    min: number;
    max: number;
    unit: string;
    color: string;
    warningThreshold?: number;
    criticalThreshold?: number;
    CIRCUMFERENCE: number;
    TOTAL_ARC: number;
}

export function useMetricGauge({
    value,
    min,
    max,
    unit,
    color,
    warningThreshold,
    criticalThreshold,
    CIRCUMFERENCE,
    TOTAL_ARC,
}: UseMetricGaugeProps) {
    const colors = useThemeColors();

    const fraction = useDerivedValue(() => {
        'worklet';
        const f = (value.value - min) / (max - min);
        return Math.max(0, Math.min(1, f));
    });

    const animatedColor = useDerivedValue(() => {
        'worklet';
        if (criticalThreshold !== undefined && value.value >= criticalThreshold) {
            return colors.status.error;
        } else if (warningThreshold !== undefined && value.value >= warningThreshold) {
            return colors.status.warning;
        } else {
            return color;
        }
    });

    const animatedCircleProps = useAnimatedProps(() => {
        'worklet';
        const filled = fraction.value * TOTAL_ARC;
        return {
            strokeDashoffset: CIRCUMFERENCE - filled,
            stroke: animatedColor.value,
        };
    });

    const textProps = useAnimatedProps(() => {
        'worklet';
        const current = value.value;
        const formatted =
            unit === 'RPM'
                ? `${Math.round(current)}`
                : current.toFixed(1);

        return {
            text: formatted,
            defaultValue: formatted,
            value: formatted,
        } as any;
    });

    const animatedUnitStyle = useAnimatedStyle(() => {
        return {
            color: animatedColor.value + '99',
        };
    });

    return {
        animatedCircleProps,
        textProps,
        animatedUnitStyle,
        colors,
    };
}
