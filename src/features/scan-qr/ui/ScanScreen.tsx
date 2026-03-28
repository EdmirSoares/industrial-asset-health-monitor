import { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useAssetStore } from '@/src/entities/asset/model/store';
import useCamera from '../model/useCamera';

const SCAN_BOX = 250;
const CORNER = 40;
const ACCENT = '#00E5FF';

export default function ScanScreen() {
  const router = useRouter();
  const setAsset = useAssetStore((state) => state.setAsset);
  const { hasPermission, device, cameraRef, codeScanner, scannedCode, isActive } = useCamera();

  const laserY = useSharedValue(0);
  useEffect(() => {
    laserY.value = withRepeat(
      withTiming(SCAN_BOX - 4, { duration: 1800, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const laserStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: laserY.value }],
  }));

  useEffect(() => {
    if (scannedCode) {
      setAsset({ id: scannedCode, name: `Ativo #${scannedCode.slice(-4)}`, threshold: 80 });
      router.push(`/asset/${scannedCode}`);
    }
  }, [scannedCode, setAsset, router]);

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Aguardando permissão da câmara...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Câmara não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
      />

      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Scanner de Ativos</Text>
        </View>

        <View style={styles.scanBox}>
          <View style={[styles.corner, styles.tl]} />
          <View style={[styles.corner, styles.tr]} />
          <View style={[styles.corner, styles.bl]} />
          <View style={[styles.corner, styles.br]} />

          <Animated.View style={[styles.laser, laserStyle]} />
        </View>

        <Text style={styles.hint}>Aponte para o QR Code do equipamento</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: { color: 'white', fontSize: 16 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  backBtn: { marginRight: 16 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  scanBox: {
    width: SCAN_BOX,
    height: SCAN_BOX,
    position: 'relative',
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
    borderColor: ACCENT,
    borderWidth: 3,
  },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  laser: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: ACCENT,
    opacity: 0.85,
    shadowColor: ACCENT,
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  hint: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    marginBottom: 10,
  },
});
