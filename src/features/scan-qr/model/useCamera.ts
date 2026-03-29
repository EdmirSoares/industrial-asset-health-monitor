import { useEffect, useState, useRef, useCallback } from 'react';

let VC: typeof import('react-native-vision-camera') | null = null;
try {
  VC = require('react-native-vision-camera');
} catch {
  VC = null;
}

export const isCameraAvailable = VC !== null;

type VCCamera = import('react-native-vision-camera').Camera;
type VCDevice = import('react-native-vision-camera').CameraDevice;
type VCCodeScanner = import('react-native-vision-camera').CodeScanner;

interface UseCameraReturn {
  isAvailable: boolean;
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
  device: VCDevice | undefined;
  cameraRef: React.RefObject<VCCamera | null>;
  codeScanner: VCCodeScanner;
  scannedCode: string | null;
  isActive: boolean;
  isDeviceLoading: boolean;
  setIsActive: (active: boolean) => void;
  resetScan: () => void;
}

const useCamera = (): UseCameraReturn => {
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [isDeviceLoading, setIsDeviceLoading] = useState(true);

  const resetScan = useCallback(() => {
    setScannedCode(null);
    setIsActive(true);
  }, []);

  const vcPermission = VC?.useCameraPermission?.();
  const vcDevice = VC?.useCameraDevice?.('back');
  const cameraRef = useRef<VCCamera>(null);

  const codeScanner = VC?.useCodeScanner?.({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (isActive && codes.length > 0 && codes[0].value) {
        setScannedCode(codes[0].value);
        setIsActive(false);
      }
    },
  }) as VCCodeScanner;

  useEffect(() => {
    if (!VC || vcPermission?.hasPermission) return;
    vcPermission?.requestPermission();
  }, []);

  useEffect(() => {
    if (!VC) {
      setIsDeviceLoading(false);
      return;
    }
    if (!vcPermission?.hasPermission) return;
    if (vcDevice) {
      setIsDeviceLoading(false);
      return;
    }
    const timer = setTimeout(() => setIsDeviceLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [vcPermission?.hasPermission, vcDevice]);

  return {
    isAvailable: isCameraAvailable,
    hasPermission: vcPermission?.hasPermission ?? false,
    requestPermission: vcPermission?.requestPermission ?? (() => Promise.resolve(false)),
    device: vcDevice,
    cameraRef,
    codeScanner,
    scannedCode,
    isActive,
    isDeviceLoading,
    setIsActive,
    resetScan,
  };
};

export default useCamera;
