import { color, type ColorToken } from '@guardio/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

const GROUPS: { title: string; note: string; tokens: ColorToken[] }[] = [
  { title: 'Surfaces', note: 'Page and card backgrounds.', tokens: ['background', 'surface', 'canvas', 'accent'] },
  { title: 'Text', note: 'Use textPrimary by default, textSecondary for supporting text.', tokens: ['textStrong', 'textPrimary', 'textSecondary', 'textMuted', 'textLink'] },
  { title: 'Lines', note: 'Borders and dividers.', tokens: ['border', 'borderSelected', 'divider', 'switchOff'] },
  { title: 'Actions', note: 'The main button.', tokens: ['primary', 'primaryForeground'] },
  { title: 'Status', note: 'Success, warning, danger and information.', tokens: ['success', 'successBright', 'successSubtle', 'successSubtleForeground', 'warning', 'destructive', 'destructiveForeground', 'info', 'infoSubtle', 'infoStrong', 'issueText', 'issueBg'] },
  { title: 'Mobile hero', note: 'Background of the mobile Home, one per user state.', tokens: ['heroActive', 'heroIncomplete', 'heroRisk', 'progressStart'] },
  { title: 'Avatars', note: 'Initials avatar of the signed-in user.', tokens: ['avatarBg', 'avatarText'] },
]

function Colors() {
  const listed = new Set(GROUPS.flatMap((g) => g.tokens))
  const rest = (Object.keys(color) as ColorToken[]).filter((t) => !listed.has(t))
  const groups = rest.length ? [...GROUPS, { title: 'Other', note: 'Not grouped yet.', tokens: rest }] : GROUPS
  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="text-title-lg font-semibold text-text-strong">{group.title}</h2>
          <p className="mb-4 text-body-md text-text-secondary">{group.note}</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {group.tokens.map((token) => (
              <div key={token} className="overflow-hidden rounded-md border border-border bg-background">
                <div className="h-20 border-b border-border" style={{ background: color[token] }} />
                <div className="p-3">
                  <p className="text-body-md font-medium text-text-primary">{token}</p>
                  <p className="font-mono text-body-sm text-text-secondary">{color[token]}</p>
                  <p className="font-mono text-body-sm text-text-secondary">bg-{kebab(token)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const meta = {
  title: 'Foundations/Colors',
  component: Colors,
  parameters: {
    docs: {
      description: {
        component:
          'Every colour in the product. Source: `packages/tokens/src/index.ts`. On the web use the Tailwind class (`bg-…`, `text-…`, `border-…`); on mobile use `theme.color.<name>`.',
      },
    },
  },
} satisfies Meta<typeof Colors>

export default meta
export const AllColors: StoryObj<typeof meta> = {}
