import type { Meta, StoryObj } from '@storybook/react-vite'

import { Header } from '../components/Header'
import { Home } from './Home'
import { Settings } from './Settings'
import { Todos } from './Todos'

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

const todos = (concept: 'a' | 'b' | 'c'): Story => ({
  render: () => (
    <div className="min-h-svh bg-background">
      <Header active="todos" />
      <Todos concept={concept} tab="open" state="activated" preview="live" />
    </div>
  ),
})

export const TodosConceptA: Story = { name: 'To-dos / Concept A (Next up)', ...todos('a') }
export const TodosConceptB: Story = { name: 'To-dos / Concept B (Top three)', ...todos('b') }
export const TodosConceptC: Story = { name: 'To-dos / Concept C (Fix by kind)', ...todos('c') }

export const SettingsProfile: Story = { name: 'Settings / Profile', ...settings('profile') }
export const SettingsSubscription: Story = { name: 'Settings / Subscription', ...settings('subscription') }
export const SettingsProtection: Story = { name: 'Settings / Protection', ...settings('protection') }
