import type { Meta, StoryObj } from '@storybook/react-vite'

const files = import.meta.glob<string>('../../../../packages/assets/**/*.{svg,png,jpg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const items = Object.entries(files)
  .map(([path, url]) => {
    const [, folder, name] = path.match(/assets\/([^/]+)\/(.+)$/)!
    return { folder, name, url }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

function Assets({ folder }: { folder: 'home' | 'settings' }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
      {items
        .filter((i) => i.folder === folder)
        .map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-3 rounded-md border border-border bg-background p-4">
            <div className="flex h-14 items-center justify-center rounded-sm bg-accent px-3">
              <img src={item.url} alt="" className="max-h-10 max-w-24" />
            </div>
            <span className="text-center font-mono text-body-sm break-all text-text-secondary">{item.name}</span>
          </div>
        ))}
    </div>
  )
}

const meta = {
  title: 'Foundations/Assets',
  component: Assets,
  parameters: {
    docs: {
      description: {
        component:
          'Icons, logos and illustrations exported from Figma into `packages/assets`. Both apps import from `@guardio/assets/<folder>/<file>`. Do not redraw an icon: export it from Figma and add it here.',
      },
    },
  },
} satisfies Meta<typeof Assets>

export default meta
type Story = StoryObj<typeof meta>

export const Home: Story = { args: { folder: 'home' } }
export const Settings: Story = { args: { folder: 'settings' } }
