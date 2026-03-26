import { AssetStatus, SensorType } from '@/src/entities/asset/model/types';

export const formatSensorValue = (value: number, sensorType: SensorType): string => {
  switch (sensorType) {
    case 'temperature':
      return `${value.toFixed(1)}°C`;
    case 'vibration':
      return `${value.toFixed(1)} Hz`;
    case 'pressure':
      return `${value.toFixed(2)} bar`;
    case 'rpm':
      return `${Math.round(value)} RPM`;
    case 'current':
      return `${value.toFixed(1)} A`;
  }
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const formatTime = (date: Date): string =>
  date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export const getStatusLabel = (status: AssetStatus): string => {
  switch (status) {
    case 'normal':
      return 'OPERACIONAL';
    case 'warning':
      return 'ATENÇÃO';
    case 'critical':
      return 'CRÍTICO';
    case 'offline':
      return 'OFFLINE';
  }
};
