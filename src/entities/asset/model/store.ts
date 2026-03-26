import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from './types';

interface AssetStore {
  assets: Asset[];
  currentAsset: Asset | null;
  setCurrentAsset: (asset: Asset) => void;
  clearCurrentAsset: () => void;
  setAssets: (assets: Asset[]) => void;
  upsertAsset: (asset: Asset) => void;
  removeAsset: (id: string) => void;
  asset: { id: string; name?: string; threshold?: number };
  setAsset: (asset: { id: string; name?: string; threshold?: number }) => void;
  updateAsset: (asset: { id: string; name?: string; threshold?: number }) => void;
}

export const useAssetStore = create<AssetStore>()(
  persist(
    (set) => ({
      assets: [],
      currentAsset: null,
      asset: { id: '', name: '', threshold: 0 },

      setCurrentAsset: (asset) =>
        set({
          currentAsset: asset,
          asset: { id: asset.id, name: asset.name, threshold: asset.threshold },
        }),

      clearCurrentAsset: () => set({ currentAsset: null }),

      setAssets: (assets) => set({ assets }),

      upsertAsset: (asset) =>
        set((state) => {
          const idx = state.assets.findIndex((a) => a.id === asset.id);
          if (idx >= 0) {
            const updated = [...state.assets];
            updated[idx] = asset;
            return { assets: updated };
          }
          return { assets: [...state.assets, asset] };
        }),

      removeAsset: (id) =>
        set((state) => ({ assets: state.assets.filter((a) => a.id !== id) })),

      setAsset: (asset) => set({ asset }),

      updateAsset: (asset) =>
        set((state) => (state.asset.id === asset.id ? { asset } : state)),
    }),
    {
      name: 'asset-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
