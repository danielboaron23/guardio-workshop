import type { StorybookConfig } from '@storybook/react-vite'

// Storybook reuses the app's vite.config.ts, so Tailwind and the design tokens work the same as in the app.
const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
}

export default config
