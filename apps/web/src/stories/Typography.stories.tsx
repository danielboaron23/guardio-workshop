import { fontFamily, text, type TextStyle } from '@guardio/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'

const USAGE: Partial<Record<TextStyle, string>> = {
  'headline-md': 'Page headline, big numbers',
  'headline-sm': 'Mobile card headline',
  'title-xl': 'Section title',
  'title-lg': 'Card title',
  'title-md': 'Small card title, emphasised line',
  'title-sm': 'Compact title',
  'body-lg': 'Default body text',
  'body-lg-medium': 'Buttons, emphasised body',
  'body-md': 'Secondary text, descriptions',
  'body-md-medium': 'Labels, small buttons',
  'body-sm': 'Captions, hints',
  'label-sm': 'Badges',
}

function Typography() {
  return (
    <div>
      <p className="mb-6 text-body-lg text-text-secondary">
        Font family: <span className="font-medium text-text-primary">{fontFamily.sans}</span> (weights 400, 500, 600)
      </p>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border text-body-sm text-text-secondary">
            <th className="py-2 pr-6 font-medium">Style</th>
            <th className="py-2 pr-6 font-medium">Size / line / weight</th>
            <th className="py-2 pr-6 font-medium">Use for</th>
            <th className="py-2 font-medium">Sample</th>
          </tr>
        </thead>
        <tbody>
          {(Object.keys(text) as TextStyle[]).map((name) => {
            const t = text[name]
            return (
              <tr key={name} className="border-b border-border align-middle">
                <td className="py-4 pr-6 font-mono text-body-md text-text-primary">text-{name}</td>
                <td className="py-4 pr-6 text-body-md whitespace-nowrap text-text-secondary">
                  {t.size} / {t.lineHeight} / {t.weight}
                </td>
                <td className="py-4 pr-6 text-body-md text-text-secondary">{USAGE[name]}</td>
                <td className="py-4 text-text-strong" style={{ fontSize: t.size, lineHeight: `${t.lineHeight}px`, fontWeight: t.weight }}>
                  Your Protection is Active
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: {
    docs: {
      description: {
        component:
          'The text styles from Figma. On the web: `text-<style>` plus a weight class (`font-medium`, `font-semibold`). On mobile: `textStyle("<style>")`.',
      },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
export const AllStyles: StoryObj<typeof meta> = {}
