// Tiny hash router — enough for a small demo app, no dependency.
import type { SettingsTabId, UserStateId } from '@guardio/data'
import { useSyncExternalStore } from 'react'

/** The three To-dos concepts (docs/specs/todos-page.md, research directions A/B/C). */
export type TodosConcept = 'a' | 'b' | 'c'
export type TodosTab = 'open' | 'later' | 'fixed'
/** Workshop preview of page states that are hard to reach with mock data. */
export type TodosPreview = 'live' | 'loading' | 'error' | 'allFixed'

export type Route =
  | { page: 'home' }
  | { page: 'settings'; tab: SettingsTabId }
  | { page: 'todos'; concept: TodosConcept; tab: TodosTab; state?: UserStateId; preview: TodosPreview }

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

const CONCEPTS: TodosConcept[] = ['a', 'b', 'c']
const TABS: TodosTab[] = ['open', 'later', 'fixed']
const PREVIEWS: TodosPreview[] = ['live', 'loading', 'error', 'allFixed']
const STATES: UserStateId[] = ['onboarding', 'activated', 'nothingInstalled', 'atRisk']

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash)
  const [path, query = ''] = hash.split('?')
  const [, page, a, b] = path.split('/')
  if (page === 'settings') return { page, tab: (a || 'profile') as SettingsTabId }
  if (page === 'todos') {
    const params = new URLSearchParams(query)
    const concept = CONCEPTS.includes(a as TodosConcept) ? (a as TodosConcept) : 'b'
    const tab = TABS.includes(b as TodosTab) ? (b as TodosTab) : 'open'
    const state = STATES.find((s) => s === params.get('state'))
    const preview = PREVIEWS.find((p) => p === params.get('preview')) ?? 'live'
    return { page, concept, tab, state, preview }
  }
  return { page: 'home' }
}

export const href = {
  home: '#/',
  settings: (tab: SettingsTabId = 'profile') => `#/settings/${tab}`,
  /** Concept B is concept 1, the default for the header's "To do". */
  todos: (
    concept: TodosConcept = 'b',
    tab: TodosTab = 'open',
    opts: { state?: UserStateId; preview?: TodosPreview } = {},
  ) => {
    const params = new URLSearchParams()
    if (opts.state) params.set('state', opts.state)
    if (opts.preview && opts.preview !== 'live') params.set('preview', opts.preview)
    const q = params.toString()
    return `#/todos/${concept}${tab === 'open' ? '' : `/${tab}`}${q ? `?${q}` : ''}`
  },
}
