import { useLayoutEffect, useState, useRef, useCallback } from 'react';
import {
  useCameraPermission,
  useCameraDevice,
  useCodeScanner,
  Camera,
  type Code,
} from 'react-native-vision-camera';

interface UseCameraReturn {
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
  device: ReturnType<typeof useCameraDevice>;
  cameraRef: React.RefObject<Camera | null>;
  codeScanner: ReturnType<typeof useCodeScanner>;
  scannedCode: string | null;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  resetScan: () => void;
}

const useCamera = (): UseCameraReturn => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const cameraRef = useRef<Camera>(null);

  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);

  const resetScan = useCallback(() => {
    setScannedCode(null);
    setIsActive(true);
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      if (isActive && codes.length > 0 && codes[0].value) {
        setScannedCode(codes[0].value);
        setIsActive(false);
        console.log(`[Industrial Scan]: Ativo identificado: ${codes[0].value}`);
      }
    },
  });

  useLayoutEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  return {
    hasPermission,
    requestPermission,
    device,
    cameraRef,
    codeScanner,
    scannedCode,
    isActive,
    setIsActive,
    resetScan,
  };
};

export default useCamera;
