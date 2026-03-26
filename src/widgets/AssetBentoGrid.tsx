import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '@/src/shared/theme';
import { Asset } from '@/src/entities/asset/model/types';
import { AssetBentoCard } from '@/src/entities/asset/ui/AssetBentoCard';

interface AssetBentoGridProps {
  assets: Asset[];
  onAssetPress: (assetId: string) => void;
}

export function AssetBentoGrid({ assets, onAssetPress }: AssetBentoGridProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <View style={styles.sectionRow}>
        <Text style={[styles.sectionLabel, { color: colors.text.disabled }]}>ATIVOS</Text>
        <View style={[styles.sectionLine, { backgroundColor: colors.border.light }]} />
      </View>

      <View style={styles.grid}>
        {assets.map((asset) => (
          <AssetBentoCard
            key={asset.id}
            asset={asset}
            onPress={() => onAssetPress(asset.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 0 },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 16,
    paddingBottom: 16,
  },
  sectionLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 1.4 },
  sectionLine: { flex: 1, height: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
