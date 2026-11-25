// Desktop To-dos page — three concepts of one page (docs/specs/todos-page.md),
// one per research direction (docs/research/todos-page). No Figma frame exists.
//   B · Top three, the rest can wait — concept 1 (step 6)   → todos/ConceptB.tsx
//   A · Next up, one fix at a time — concept 2 (step 7)    → todos/ConceptA.tsx
//   C · Fix by kind, work through a batch — concept 3 (step 7) → todos/ConceptC.tsx
// What they share (state, frame, rows) is in todos/shared.tsx.
import { CURRENT_STATE, USER_STATES, type UserStateId } from '@guardio/data'

import { href, type TodosConcept, type TodosPreview, type TodosTab } from '../router'
import { ConceptA } from './todos/ConceptA'
import { ConceptB } from './todos/ConceptB'
import { ConceptC } from './todos/ConceptC'

type Props = { concept: TodosConcept; tab: TodosTab; state?: UserStateId; preview: TodosPreview }

const CONCEPTS = { a: ConceptA, b: ConceptB, c: ConceptC }

export function Todos(props: Props) {
  const userState = props.state ?? CURRENT_STATE
  const Concept = CONCEPTS[props.concept]
  return (
    <>
      <PreviewBar {...props} userState={userState} />
      {/* key: switching concept or user state starts that concept fresh */}
      <Concept key={`${props.concept}-${userState}`} {...props} userState={userState} />
    </>
  )
}

// ───────── Workshop scaffolding (not product UI) ─────────

const CONCEPT_LABELS: Record<TodosConcept, string> = { a: 'A · Next up', b: 'B · Top three', c: 'C · Fix by kind' }
const PREVIEW_LABELS: Record<TodosPreview, string> = { live: 'Live', loading: 'Loading', error: 'Error', allFixed: 'All fixed' }

/** A dashed bar above the page to switch concept, user state and page state. Not part of the product. */
function PreviewBar({ concept, tab, preview, userState }: Props & { userState: UserStateId }) {
  const link = (to: string, label: string, current: boolean) => (
    <a
      key={label}
      href={to}
      aria-current={current ? 'true' : undefined}
      className={current ? 'font-medium text-text-strong underline underline-offset-4' : 'text-text-secondary hover:text-text-primary'}
    >
      {label}
    </a>
  )
  return (
    <div className="border-b border-dashed border-border bg-surface" aria-label="Workshop preview controls">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-2 px-20 py-2.5 text-body-sm">
        <span className="font-semibold text-text-primary">Workshop preview</span>
        <span className="flex items-center gap-3">
          <span className="text-text-muted">Concept</span>
          {(['a', 'b', 'c'] as const).map((c) => link(href.todos(c, 'open', { state: userState, preview }), CONCEPT_LABELS[c], c === concept))}
        </span>
        <span className="flex items-center gap-3">
          <span className="text-text-muted">User state</span>
          {USER_STATES.map((s) => link(href.todos(concept, tab, { state: s.id, preview }), s.label, s.id === userState))}
        </span>
        <span className="flex items-center gap-3">
          <span className="text-text-muted">Page state</span>
          {(Object.keys(PREVIEW_LABELS) as TodosPreview[]).map((p) =>
            link(href.todos(concept, tab, { state: userState, preview: p }), PREVIEW_LABELS[p], p === preview),
          )}
        </span>
      </div>
    </div>
  )
}
