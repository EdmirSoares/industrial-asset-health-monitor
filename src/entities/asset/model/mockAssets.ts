import { Asset, AssetType } from './types';

export const ASSET_ICON: Record<AssetType, string> = {
  compressor: 'settings',
  motor: 'flash',
  pump: 'water',
  generic: 'cube',
};

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'A001',
    name: 'Compressor Industrial 01',
    status: 'normal',
    lastCheck: '2026-01-10',
    threshold: 80,
    location: 'Setor A · Linha 1',
    type: 'compressor',
  },
  {
    id: 'A002',
    name: 'Motor Elétrico 220V',
    status: 'warning',
    lastCheck: '2026-01-09',
    threshold: 75,
    location: 'Setor B · Linha 2',
    type: 'motor',
  },
  {
    id: 'A003',
    name: 'Bomba Hidráulica',
    status: 'critical',
    lastCheck: '2026-01-08',
    threshold: 85,
    location: 'Setor C · Linha 3',
    type: 'pump',
  },
];
