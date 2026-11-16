import { Image, type ImageStyle } from 'expo-image';
import type { StyleProp } from 'react-native';

import { assets, type AssetKey } from '@/constants/assets';

/** Renders a Figma asset (SVG or bitmap) at a fixed size. */
export function Icon({
  name,
  size,
  width = size,
  height = size,
  style,
}: {
  name: AssetKey;
  size?: number;
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
}) {
  return <Image source={assets[name]} style={[{ width, height }, style]} contentFit="contain" />;
}
