// Mobile theme — everything comes from the shared design tokens.
// Never hard-code a colour, radius or font size in a screen: use `theme` and `textStyle`.
import { tokens, type ColorToken, type TextStyle } from '@guardio/tokens';
import type { TextStyle as RNTextStyle } from 'react-native';

export const theme = tokens;

// Inter is loaded in app/_layout.tsx; each weight is its own font family on native.
const FONT_BY_WEIGHT: Record<number, string> = {
  400: 'Inter_400Regular',
  500: 'Inter_500Medium',
  600: 'Inter_600SemiBold',
};

export function font(weight: 400 | 500 | 600): RNTextStyle {
  return { fontFamily: FONT_BY_WEIGHT[weight] };
}

/** Figma text style → React Native style, e.g. `textStyle('title-lg')` or `textStyle('body-md', 'textSecondary')`. */
export function textStyle(name: TextStyle, color: ColorToken = 'textPrimary'): RNTextStyle {
  const t = tokens.text[name];
  return {
    fontFamily: FONT_BY_WEIGHT[t.weight],
    fontSize: t.size,
    lineHeight: t.lineHeight,
    color: tokens.color[color],
  };
}
