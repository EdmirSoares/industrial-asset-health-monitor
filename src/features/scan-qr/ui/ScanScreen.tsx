import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
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

let Camera: any = null;
try {
  Camera = require('react-native-vision-camera').Camera;
} catch {
  Camera = null;
}

const SCAN_BOX = 250;
const CORNER = 40;
const ACCENT = '#00E5FF';

export default function ScanScreen() {
  const router = useRouter();
  const setAsset = useAssetStore((state) => state.setAsset);
  const { isAvailable, hasPermission, device, cameraRef, codeScanner, scannedCode, isActive, isDeviceLoading } =
    useCamera();

  const [manualId, setManualId] = useState('');

  const laserY = useSharedValue(0);
  useEffect(() => {
    laserY.value = withRepeat(
      withTiming(SCAN_BOX - 4, { duration: 1800, easing: Easing.linear }),
      -1,
      true,
    );
  }, []);
  const laserStyle = useAnimatedStyle(() => ({ transform: [{ translateY: laserY.value }] }));

  useEffect(() => {
    if (scannedCode) {
      setAsset({ id: scannedCode, name: `Ativo #${scannedCode.slice(-4)}`, threshold: 80 });
      router.push(`/asset/${scannedCode}`);
    }
  }, [scannedCode]);

  const handleManualSubmit = () => {
    const id = manualId.trim();
    if (!id) return;
    setAsset({ id, name: `Ativo #${id.slice(-4)}`, threshold: 80 });
    router.push(`/asset/${id}`);
  };

  if (!isAvailable) {
    return (
      <KeyboardAvoidingView
        style={styles.fallbackContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity onPress={() => router.back()} style={styles.fallbackBack}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        <View style={styles.fallbackContent}>
          <Ionicons name="qr-code-outline" size={72} color={ACCENT} style={{ marginBottom: 24 }} />
          <Text style={styles.fallbackTitle}>Câmara indisponível</Text>
          <Text style={styles.fallbackSub}>
            O scanner de câmara requer um build nativo.{'\n'}Digite o ID do ativo manualmente:
          </Text>
          <TextInput
            style={styles.manualInput}
            value={manualId}
            onChangeText={setManualId}
            placeholder="Ex: A001"
            placeholderTextColor="rgba(255,255,255,0.35)"
            autoCapitalize="characters"
            returnKeyType="go"
            onSubmitEditing={handleManualSubmit}
          />
          <TouchableOpacity
            style={[styles.manualBtn, !manualId.trim() && styles.manualBtnDisabled]}
            onPress={handleManualSubmit}
            disabled={!manualId.trim()}>
            <Text style={styles.manualBtnText}>Abrir Ativo</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Aguardando permissão da câmara…</Text>
      </View>
    );
  }

  if (!device && isDeviceLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Iniciando câmara…</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <KeyboardAvoidingView
        style={styles.fallbackContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity onPress={() => router.back()} style={styles.fallbackBack}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <View style={styles.fallbackContent}>
          <Ionicons name="qr-code-outline" size={72} color={ACCENT} style={{ marginBottom: 24 }} />
          <Text style={styles.fallbackTitle}>Câmara não disponível</Text>
          <Text style={styles.fallbackSub}>
            Câmara não encontrada neste dispositivo.{'\n'}Digite o ID do ativo manualmente:
          </Text>
          <TextInput
            style={styles.manualInput}
            value={manualId}
            onChangeText={setManualId}
            placeholder="Ex: A001"
            placeholderTextColor="rgba(255,255,255,0.35)"
            autoCapitalize="characters"
            returnKeyType="go"
            onSubmitEditing={handleManualSubmit}
          />
          <TouchableOpacity
            style={[styles.manualBtn, !manualId.trim() && styles.manualBtnDisabled]}
            onPress={handleManualSubmit}
            disabled={!manualId.trim()}>
            <Text style={styles.manualBtnText}>Abrir Ativo</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  text: { color: 'white', fontSize: 16 },

  fallbackContainer: { flex: 1, backgroundColor: '#121212' },
  fallbackBack: { padding: 20, paddingTop: 60 },
  fallbackContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  fallbackTitle: { color: 'white', fontSize: 22, fontWeight: '700', marginBottom: 12 },
  fallbackSub: { color: 'rgba(255,255,255,0.55)', fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  manualInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: ACCENT + '60',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 16,
    textAlign: 'center',
  },
  manualBtn: {
    width: '100%',
    backgroundColor: ACCENT,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  manualBtnDisabled: { opacity: 0.35 },
  manualBtnText: { color: '#000', fontSize: 16, fontWeight: '700' },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  header: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20 },
  backBtn: { marginRight: 16 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  scanBox: { width: SCAN_BOX, height: SCAN_BOX, position: 'relative', overflow: 'hidden' },
  corner: { position: 'absolute', width: CORNER, height: CORNER, borderColor: ACCENT, borderWidth: 3 },
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
  hint: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginBottom: 10 },
});
