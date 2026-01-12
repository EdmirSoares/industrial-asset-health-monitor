import { create } from 'zustand';
import { ScanAssetState } from './types';

export const useAssetStore = create<ScanAssetState>((set) => ({
  asset: { id: '', name: '', threshold: 0 },
  setAsset: (asset) => set({ asset }),
  removeAsset: (assetId) =>
    set((state) => (state.asset.id === assetId ? { asset: { id: '' } } : state)),
  updateAsset: (asset) => set((state) => (state.asset.id === asset.id ? { asset } : state)),
}));
