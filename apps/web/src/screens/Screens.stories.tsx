import type { Meta, StoryObj } from '@storybook/react-vite'

import { Header } from '../components/Header'
import { Home } from './Home'
import { Settings } from './Settings'

const meta = {
  title: 'Screens/Desktop',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const HomeScreen: Story = {
  name: 'Home',
  render: () => (
    <div className="min-h-svh bg-background">
      <Header />
      <Home />
    </div>
  ),
}

const settings = (tab: 'profile' | 'subscription' | 'protection'): Story => ({
  render: () => (
    <div className="min-h-svh bg-surface">
      <Header minimal />
      <Settings tab={tab} />
    </div>
  ),
})

export const SettingsProfile: Story = { name: 'Settings / Profile', ...settings('profile') }
export const SettingsSubscription: Story = { name: 'Settings / Subscription', ...settings('subscription') }
export const SettingsProtection: Story = { name: 'Settings / Protection', ...settings('protection') }
