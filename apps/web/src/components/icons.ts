// Maps the shared data's icon keys to the desktop assets (exported from Figma).
import type { IconKey } from '@guardio/data'
import laptop from '@guardio/assets/home/d-laptop.svg'
import mail from '@guardio/assets/home/d-mail.svg'
import scanFace from '@guardio/assets/home/d-scan-face.svg'
import smartphone from '@guardio/assets/home/d-smartphone.svg'
import dropbox from '@guardio/assets/home/logo-dropbox.jpg'
import mcdonalds from '@guardio/assets/home/logo-mcdonalds.jpg'
import tripadvisor from '@guardio/assets/home/logo-tripadvisor.jpg'
import wolt from '@guardio/assets/home/logo-wolt.jpg'

export const ICONS: Record<IconKey, { src: string; brand: boolean }> = {
  laptop: { src: laptop, brand: false },
  mail: { src: mail, brand: false },
  scanFace: { src: scanFace, brand: false },
  smartphone: { src: smartphone, brand: false },
  dropbox: { src: dropbox, brand: true },
  mcdonalds: { src: mcdonalds, brand: true },
  tripadvisor: { src: tripadvisor, brand: true },
  wolt: { src: wolt, brand: true },
}
