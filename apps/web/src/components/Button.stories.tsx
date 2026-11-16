import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './settings-ui'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Manage plan', variant: 'primary', disabled: false },
  argTypes: { variant: { control: 'inline-radio', options: ['primary', 'outline', 'destructive'] } },
  parameters: {
    docs: {
      description: {
        component:
          'The core action. One `primary` per view; `outline` for the supporting action; `destructive` only for actions that cannot be undone.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Outline: Story = { args: { variant: 'outline', children: 'Cancel subscription' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'Logout' } }
export const Disabled: Story = { args: { disabled: true, children: 'Save' } }
