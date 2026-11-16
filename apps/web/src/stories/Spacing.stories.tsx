import { radius, spacing } from '@guardio/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'

function Spacing() {
  return (
    <div className="flex flex-col gap-3">
      {Object.entries(spacing)
        .sort((a, b) => a[1] - b[1])
        .map(([name, px]) => (
          <div key={name} className="flex items-center gap-4">
            <span className="w-28 font-mono text-body-md text-text-primary">spacing/{name}</span>
            <span className="w-16 text-body-md text-text-secondary">{px}px</span>
            <span className="h-4 rounded-[2px] bg-info" style={{ width: px }} />
          </div>
        ))}
    </div>
  )
}

function Radius() {
  return (
    <div className="flex flex-wrap gap-6">
      {Object.entries(radius).map(([name, px]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div className="size-24 border border-border-selected bg-accent" style={{ borderRadius: px }} />
          <span className="font-mono text-body-md text-text-primary">rounded-{name}</span>
          <span className="text-body-sm text-text-secondary">{px === 9999 ? 'full' : `${px}px`}</span>
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: 'Foundations/Spacing',
  component: Spacing,
  parameters: {
    docs: {
      description: {
        component:
          'A 4px scale. The names match the Figma variables and the Tailwind scale: `p-4`, `gap-4` and `spacing/4` are all 16px. On mobile: `theme.spacing[4]`.',
      },
    },
  },
} satisfies Meta<typeof Spacing>

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {}

export const RadiusScale: Story = {
  name: 'Radius',
  render: () => <Radius />,
  parameters: {
    docs: {
      description: {
        story: 'Corner radius. `sm` buttons and inputs, `md` settings cards, `lg` home cards, `full` pills and avatars.',
      },
    },
  },
}
