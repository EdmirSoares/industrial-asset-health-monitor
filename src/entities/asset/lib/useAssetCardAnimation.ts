import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export function useAssetCardAnimation() {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const onPressIn = () => {
        scale.value = withSpring(0.97, { damping: 15 });
    };

    const onPressOut = () => {
        scale.value = withSpring(1, { damping: 15 });
    };

    return { animatedStyle, onPressIn, onPressOut };
}
