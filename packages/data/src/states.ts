// The four user states from the Figma "Home mobile" section.
export type UserStateId = 'onboarding' | 'activated' | 'nothingInstalled' | 'atRisk';

export type UserState = {
  id: UserStateId;
  label: string;
  figmaMobileNode: string;
};

export const USER_STATES: UserState[] = [
  { id: 'onboarding', label: 'Onboarding (D0–D10)', figmaMobileNode: '1:9612' },
  { id: 'activated', label: 'Activated (D10+)', figmaMobileNode: '1:9121' },
  { id: 'nothingInstalled', label: 'Nothing installed', figmaMobileNode: '1:9825' },
  { id: 'atRisk', label: 'Protection at risk', figmaMobileNode: '1:10469' },
];
