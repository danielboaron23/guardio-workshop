// Mock data for the Settings screens — shared by the desktop and mobile apps.

export type SettingsTabId = 'profile' | 'subscription' | 'protection' | 'family' | 'help';

/** Protection Settings is hidden on mobile (see the note in the Figma file). */
export const SETTINGS_TABS: { id: SettingsTabId; label: string; desktopOnly?: boolean }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'subscription', label: 'Subscription' },
  { id: 'protection', label: 'Protection Settings', desktopOnly: true },
  { id: 'family', label: 'Family Members (1/1)' },
  { id: 'help', label: 'Get Help' },
];

export const account = {
  firstName: 'Margaret',
  lastName: 'Smith',
  email: 'margaret_3892348578923523@gmail.com',
  phone: '(601) 819-9728',
  phonePrefix: '+1',
};

export type Toggle = { id: string; title: string; body: string; on: boolean; learnMore?: boolean };

export const emailPreferences: { group: string; items: Toggle[] }[] = [
  {
    group: 'News & Updates',
    items: [
      { id: 'blog', title: 'The Guardio Blog', body: 'Emails with Guardio’s blog posts and newsletters.', on: true },
      { id: 'promotions', title: 'Guardio Promotions', body: 'Emails offering a sale, a referral, or an upgrade.', on: true },
      { id: 'product', title: 'Product Updates', body: 'Stay informed on Guardio’s most recent features and developments, and learn about the ongoing security efforts.', on: true },
    ],
  },
  {
    group: 'Your Account',
    items: [
      { id: 'account', title: 'Account Changes', body: 'Emails related to your account, such as reminders, renewal updates, or billing cycle changes.', on: true },
      { id: 'report', title: 'Monthly Report', body: 'Every month we send a report providing details about what threats were avoided during that month.', on: false },
    ],
  },
];

export const protectionSettings: { group: string; items: Toggle[] }[] = [
  {
    group: 'Browsing protection',
    items: [
      { id: 'harmful', title: 'Harmful Site Blocks', body: 'Advanced anti-phishing protection from emails and web pages that attempt to steal personal or payment information.', on: true, learnMore: true },
      { id: 'downloads', title: 'Dangerous Download Blocks (Premium)', body: 'Block downloads designed to cause damage before they get to your computer.', on: true },
      { id: 'suspicious', title: 'Suspicious Site Alerts', body: 'Know when to take extra care when visiting sites that have low credibility.', on: true, learnMore: true },
      { id: 'webcam', title: 'Webcam & Microphone Alerts', body: 'Maintain privacy and get notified when access to your camera and microphone are still enabled on an open tab.', on: true },
      { id: 'notifications', title: 'Unwanted Notification Cleanup (Premium)', body: 'Enjoy a clean browsing experience, and be sure that no intrusive notifications will invade your browser.', on: true, learnMore: true },
      { id: 'search', title: 'Search Hijacking Correction (Premium)', body: 'Guardio will detect search hijacking attempts and direct your browsing to your preferred search engine.', on: false, learnMore: true },
    ],
  },
  {
    group: 'Email protection',
    items: [
      { id: 'malicious-email', title: 'Malicious Email Alerts (Premium)', body: 'Get instant alerts about phishing and scam emails that get past your spam filter.', on: true },
    ],
  },
  {
    group: 'Extensions',
    items: [
      { id: 'auto-removal', title: 'Automatic Removal (Premium)', body: 'Harmful extensions detected on your browser will be automatically disabled.', on: true, learnMore: true },
      { id: 'pre-install', title: 'Pre-Install Alerts', body: 'Proactive alerts on suspicious extensions can help you avoid security threats.', on: true, learnMore: true },
    ],
  },
];

export const subscription = {
  plan: 'Family, yearly plan',
  status: 'Active',
  membersTitle: '3 of 5 members on your plan',
  membersBody: 'You can cover 2 more people',
  members: [
    { id: 'm1', initials: 'RS', name: 'Ronnie Smith (you)' },
    { id: 'm2', initials: 'DS', name: 'David Smith' },
    { id: 'm3', initials: 'JC', name: 'Julia Cohen Scott' },
  ],
  protectionsTitle: '2 of 4 protections are on',
  protectionsBody: 'Not fully protected yet',
  protections: [
    { id: 'browsing', label: 'Malicious site blocker', on: true },
    { id: 'email', label: 'Phishing email filter', on: true },
    { id: 'sms', label: 'Scam SMS blocker', on: false },
    { id: 'call', label: 'Call protection', on: false },
  ] as { id: 'browsing' | 'email' | 'sms' | 'call'; label: string; on: boolean }[],
  nextBilling: 'Oct 27, 2026',
  billingCycle: 'Billed every month',
  paymentMethod: 'Visa ending 4242',
  invoices: '31 invoices',
  invoicesLink: 'See your payment history',
};
