import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './settings-ui'
import { EmptyState, Notice, RankNumber, SkeletonRows, StepList, VerifyHint } from './todos-ui'
import { Card, TextLink } from './ui'

const meta = {
  title: 'Components/To-dos',
  parameters: {
    docs: {
      description: {
        component:
          'Building blocks of the To-dos page. Source: `apps/web/src/components/todos-ui.tsx`. Everything is composed from the system, except `StepList`, a new pattern proposed back to the design system.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const StepListStory: Story = {
  name: 'StepList (new)',
  render: () => (
    <Card className="max-w-md p-6">
      <StepList
        steps={[
          'Open dropbox.com and sign in.',
          'Go to Settings → Security → Change password.',
          'Come back and tell us it’s done.',
        ]}
      />
    </Card>
  ),
  parameters: {
    docs: { description: { story: 'Numbered steps for a fix that happens outside Guardio. Short sentences, one action each.' } },
  },
}

export const RankAndVerify: Story = {
  name: 'Rank and how "done" is known',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <RankNumber n={1} />
        <RankNumber n={2} />
        <RankNumber n={3} />
      </div>
      <VerifyHint verify="auto" />
      <VerifyHint verify="manual" />
    </div>
  ),
}

export const Notices: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-4">
      <Notice tone="info" title="We’re still setting up" action={<TextLink>Continue setup</TextLink>}>
        1 of 6 setup steps done. We’ll find more as you finish setup.
      </Notice>
      <Notice tone="risk" title="Your protection is paused" action={<Button variant="destructive">Update payment</Button>}>
        Your last payment didn’t go through, so we stopped checking.
      </Notice>
    </div>
  ),
  parameters: {
    docs: { description: { story: '`info` for Onboarding. `risk` only for the At risk state: red never marks a to-do.' } },
  },
}

export const EmptyStates: Story = {
  name: 'Empty states',
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      <EmptyState icon="check" title="Nothing needs you right now">
        Guardio checked your accounts and devices 2 hours ago and keeps watching. We’ll let you know if something comes up.
      </EmptyState>
      <EmptyState icon="shield" title="Install Guardio to start finding issues" action={<Button>Install Guardio</Button>}>
        Until Guardio is on your browser or phone, we can’t tell you everything is fine.
      </EmptyState>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <Card className="max-w-3xl">
      <SkeletonRows rows={3} />
    </Card>
  ),
}
