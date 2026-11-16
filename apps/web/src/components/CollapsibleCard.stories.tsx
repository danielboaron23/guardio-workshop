import call from '@guardio/assets/settings/call.svg'
import mail from '@guardio/assets/settings/mail.svg'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, CollapsibleCard, Divider, IconText } from './settings-ui'

const meta = {
  title: 'Components/CollapsibleCard',
  component: CollapsibleCard,
  decorators: [(Story) => <div className="max-w-4xl">{Story()}</div>],
  args: {
    title: 'Password',
    summary: <span className="text-text-secondary">Reset or update your login password</span>,
    children: (
      <div className="flex gap-3">
        <Button>Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        component:
          'A Settings card (Figma "✔️ Collapsible Card"). The header shows a summary; clicking it reveals the content. Without content the card does not open.',
      },
    },
  },
} satisfies Meta<typeof CollapsibleCard>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {}
export const Open: Story = { args: { defaultOpen: true } }

export const WithLabelAndIcons: Story = {
  args: {
    label: 'Your account',
    title: 'Margaret Smith',
    summary: (
      <>
        <IconText icon={mail} className="max-w-[200px]">
          margaret_3892348578923523@gmail.com
        </IconText>
        <Divider />
        <IconText icon={call}>(601) 819-9728</IconText>
      </>
    ),
  },
}

export const SummaryOnly: Story = {
  args: { label: 'Payment methods', title: undefined, summary: 'Visa ending 4242', children: undefined },
}
