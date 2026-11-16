// Floating bottom tab bar from the Figma mobile frames.
import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import type { AssetKey } from '@/constants/assets';
import { font, theme } from '@/constants/theme';

/** Height the bar covers above the bottom safe area — screens pad their content by this. */
export const TAB_BAR_SPACE = 76;

const TABS: { name: string; href: string; label: string; icon: AssetKey; activeIcon?: AssetKey; dot?: boolean }[] = [
  { name: 'index', href: '/', label: 'Home', icon: 'tabHome', activeIcon: 'tabHomeActive' },
  { name: 'assets', href: '/assets', label: 'My Assets', icon: 'tabAssets' },
  { name: 'todos', href: '/todos', label: 'To do’s', icon: 'tabTodos', dot: true },
  { name: 'activity', href: '/activity', label: 'Activity', icon: 'tabActivity' },
  { name: 'account', href: '/account', label: 'Account', icon: 'tabAccount' },
];

export default function AppTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs>
      <TabSlot />
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(255,255,255,0)', theme.color.background]}
        locations={[0, 0.8]}
        style={[styles.fade, { height: TAB_BAR_SPACE + insets.bottom + theme.spacing[5] }]}
      />
      <TabList style={[styles.bar, { bottom: Math.max(insets.bottom, theme.spacing[5]) }]}>
        {TABS.map((tab) => (
          <TabTrigger key={tab.name} name={tab.name} href={tab.href as '/'} asChild>
            <TabButton {...tab} />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & (typeof TABS)[number];

function TabButton({ label, icon, activeIcon, dot, isFocused, onPress, onLongPress }: TabButtonProps) {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tab}>
      <View>
        <Icon name={isFocused && activeIcon ? activeIcon : icon} size={24} />
        {dot && <View style={styles.dot} />}
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.label,
          font(isFocused ? 500 : 400),
          { color: isFocused ? theme.color.textPrimary : theme.color.textSecondary },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  bar: {
    position: 'absolute',
    left: theme.spacing[5],
    right: theme.spacing[5],
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing[1],
    paddingBottom: theme.spacing[3],
    paddingHorizontal: 10,
    borderRadius: theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: theme.color.textStrong,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  tab: {
    minWidth: 64,
    height: 48,
    paddingTop: theme.spacing[4],
    paddingHorizontal: theme.spacing[1],
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing[2],
  },
  label: { fontSize: 10, lineHeight: 12 },
  dot: {
    position: 'absolute',
    top: -1,
    right: -2,
    width: theme.spacing[2],
    height: theme.spacing[2],
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.destructive,
  },
});
