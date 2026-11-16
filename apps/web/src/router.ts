// Tiny hash router — enough for a two-page demo app, no dependency.
import type { SettingsTabId } from '@guardio/data'
import { useSyncExternalStore } from 'react'

export type Route = { page: 'home' } | { page: 'settings'; tab: SettingsTabId }

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash)
  const [, page, tab] = hash.split('/')
  if (page === 'settings') return { page, tab: (tab || 'profile') as SettingsTabId }
  return { page: 'home' }
}

export const href = {
  home: '#/',
  settings: (tab: SettingsTabId = 'profile') => `#/settings/${tab}`,
}
