import { desktopHome } from '@guardio/data'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { AssetGroupCard, ProtectionStatus, SetupProgress, StatCard, Todos } from './Home'

const meta = {
  title: 'Patterns/Home',
  parameters: {
    docs: {
      description: {
        component:
          'Bigger pieces of the desktop Home, each made from Components. Source: `apps/web/src/screens/Home.tsx`. Data: `packages/data/src/home.ts`.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const ProtectionStatusStory: Story = { name: 'Protection status', render: () => <ProtectionStatus /> }
export const SetupProgressStory: Story = { name: 'Setup progress', render: () => <SetupProgress /> }

export const StatCardStory: Story = {
  name: 'Stat card',
  render: () => (
    <div className="flex max-w-xl">
      <StatCard {...desktopHome.stats[0]} />
    </div>
  ),
}

export const TodosStory: Story = { name: 'To-dos table', render: () => <Todos /> }

export const AssetGroup: Story = {
  name: 'Asset group card',
  render: () => (
    <div className="grid max-w-5xl grid-cols-3 gap-6">
      {desktopHome.assets.map((group) => (
        <AssetGroupCard key={group.id} group={group} />
      ))}
    </div>
  ),
}
