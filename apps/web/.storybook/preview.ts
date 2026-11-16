import type { Preview } from '@storybook/react-vite'

import '../src/index.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    options: {
      storySort: {
        order: [
          'Introduction',
          'How to work with the system',
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Radius', 'Assets'],
          'Components',
          'Patterns',
          'Screens',
          'Platforms',
        ],
      },
    },
    controls: { expanded: true },
  },
}

export default preview
