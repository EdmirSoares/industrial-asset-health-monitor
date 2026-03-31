import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useAssetStore } from '@/src/entities/asset/model/store';
import useCamera from '../model/useCamera';

export function useScanScreen(scanBoxSize: number) {
    const router = useRouter();
    const setAsset = useAssetStore((state) => state.setAsset);
    const cameraState = useCamera();

    const [manualId, setManualId] = useState('');

    const laserY = useSharedValue(0);
    useEffect(() => {
        laserY.value = withRepeat(
            withTiming(scanBoxSize - 4, { duration: 1800, easing: Easing.linear }),
            -1,
            true,
        );
    }, [scanBoxSize]);
    const laserStyle = useAnimatedStyle(() => ({ transform: [{ translateY: laserY.value }] }));

    useEffect(() => {
        if (cameraState.scannedCode) {
            setAsset({ id: cameraState.scannedCode, name: `Ativo #${cameraState.scannedCode.slice(-4)}`, threshold: 80 });
            router.push(`/asset/${cameraState.scannedCode}`);
        }
    }, [cameraState.scannedCode]);

    const handleManualSubmit = () => {
        const id = manualId.trim();
        if (!id) return;
        setAsset({ id, name: `Ativo #${id.slice(-4)}`, threshold: 80 });
        router.push(`/asset/${id}`);
    };

    return {
        router,
        manualId,
        setManualId,
        laserStyle,
        handleManualSubmit,
        cameraState,
    };
}
