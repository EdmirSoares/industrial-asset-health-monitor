import { useState, useEffect, useCallback } from 'react';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { fetchTelemetry, generateHistory } from '@/src/shared/api/mockData';

export const SENSOR_CONFIG = {
  vibration: { min: 20, max: 80, unit: 'Hz' },
  temperature: { min: 40, max: 95, unit: '°C' },
  pressure: { min: 1.5, max: 8.5, unit: 'bar' },
  rpm: { min: 800, max: 2800, unit: 'RPM' },
} as const;

const POLL_INTERVAL_MS = 30_000;
const HISTORY_SIZE = 40;

const toPercent = (v: number, min: number, max: number) =>
  ((v - min) / (max - min)) * 100;

const EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

export const useLiveTelemetry = (assetId?: string) => {
  const vibration = useSharedValue<number>(SENSOR_CONFIG.vibration.min);
  const temperature = useSharedValue<number>(SENSOR_CONFIG.temperature.min);
  const pressure = useSharedValue<number>(SENSOR_CONFIG.pressure.min);
  const rpm = useSharedValue<number>(SENSOR_CONFIG.rpm.min);
  const vibrationHistory = useSharedValue<number[]>(
    generateHistory(assetId, HISTORY_SIZE),
  );

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [fetchError, setFetchError] = useState(false);

  const poll = useCallback(async () => {
    setFetchError(false);
    try {
      const data = await fetchTelemetry(assetId);

      vibration.value = withTiming(data.vibration, { duration: 600, easing: EASE });
      temperature.value = withTiming(data.temperature, { duration: 800, easing: EASE });
      pressure.value = withTiming(data.pressure, { duration: 700, easing: EASE });
      rpm.value = withTiming(data.rpm, { duration: 700, easing: EASE });
      const norm = toPercent(
        data.vibration,
        SENSOR_CONFIG.vibration.min,
        SENSOR_CONFIG.vibration.max,
      );
      vibrationHistory.value = [...vibrationHistory.value.slice(1), norm];

      setLastUpdated(new Date(data.timestamp));
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, [assetId]);

  useEffect(() => {
    vibrationHistory.value = generateHistory(assetId, HISTORY_SIZE);
    setLoading(true);
  }, [assetId]);

  useEffect(() => {
    poll();
    const timer = setInterval(poll, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [poll]);

  return {
    vibration,
    temperature,
    pressure,
    rpm,
    vibrationHistory,
    loading,
    lastUpdated,
    fetchError,
    refresh: poll,
    sensorConfig: SENSOR_CONFIG,
    currentValue: vibration,
  };
};
