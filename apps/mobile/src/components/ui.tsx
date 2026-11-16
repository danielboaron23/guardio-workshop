// Small building blocks shared by the mobile screens. Tokens only — no raw colours.
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { textStyle, theme } from '@/constants/theme';

import { Icon } from './icon';

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children }: { children: string }) {
  return <Text style={[textStyle('title-lg'), styles.sectionTitle]}>{children}</Text>;
}

export function PrimaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={[textStyle('body-md-medium', 'primaryForeground'), styles.buttonLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

/** Grey pill, optionally with a 12px icon — "Pending", "Active". */
export function Badge({ label, icon }: { label: string; icon?: 'badgeCheck' | 'badgeClock' }) {
  return (
    <View style={styles.badge}>
      {icon && <Icon name={icon} size={12} />}
      <Text style={textStyle('label-sm')}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.background,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.color.border,
    overflow: 'hidden',
  },
  sectionTitle: { paddingHorizontal: theme.spacing[1] },
  button: {
    alignSelf: 'flex-start',
    height: theme.spacing[9],
    paddingHorizontal: theme.spacing[5],
    justifyContent: 'center',
    borderRadius: theme.radius.sm,
    backgroundColor: theme.color.primary,
  },
  buttonLabel: { lineHeight: 14 },
  pressed: { opacity: 0.8 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1.5],
    borderRadius: theme.radius['2xl'],
    backgroundColor: theme.color.accent,
  },
});
