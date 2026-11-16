// Mock data for the Home screen — shared by the desktop and mobile apps.
// Icons and logos are referenced by key; each app maps a key to its own asset.
import type { UserStateId } from './states';

export type IconKey =
  | 'dropbox' | 'tripadvisor' | 'mcdonalds' | 'wolt'
  | 'scanFace' | 'smartphone' | 'laptop' | 'mail';

// ───────── Desktop ─────────

export type Todo = {
  id: string;
  asset: string;
  icon: IconKey;
  issue: string;
  date: string;
  action: string;
  urgent?: boolean;
};

export type AssetRow = { id: string; icon: IconKey; label: string; note?: string; badge?: string };
export type AssetGroup = { id: string; title: string; count: number; link: string; rows: AssetRow[] };

export const desktopHome = {
  ticker: 'Blocked activity from Dualingo',
  setup: {
    done: 1,
    total: 6,
    title: 'Good start!',
    body: 'you’ve taken the first step. Keep going to stay safer online',
  },
  stats: [
    { id: 'sites', label: 'Sites Scanned', value: '1284', note: '117 blocked' },
    { id: 'email', label: 'Email Scanned', value: '12.3K', note: '117 Flagged' },
  ],
  // Bar heights as a share of the tallest month (Oct).
  chart: [
    { month: 'Jul', value: 0.78 },
    { month: 'Aug', value: 0.67 },
    { month: 'Sep', value: 0.86 },
    { month: 'Oct', value: 1 },
    { month: 'Nov', value: 0.71 },
    { month: 'Dec', value: 0.85 },
  ],
  todosCount: 56,
  todos: [
    { id: 't1', asset: 'Dropbox', icon: 'dropbox', issue: 'Password exposed in a data breach', date: 'Oct 16, 2015', action: 'Change password', urgent: true },
    { id: 't2', asset: 'Samsung Galaxy A35', icon: 'scanFace', issue: 'Biometrics is disabled', date: 'Nov 12, 2024', action: 'Learn how' },
    { id: 't3', asset: 'Iphone 13 mini', icon: 'smartphone', issue: 'Guardio App is not up to date', date: 'Aug 24, 2025', action: 'Update app version' },
  ] as Todo[],
  assets: [
    {
      id: 'devices', title: 'Devices', count: 4, link: 'Manage devices',
      rows: [
        { id: 'd1', icon: 'laptop', label: 'Guardio for Chrome' },
        { id: 'd2', icon: 'laptop', label: 'Guardio for iOS' },
        { id: 'd3', icon: 'laptop', label: 'Guardio for Android' },
      ],
    },
    {
      id: 'monitored', title: 'Monitored items', count: 5, link: 'Manage items',
      rows: [
        { id: 'm1', icon: 'mail', label: 'juliya1980@hotmail.com', note: 'Pending approval' },
        { id: 'm2', icon: 'mail', label: 'juliya@gmail.com' },
        { id: 'm3', icon: 'smartphone', label: '0503231127' },
      ],
    },
    {
      id: 'accounts', title: 'Accounts', count: 112, link: 'View accounts',
      rows: [
        { id: 'a1', icon: 'tripadvisor', label: 'Trip advisor', badge: '2 open issues' },
        { id: 'a2', icon: 'mcdonalds', label: 'Macdonalds', badge: '1 open issue' },
        { id: 'a3', icon: 'wolt', label: 'Wolt' },
      ],
    },
  ] as AssetGroup[],
  plan: { title: 'Individual plan', member: 'Ronnie Smith', initial: 'R' },
  upsell: {
    title: 'Go Duo or Family Plan',
    body: "You're already protected — now help your loved ones stay safe too. With one upgrade, you can extend Guardio's security.",
    cta: 'View plans',
  },
};

// ───────── Mobile ─────────

export type ProtectionId = 'browsing' | 'email' | 'sms' | 'call';
export type Protection = { id: ProtectionId; title: string; active: boolean };
export type MemberStatus = 'active' | 'pending';
export type Member = { id: string; name: string; avatar?: 'ronnie' | 'david'; initial?: string; status?: MemberStatus };

export type MobileHome = {
  hero: { title: string; body: string; cta?: string };
  /** Setup-progress card under the hero (onboarding states). */
  setup?: { stepsLeft: number; totalSteps: number; next: string; cta: string };
  /** "Pending To-Dos" card under the hero (activated state). */
  pendingTodos?: { title: string; body: string; count: number };
  protections: Protection[];
  threats: { total: number; emails: number; websites: number; leaks: number };
  members: Member[];
};

const PROTECTION_TITLES: Record<ProtectionId, string> = {
  browsing: 'Browsing\nProtection',
  email: 'Email\nProtection',
  sms: 'SMS\nprotection',
  call: 'Call\nprotection',
};

const protections = (order: ProtectionId[], active: ProtectionId[]): Protection[] =>
  order.map((id) => ({ id, title: PROTECTION_TITLES[id], active: active.includes(id) }));

const members = (showActive: boolean): Member[] => [
  { id: 'p1', name: 'Ronnie Smith', avatar: 'ronnie', status: showActive ? 'active' : undefined },
  { id: 'p2', name: 'David Smith', avatar: 'david', status: showActive ? 'active' : undefined },
  { id: 'p3', name: 'Julia Cohen Scot..', initial: 'J', status: 'pending' },
];

export const mobileCounts = { accounts: 127, monitoredItems: 3, connections: 2, devices: 1 };

export const mobileHome: Record<UserStateId, MobileHome> = {
  onboarding: {
    hero: { title: 'Protection\nis active', body: 'Turn on more coverage for stronger security.' },
    setup: { stepsLeft: 6, totalSteps: 8, next: 'Set up Malicious Sites Blocker', cta: 'Complete setup' },
    protections: protections(['browsing', 'email', 'sms', 'call'], ['browsing']),
    threats: { total: 59, emails: 50, websites: 7, leaks: 2 },
    members: members(false),
  },
  activated: {
    hero: { title: 'Protection\nis Active', body: 'Actively looking for threats.' },
    pendingTodos: { title: 'Pending To-Dos', body: 'There are security issues that require your attention.', count: 2 },
    protections: protections(['browsing', 'email', 'sms', 'call'], ['browsing', 'email', 'sms', 'call']),
    threats: { total: 20, emails: 50, websites: 7, leaks: 2 },
    members: members(true),
  },
  nothingInstalled: {
    hero: { title: 'Protection\nis incomplete', body: 'Turn on more coverage for stronger security.' },
    setup: { stepsLeft: 7, totalSteps: 8, next: 'Allow Push Notifications', cta: 'Complete setup' },
    protections: protections(['browsing', 'email', 'sms', 'call'], ['browsing']),
    threats: { total: 59, emails: 50, websites: 7, leaks: 2 },
    members: members(false),
  },
  atRisk: {
    hero: {
      title: 'Protection\nat risk',
      body: 'Your last payment didn’t go through. Update your card now to keep your protection active.',
      cta: 'Update payment',
    },
    protections: protections(['sms', 'browsing', 'call', 'email'], []),
    threats: { total: 59, emails: 50, websites: 7, leaks: 2 },
    members: members(false),
  },
};
