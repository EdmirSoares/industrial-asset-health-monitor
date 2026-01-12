export interface ScanAssetState {
  asset: { id: string; name?: string; threshold?: number };
  setAsset: (asset: { id: string; name?: string; threshold?: number }) => void;
  removeAsset: (assetId: string) => void;
  updateAsset: (asset: { id: string; name?: string; threshold?: number }) => void;
}
