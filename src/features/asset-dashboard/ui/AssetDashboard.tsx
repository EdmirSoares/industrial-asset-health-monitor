import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeColors } from '@/src/shared/theme';
import { useAssetStore } from '@/src/entities/asset/model/store';
import { AssetHeader } from '@/src/widgets/AssetHeader';
import { TelemetryPanel } from '@/src/widgets/TelemetryPanel';
import { DiagnosisPanel } from '@/src/features/ai-diagnosis/ui/DiagnosisPanel';
import { type AssetStatus } from '@/src/entities/asset/model/types';

export default function AssetDashboard() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();

  const currentAsset = useAssetStore((state) => state.currentAsset);
  const legacyAsset = useAssetStore((state) => state.asset);

  const assetId = (id as string) ?? '';
  const assetStatus: AssetStatus = currentAsset?.status ?? 'normal';
  const assetLocation = currentAsset?.location;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background.secondary }]}>
      <Animated.View entering={FadeInDown.duration(250)}>
        <AssetHeader
          assetId={assetId}
          location={assetLocation}
          status={assetStatus}
          onBack={() => router.back()}
        />
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(80).duration(300).springify()}>
          <TelemetryPanel assetId={assetId} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).duration(300).springify()}>
          <DiagnosisPanel assetId={assetId} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: 10, gap: 8, paddingBottom: 32 },
});
