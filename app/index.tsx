import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useThemeColors } from '@/src/shared/theme';
import { MOCK_ASSETS } from '@/src/entities/asset/model/mockAssets';
import { HomeHeader } from '@/src/widgets/HomeHeader';
import { HomeStatsRow } from '@/src/widgets/HomeStatsRow';
import { ScanCtaBanner } from '@/src/widgets/ScanCtaBanner';
import { AssetBentoGrid } from '@/src/widgets/AssetBentoGrid';

export default function Home() {
  const router = useRouter();
  const colors = useThemeColors();

  const total = MOCK_ASSETS.length;
  const operational = MOCK_ASSETS.filter((a) => a.status === 'normal').length;
  const alerts = MOCK_ASSETS.filter((a) => a.status !== 'normal').length;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background.secondary }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <Animated.View entering={FadeInDown.duration(180)}>
          <HomeHeader
            totalAssets={total}
            onScanPress={() => router.push('/scan')}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(40).duration(200)}>
          <HomeStatsRow total={total} operational={operational} alerts={alerts} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(80).duration(200)}>
          <ScanCtaBanner onPress={() => router.push('/scan')} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(140).duration(220)}>
          <AssetBentoGrid
            assets={MOCK_ASSETS}
            onAssetPress={(id) => router.push(`/asset/${id}`)}
          />
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 14, paddingTop: 48, paddingBottom: 32, gap: 8 },
});
