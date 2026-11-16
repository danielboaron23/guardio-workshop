// Every image the mobile app uses, exported from Figma into packages/assets.
export const assets = {
  // tab bar
  tabHomeActive: require('@guardio/assets/home/tab-home-active.svg'),
  tabHome: require('@guardio/assets/home/tab-home.svg'),
  tabAssets: require('@guardio/assets/home/tab-assets.svg'),
  tabTodos: require('@guardio/assets/home/tab-todos.svg'),
  tabActivity: require('@guardio/assets/home/tab-activity.svg'),
  tabAccount: require('@guardio/assets/home/tab-account.svg'),
  // hero
  heroBig: require('@guardio/assets/home/hero-onboarding-big.svg'),
  heroMid: require('@guardio/assets/home/hero-onboarding-mid.svg'),
  heroSmall: require('@guardio/assets/home/hero-onboarding-small.svg'),
  heroCheck: require('@guardio/assets/home/hero-onboarding-check.svg'),
  heroArc: require('@guardio/assets/home/hero-onboarding-arc.svg'),
  // icons
  energy: require('@guardio/assets/home/m-energy.svg'),
  internet: require('@guardio/assets/home/m-internet.svg'),
  mail: require('@guardio/assets/home/m-mail.svg'),
  message: require('@guardio/assets/home/m-message.svg'),
  calling: require('@guardio/assets/home/m-calling.svg'),
  arrowRightSm: require('@guardio/assets/home/m-arrow-right-sm.svg'),
  arrowRightLink: require('@guardio/assets/home/m-arrow-right-link.svg'),
  mail18: require('@guardio/assets/home/m-mail-18.svg'),
  internet18: require('@guardio/assets/home/m-internet-18.svg'),
  squareUnlock: require('@guardio/assets/home/m-square-unlock.svg'),
  smartphoneSm: require('@guardio/assets/home/m-smartphone-sm.svg'),
  mailSm: require('@guardio/assets/home/m-mail-sm.svg'),
  plus: require('@guardio/assets/home/m-plus.svg'),
  badgeCheck: require('@guardio/assets/home/badge-check.svg'),
  badgeClock: require('@guardio/assets/home/badge-clock.svg'),
  todoIllustration: require('@guardio/assets/home/activated-todo-illustration.svg'),
  todoPin: require('@guardio/assets/home/activated-todo-pin.svg'),
  chevronRight: require('@guardio/assets/home/activated-todo-chevron-right.svg'),
  // settings
  logo: require('@guardio/assets/settings/logo.svg'),
  chevronDown: require('@guardio/assets/settings/chevron-down.svg'),
  settingsMail: require('@guardio/assets/settings/mail.svg'),
  settingsCall: require('@guardio/assets/settings/call.svg'),
  // logos + avatars
  spotify: require('@guardio/assets/home/logo-spotify.png'),
  facebook: require('@guardio/assets/home/logo-facebook.svg'),
  instagram: require('@guardio/assets/home/logo-instagram.png'),
  tiktok: require('@guardio/assets/home/logo-tiktok.jpg'),
  gmail: require('@guardio/assets/home/logo-gmail.png'),
  google: require('@guardio/assets/home/logo-google.svg'),
  apple: require('@guardio/assets/home/logo-apple.svg'),
  avatarRonnie: require('@guardio/assets/home/avatar-ronnie.png'),
  avatarDavid: require('@guardio/assets/home/avatar-david.png'),
} as const;

export type AssetKey = keyof typeof assets;
