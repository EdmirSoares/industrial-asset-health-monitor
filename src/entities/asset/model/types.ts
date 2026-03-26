export type AssetStatus = 'normal' | 'warning' | 'critical' | 'offline';

export type SensorType = 'vibration' | 'temperature' | 'pressure' | 'rpm' | 'current';

export interface Asset {
  id: string;
  name: string;
  location?: string;
  status: AssetStatus;
  threshold: number;
  lastCheck?: string;
}

export interface TelemetryReading {
  sensorType: SensorType;
  value: number;
  unit: string;
  timestamp: number;
  status: AssetStatus;
}

export interface AssetDetail extends Asset {
  description?: string;
  telemetry?: TelemetryReading[];
}
