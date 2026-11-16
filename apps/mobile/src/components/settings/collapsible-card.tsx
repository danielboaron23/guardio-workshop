// Figma "✔️ Collapsible Card" (mobile): header, optional expanded content, and a footer row that toggles it.
import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { font, textStyle, theme } from '@/constants/theme';

export function CollapsibleCard({
  label,
  title,
  summary,
  openLabel,
  closeLabel,
  children,
}: {
  label?: string;
  title: string;
  summary: ReactNode;
  /** Footer row text, e.g. "Edit account details". Without it the chevron alone toggles the card. */
  openLabel?: string;
  closeLabel?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <View style={styles.card}>
      <Pressable onPress={toggle} style={styles.header} accessibilityRole="button" accessibilityState={{ expanded: open }}>
        <View style={styles.headerText}>
          {label && <Text style={[textStyle('body-md-medium', 'textSecondary')]}>{label}</Text>}
          <Text style={textStyle('title-lg')}>{title}</Text>
          <View style={styles.summary}>{summary}</View>
        </View>
        <Icon name="chevronDown" size={20} style={open ? styles.flipped : undefined} />
      </Pressable>

      {open && <View style={styles.content}>{children}</View>}

      {openLabel && (
        <Pressable onPress={toggle} style={({ pressed }) => [styles.footer, pressed && styles.pressed]}>
          <Text style={[textStyle('body-lg-medium')]}>{open ? (closeLabel ?? openLabel) : openLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

/** Secondary one-line description used as a card summary. */
export function SummaryText({ children }: { children: string }) {
  return <Text style={textStyle('body-lg', 'textSecondary')}>{children}</Text>;
}

export function FieldLabel({ children, required }: { children: string; required?: boolean }) {
  return (
    <Text style={textStyle('body-md-medium')}>
      {children}
      {required && <Text style={[font(500), { color: theme.color.destructive }]}> *</Text>}
    </Text>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.color.border,
    backgroundColor: theme.color.background,
    overflow: 'hidden',
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: theme.spacing[4], padding: theme.spacing[5] },
  headerText: { flex: 1, gap: theme.spacing[1.5] },
  summary: { gap: theme.spacing[1], marginTop: 2 },
  flipped: { transform: [{ rotate: '180deg' }] },
  content: {
    marginHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[5],
    gap: theme.spacing[5],
    borderTopWidth: 1,
    borderTopColor: theme.color.border,
  },
  footer: { padding: theme.spacing[5], borderTopWidth: 1, borderTopColor: theme.color.border },
  pressed: { backgroundColor: theme.color.surface },
});
