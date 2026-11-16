// Top of the mobile Home: coloured gradient, decorative rings, headline.
// The colour and the copy change with the user state.
import type { MobileHome, UserStateId } from '@guardio/data';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { PrimaryButton } from '@/components/ui';
import { font, textStyle, theme } from '@/constants/theme';

const HERO_COLOR: Record<UserStateId, string> = {
  onboarding: theme.color.heroActive,
  activated: theme.color.heroActive,
  nothingInstalled: theme.color.heroIncomplete,
  atRisk: theme.color.heroRisk,
};

export const HERO_GRADIENT_HEIGHT = 485;
// Figma places the rings relative to a 44pt status bar.
const FIGMA_STATUS_BAR = 44;
const RING_CENTER = { x: 310.8, y: 145.8 };

export function HeroBackground({ state, topInset }: { state: UserStateId; topInset: number }) {
  const color = HERO_COLOR[state];
  const isBlue = color === theme.color.heroActive;
  const cy = RING_CENTER.y + (topInset - FIGMA_STATUS_BAR);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* keeps the colour when the list is pulled down */}
      <View style={[styles.overscroll, { backgroundColor: color }]} />
      <LinearGradient
        colors={[color, theme.color.canvas]}
        style={{ height: HERO_GRADIENT_HEIGHT + (topInset - FIGMA_STATUS_BAR) }}
      />
      {isBlue ? (
        <>
          <Icon name="heroBig" size={238.8} style={[ring(238.8, cy), { transform: [{ rotate: '-27deg' }] }]} />
          <Icon name="heroMid" size={127.3} style={[ring(127.3, cy), { transform: [{ rotate: '-8deg' }] }]} />
          <Icon name="heroSmall" size={116.4} style={ring(116.4, cy)} />
          <Icon name="heroArc" size={25.5} style={{ position: 'absolute', left: 285, top: cy - 18.8 }} />
          <Icon name="heroCheck" size={26} style={{ position: 'absolute', left: 296.9, top: cy - 6.3 }} />
        </>
      ) : (
        // The orange/red ring artwork could not be exported from Figma — drawn with plain views.
        <>
          <View style={[ring(238.8, cy), styles.softRing, { opacity: 0.12 }]} />
          <View style={[ring(127.3, cy), styles.softRing, { opacity: 0.16 }]} />
          <View style={[ring(116.4, cy), styles.softRing, { opacity: 0.18 }]} />
          <View style={[ring(26, cy), styles.statusDot]}>
            <Text style={[font(600), styles.statusDotLabel, { color }]}>{state === 'atRisk' ? 'i' : '!'}</Text>
          </View>
        </>
      )}
    </View>
  );
}

export function HeroText({ hero }: { hero: MobileHome['hero'] }) {
  return (
    <View style={styles.text}>
      <Text style={[textStyle('headline-md', 'background'), styles.title]}>{hero.title}</Text>
      <Text style={[textStyle('body-md', 'background'), styles.body]}>{hero.body}</Text>
      {hero.cta && (
        <View style={styles.cta}>
          <PrimaryButton label={hero.cta} />
        </View>
      )}
    </View>
  );
}

const ring = (size: number, cy: number) =>
  ({ position: 'absolute', left: RING_CENTER.x - size / 2, top: cy - size / 2, width: size, height: size }) as const;

const styles = StyleSheet.create({
  overscroll: { position: 'absolute', left: 0, right: 0, top: -600, height: 600 },
  softRing: { borderRadius: theme.radius.full, backgroundColor: theme.color.background },
  statusDot: {
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDotLabel: { fontSize: 16, lineHeight: 20 },
  text: { paddingHorizontal: theme.spacing[8], gap: theme.spacing[3] },
  title: { width: 208 },
  body: { width: 220 },
  cta: { marginTop: theme.spacing[3] },
});
