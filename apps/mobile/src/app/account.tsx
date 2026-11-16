// Account tab = Settings on mobile. Tabs: Profile is built; Subscription is a workshop exercise.
// Protection Settings is hidden on mobile (see the note in the Figma file).
import { SETTINGS_TABS, type SettingsTabId } from '@guardio/data';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_BAR_SPACE } from '@/components/app-tabs';
import { Icon } from '@/components/icon';
import { Profile } from '@/components/settings/profile';
import { font, textStyle, theme } from '@/constants/theme';

const MOBILE_TABS = SETTINGS_TABS.filter((tab) => !tab.desktopOnly);

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<SettingsTabId>('profile');

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing[3] }]}>
        <Icon name="logo" width={105} height={28} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + TAB_BAR_SPACE + theme.spacing[8] }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.tabsWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
            {MOBILE_TABS.map((t) => {
              const selected = t.id === tab;
              return (
                <Pressable
                  key={t.id}
                  onPress={() => setTab(t.id)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}
                  style={[styles.tab, selected && styles.tabSelected]}>
                  <Text style={[textStyle('body-lg'), font(selected ? 600 : 400)]}>{t.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.cards}>
          {tab === 'profile' ? (
            <Profile />
          ) : (
            <Text style={[textStyle('body-lg', 'textSecondary'), styles.empty]}>Coming soon</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.surface },
  header: {
    paddingHorizontal: theme.spacing[5],
    paddingBottom: theme.spacing[3],
    backgroundColor: theme.color.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.accent,
  },
  tabsWrap: { marginTop: theme.spacing[2], marginLeft: theme.spacing[5] },
  tabs: { minWidth: '100%', borderBottomWidth: 2, borderBottomColor: theme.color.border, paddingRight: theme.spacing[5] },
  tab: { padding: theme.spacing[4], marginBottom: -2, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabSelected: { borderBottomColor: theme.color.borderSelected },
  cards: { padding: theme.spacing[5], paddingTop: theme.spacing[6], gap: theme.spacing[5] },
  empty: { textAlign: 'center', paddingVertical: theme.spacing[12] },
});
