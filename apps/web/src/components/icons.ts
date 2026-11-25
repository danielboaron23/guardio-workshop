// Maps the shared data's icon keys to the desktop assets (exported from Figma).
import type { IconKey } from '@guardio/data'
import laptop from '@guardio/assets/home/d-laptop.svg'
import mail from '@guardio/assets/home/d-mail.svg'
import scanFace from '@guardio/assets/home/d-scan-face.svg'
import smartphone from '@guardio/assets/home/d-smartphone.svg'
import apple from '@guardio/assets/home/logo-apple.svg'
import dropbox from '@guardio/assets/home/logo-dropbox.jpg'
import facebook from '@guardio/assets/home/logo-facebook.svg'
import gmail from '@guardio/assets/home/logo-gmail.png'
import google from '@guardio/assets/home/logo-google.svg'
import instagram from '@guardio/assets/home/logo-instagram.png'
import mcdonalds from '@guardio/assets/home/logo-mcdonalds.jpg'
import spotify from '@guardio/assets/home/logo-spotify.png'
import tiktok from '@guardio/assets/home/logo-tiktok.jpg'
import tripadvisor from '@guardio/assets/home/logo-tripadvisor.jpg'
import wolt from '@guardio/assets/home/logo-wolt.jpg'

export const ICONS: Record<IconKey, { src: string; brand: boolean }> = {
  laptop: { src: laptop, brand: false },
  mail: { src: mail, brand: false },
  scanFace: { src: scanFace, brand: false },
  smartphone: { src: smartphone, brand: false },
  apple: { src: apple, brand: true },
  dropbox: { src: dropbox, brand: true },
  facebook: { src: facebook, brand: true },
  gmail: { src: gmail, brand: true },
  google: { src: google, brand: true },
  instagram: { src: instagram, brand: true },
  mcdonalds: { src: mcdonalds, brand: true },
  spotify: { src: spotify, brand: true },
  tiktok: { src: tiktok, brand: true },
  tripadvisor: { src: tripadvisor, brand: true },
  wolt: { src: wolt, brand: true },
}
