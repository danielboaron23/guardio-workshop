// Guardio design tokens — single source of truth for web and mobile.
// Values come from the Figma file's variables (fileKey M5bCXbkxp5YlDsdJUjOJl9).
// Web: `pnpm tokens` writes ../dist/tokens.css (Tailwind v4 @theme).
// Mobile: import { tokens } and use the values in StyleSheet.

export const color = {
  // surfaces
  background: '#ffffff',
  surface: '#fafafa', // Figma "secondary" — page background behind cards
  canvas: '#f8f8f8', // mobile page background (the hero gradient fades into it)
  accent: '#f4f4f5', // Figma "accent" / "custom/neutral-subtle" — chips, selected rows

  // text
  textPrimary: '#27272a', // Figma "text/text-primary" / "primary"
  textStrong: '#09090b', // Figma "Text/primary"
  textSecondary: '#71717a', // Figma "text/text-secondary"
  textMuted: '#717680', // Figma "secondary" — small uppercase labels
  textLink: '#2563eb', // Figma "text/link"

  // lines
  border: '#e4e4e7', // Figma "Stroke/border"
  borderSelected: '#09090b', // Figma "Stroke/border-selected"
  divider: '#e6e6e6', // Figma "border & divider"

  // actions
  primary: '#27272a',
  primaryForeground: '#fafafa',

  // status
  success: '#16a34a',
  successBright: '#22c55e', // Figma desktop "Active" headline
  successSubtle: '#dcfce7', // "ON" badge background
  successSubtleForeground: '#166534',
  warning: '#f59e0b',
  destructive: '#dc2626',
  destructiveForeground: '#ffffff',
  info: '#2563eb',
  infoSubtle: '#dbeafe',
  switchOff: '#d4d4d8', // toggle track when off
  infoStrong: '#1e40af', // Figma "tailwind-colors/blue/800" — text on infoSubtle
  issueText: '#1d4ed8', // Figma "Badge & Banner/Issue/Text - Blue 700"
  issueBg: '#eff6ff', // Figma "Badge & Banner/Issue/BG - Blue 50"

  // mobile hero gradient, one per user state
  heroActive: '#0269d8',
  heroIncomplete: '#f48b0b', // sampled from the Figma screenshot (no variable)
  heroRisk: '#fc4f38', // sampled from the Figma screenshot (no variable)
  progressStart: '#86c8ff', // setup progress bar gradient start (ends in `info`)

  // avatars (initials fallback)
  avatarBg: '#fef3c7',
  avatarText: '#92400e',
} as const;

// 4px scale, named like the Figma variables (spacing/1 = 4 ... spacing/16 = 64)
export const spacing = {
  0: 0,
  1: 4,
  1.5: 6,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  9: 36,
  12: 48,
  16: 64,
} as const;

export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  '2xl': 24,
  full: 9999,
} as const;

export const fontFamily = {
  sans: 'Inter',
} as const;

// Figma text styles: size / lineHeight / weight
export const text = {
  'headline-md': { size: 28, lineHeight: 36, weight: 600 },
  'headline-sm': { size: 24, lineHeight: 32, weight: 600 },
  'title-xl': { size: 20, lineHeight: 28, weight: 600 },
  'title-lg': { size: 18, lineHeight: 26, weight: 600 },
  'title-md': { size: 16, lineHeight: 24, weight: 600 },
  'title-sm': { size: 14, lineHeight: 20, weight: 600 },
  'body-lg': { size: 16, lineHeight: 24, weight: 400 },
  'body-lg-medium': { size: 16, lineHeight: 24, weight: 500 },
  'body-md': { size: 14, lineHeight: 20, weight: 400 },
  'body-md-medium': { size: 14, lineHeight: 20, weight: 500 },
  'body-sm': { size: 12, lineHeight: 16, weight: 400 },
  'label-sm': { size: 12, lineHeight: 12, weight: 500 },
} as const;

export const tokens = { color, spacing, radius, fontFamily, text } as const;

export type ColorToken = keyof typeof color;
export type TextStyle = keyof typeof text;
export default tokens;
