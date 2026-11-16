// The card under the hero: setup progress (onboarding states) or pending to-dos (activated).
import type { MobileHome } from '@guardio/data';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Card, PrimaryButton } from '@/components/ui';
import { font, textStyle, theme } from '@/constants/theme';

export function SetupCard({ setup }: { setup: NonNullable<MobileHome['setup']> }) {
  const done = (setup.totalSteps - setup.stepsLeft) / setup.totalSteps;
  return (
    <Card style={styles.setup}>
      <View style={styles.track}>
        <LinearGradient
          colors={[theme.color.progressStart, theme.color.info]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${Math.max(done, 0.08) * 100}%` }]}
        />
      </View>
      <View style={styles.setupText}>
        <View style={styles.label}>
          <Icon name="energy" size={16} />
          <Text style={[textStyle('body-sm', 'textMuted'), font(500), styles.uppercase]}>
            Boost protection
          </Text>
        </View>
        <View style={{ gap: theme.spacing[1] }}>
          <Text style={textStyle('title-md', 'textStrong')}>Only {setup.stepsLeft} steps left</Text>
          <Text style={textStyle('body-md')}>Next: {setup.next}</Text>
        </View>
      </View>
      <PrimaryButton label={setup.cta} />
    </Card>
  );
}

export function PendingTodosCard({ todos }: { todos: NonNullable<MobileHome['pendingTodos']> }) {
  return (
    <Card style={styles.todos}>
      <View style={styles.illustration}>
        <Icon name="todoIllustration" width={38.6} height={32.1} style={{ transform: [{ rotate: '-10deg' }] }} />
        <Icon name="todoPin" width={6.4} height={11.6} style={styles.pin} />
      </View>
      <View style={styles.todosText}>
        <Text style={[textStyle('title-sm')]}>{todos.title}</Text>
        <Text style={textStyle('body-md', 'textSecondary')}>{todos.body}</Text>
      </View>
      <View style={styles.count}>
        <Text style={[textStyle('body-sm', 'background'), { lineHeight: 12 }]}>{todos.count}</Text>
      </View>
      <Icon name="chevronRight" size={24} />
    </Card>
  );
}

const styles = StyleSheet.create({
  setup: { padding: theme.spacing[5], gap: theme.spacing[4] },
  track: { height: 6, borderRadius: theme.radius.full, backgroundColor: theme.color.infoSubtle },
  fill: { height: 6, borderRadius: theme.radius.full },
  setupText: { gap: theme.spacing[2] },
  label: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  uppercase: { textTransform: 'uppercase' },
  todos: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing[2], padding: theme.spacing[4] },
  illustration: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  pin: { position: 'absolute', left: 20, top: 7, transform: [{ rotate: '27deg' }] },
  todosText: { flex: 1 },
  count: {
    minWidth: 20,
    height: 20,
    marginLeft: theme.spacing[2],
    paddingHorizontal: theme.spacing[1.5],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.primary,
  },
});
