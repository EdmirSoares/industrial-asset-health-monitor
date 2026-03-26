import { apiFetch } from '@/src/shared/api/client';
import { Asset, AssetDetail, TelemetryReading } from '../model/types';

export const assetApi = {
  getList: () => apiFetch<Asset[]>('/assets'),
  getAssetById: (id: string) => apiFetch<AssetDetail>(`/assets/${id}`),
  getTelemetry: (id: string) => apiFetch<TelemetryReading[]>(`/assets/${id}/telemetry`),
};
