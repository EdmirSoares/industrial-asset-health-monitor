export interface TelemetrySnapshot {
  vibration: number;    // Hz
  temperature: number;  // °C
  pressure: number;     // bar
  rpm: number;          // RPM
  timestamp: string;
}

interface AssetProfile {
  vibration: number;
  temperature: number;
  pressure: number;
  rpm: number;
}

const PROFILES: Record<string, AssetProfile> = {
  A001: { vibration: 32, temperature: 58, pressure: 3.8, rpm: 1420 },
  A002: { vibration: 62, temperature: 76, pressure: 6.5, rpm: 2050 },
  A003: { vibration: 74, temperature: 88, pressure: 7.8, rpm: 2580 },
};

const DEFAULT_PROFILE: AssetProfile = {
  vibration: 42,
  temperature: 64,
  pressure: 5.0,
  rpm: 1750,
};

const noise = (range: number) => (Math.random() - 0.5) * range * 2;

export async function fetchTelemetry(assetId?: string): Promise<TelemetrySnapshot> {
  const profile = (assetId && PROFILES[assetId]) ?? DEFAULT_PROFILE;

  const latency = 350 + Math.random() * 400;
  await new Promise((resolve) => setTimeout(resolve, latency));

  return {
    vibration: parseFloat(Math.max(0, profile.vibration + noise(3)).toFixed(1)),
    temperature: parseFloat(Math.max(20, profile.temperature + noise(2)).toFixed(1)),
    pressure: parseFloat(Math.max(0.5, profile.pressure + noise(0.25)).toFixed(2)),
    rpm: Math.round(Math.max(0, profile.rpm + noise(90))),
    timestamp: new Date().toISOString(),
  };
}

export function generateHistory(assetId?: string, points = 40): number[] {
  const profile = (assetId && PROFILES[assetId]) ?? DEFAULT_PROFILE;

  const baseNorm = ((profile.vibration - 20) / (80 - 20)) * 100;

  const series: number[] = [];
  let v = baseNorm;

  for (let i = 0; i < points; i++) {
    v += (baseNorm - v) * 0.08 + (Math.random() - 0.5) * 10;
    v = Math.max(5, Math.min(95, v));
    series.push(parseFloat(v.toFixed(1)));
  }

  return series;
}
