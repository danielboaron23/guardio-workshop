import { emailPreferences } from '@guardio/data'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Field, Switch, ToggleGroups } from './settings-ui'

const meta = {
  title: 'Components/Form',
  parameters: {
    docs: { description: { component: 'Inputs and switches used in Settings. Source: `apps/web/src/components/settings-ui.tsx`.' } },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Fields: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-5">
      <Field label="First name" required defaultValue="Margaret" />
      <Field label="Choose new password" type="password" hint="Minimum 6 characters" />
      <Field label="Email" defaultValue="margaret@gmail.com" disabled />
    </div>
  ),
  parameters: { docs: { description: { story: 'Default, with a hint, and disabled. A red asterisk marks a required field.' } } },
}

function SwitchDemo() {
  const [on, setOn] = useState(true)
  return (
    <div className="flex items-center gap-4">
      <Switch on={on} onChange={setOn} label="Example" />
      <span className="text-body-md text-text-secondary">{on ? 'On' : 'Off'} (click it)</span>
    </div>
  )
}

export const SwitchStory: Story = { name: 'Switch', render: () => <SwitchDemo /> }

export const ToggleList: Story = {
  render: () => (
    <div className="max-w-3xl">
      <ToggleGroups groups={emailPreferences} />
    </div>
  ),
  parameters: { docs: { description: { story: 'Grouped rows with a title, a description and a switch.' } } },
}
