import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

export function usePulseAnimation() {
    const pulseOpacity = useSharedValue(1);

    useEffect(() => {
        pulseOpacity.value = withRepeat(
            withSequence(withTiming(0.25, { duration: 700 }), withTiming(1, { duration: 700 })),
            -1,
        );
    }, []);

    const pulseStyle = useAnimatedStyle(() => ({ opacity: pulseOpacity.value }));
    return pulseStyle;
}
