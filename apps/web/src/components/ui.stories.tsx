import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, Card, CardHeader, CountBadge, IconTile, InfoBadge, SectionTitle, StatusBadge, Tabs, TextLink } from './ui'

const meta = {
  title: 'Components/Basics',
  parameters: {
    docs: {
      description: {
        component: 'The small building blocks of the desktop app. Source: `apps/web/src/components/ui.tsx`.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const CardStory: Story = {
  name: 'Card',
  render: () => (
    <Card className="max-w-md">
      <CardHeader title="Devices" count={4} />
      <p className="px-6 pb-6 text-body-lg text-text-secondary">
        A white surface with a border and a 16px radius. Put a CardHeader on top when the card has a title.
      </p>
    </Card>
  ),
}

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <CountBadge>56</CountBadge>
      <InfoBadge>2 open issues</InfoBadge>
      <StatusBadge on />
      <StatusBadge on={false} />
      <StatusBadge status="fixed" />
      <StatusBadge status="checking" />
      <StatusBadge status="later" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`CountBadge`: a number next to a title. `InfoBadge`: something needs attention. `StatusBadge`: a feature is on or off (`on`), or the state of a to-do (`status`: fixed, checking, later). No red: red belongs to the At risk state.',
      },
    },
  },
}

export const Avatars: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">RS</Avatar>
      <Avatar tone="amber">MS</Avatar>
      <Avatar size="lg" tone="amber">
        R
      </Avatar>
      <Avatar size="sm" tone="primary">
        +
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Sizes `sm` 32, `md` 36, `lg` 56. Tones: `neutral` other people, `amber` the signed-in user, `primary` an action.' },
    },
  },
}

export const IconTiles: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconTile icon="laptop" />
      <IconTile icon="mail" />
      <IconTile icon="smartphone" />
      <IconTile icon="scanFace" />
      <IconTile icon="dropbox" />
      <IconTile icon="tripadvisor" />
      <IconTile icon="mcdonalds" />
      <IconTile icon="wolt" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'A 40px tile. Product icons sit on grey; brand logos sit on white with a border.' } },
  },
}

export const Text: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <SectionTitle>Security Overview</SectionTitle>
      <TextLink>View To-dos</TextLink>
    </div>
  ),
}

export const TabsStory: Story = {
  name: 'Tabs',
  render: () => (
    <Tabs
      label="Example"
      value="subscription"
      hrefFor={() => '#'}
      tabs={[
        { id: 'profile', label: 'Profile' },
        { id: 'subscription', label: 'Subscription' },
        { id: 'protection', label: 'Protection Settings' },
      ]}
    />
  ),
  parameters: {
    docs: { description: { story: 'Switches sections inside a page. App-level navigation belongs to the Header.' } },
  },
}
