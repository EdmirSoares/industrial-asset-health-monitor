import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

export function useSkeletonAnimation() {
    const skeletonOpacity = useSharedValue(0.4);
    const skeletonStyle = useAnimatedStyle(() => ({ opacity: skeletonOpacity.value }));

    useEffect(() => {
        skeletonOpacity.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
    }, []);

    return skeletonStyle;
}
