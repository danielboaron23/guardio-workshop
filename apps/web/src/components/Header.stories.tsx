import type { Meta, StoryObj } from '@storybook/react-vite'

import { Header } from './Header'

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'App-level navigation on desktop. `minimal` is the Settings header: logo only. The account avatar is not in Figma; it was added as the way into Settings.',
      },
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Home: Story = {}
export const Minimal: Story = { args: { minimal: true } }
