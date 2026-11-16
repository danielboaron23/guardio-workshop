// Mobile Home — Figma "Home mobile" section. One screen, four user states
// (change the state in packages/data/src/current-state.ts).
import { CURRENT_STATE, mobileHome } from '@guardio/data';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_BAR_SPACE } from '@/components/app-tabs';
import { HeroBackground, HeroText } from '@/components/home/hero';
import {
  AccountsAndDevices,
  IdTheftCoverage,
  MyProtection,
  ProtectMorePeople,
  Threats,
} from '@/components/home/sections';
import { PendingTodosCard, SetupCard } from '@/components/home/status-card';
import { theme } from '@/constants/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const home = mobileHome[CURRENT_STATE];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{
        paddingTop: insets.top + theme.spacing[8],
        paddingBottom: insets.bottom + TAB_BAR_SPACE + theme.spacing[8],
      }}
      showsVerticalScrollIndicator={false}>
      <HeroBackground state={CURRENT_STATE} topInset={insets.top} />
      <HeroText hero={home.hero} />

      <View style={styles.sections}>
        {home.setup && (
          <View style={styles.inset}>
            <SetupCard setup={home.setup} />
          </View>
        )}
        {home.pendingTodos && (
          <View style={styles.inset}>
            <PendingTodosCard todos={home.pendingTodos} />
          </View>
        )}
        <MyProtection protections={home.protections} />
        <Threats threats={home.threats} />
        <AccountsAndDevices />
        <ProtectMorePeople members={home.members} />
        <IdTheftCoverage />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  sections: { paddingTop: theme.spacing[16], gap: theme.spacing[8] },
  inset: { paddingHorizontal: theme.spacing[5] },
});
