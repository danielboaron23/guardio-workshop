// To-dos state shared by the three concepts: each to-do's status in this session,
// the counts that follow from it, and the bundles by kind of fix.
import { rankedTodos, todoBundles, todosPage, type TodoItem, type TodoKind, type TodoStatus } from '@guardio/data'
import { useState } from 'react'

/** Every open to-do the demo knows by name: the ranked ones, then the bundle samples. */
export const ALL_TODOS: TodoItem[] = [...rankedTodos, ...todoBundles.flatMap((b) => b.more)]

/** Status of every to-do in this session, and the counts that follow from it. */
export function useTodoState() {
  const [status, setStatus] = useState<Record<string, TodoStatus>>({})
  const st = (id: string): TodoStatus => status[id] ?? 'open'
  const set = (id: string, s: TodoStatus) => setStatus((prev) => ({ ...prev, [id]: s }))
  const changed = Object.values(status)
  const n = (s: TodoStatus) => changed.filter((x) => x === s).length
  const laterNow = ALL_TODOS.filter((t) => st(t.id) === 'later')
  const dismissedNow = ALL_TODOS.filter((t) => st(t.id) === 'dismissed')
  const doneNow = ALL_TODOS.filter((t) => st(t.id) === 'fixed' || st(t.id) === 'checking')
  return {
    st,
    set,
    n,
    openCount: todosPage.openCount - n('fixed') - n('checking') - n('later') - n('dismissed'),
    laterNow,
    dismissedNow,
    doneNow,
    laterCount: todosPage.later.length + laterNow.length + dismissedNow.length,
    fixedCount: todosPage.fixed.length + n('fixed'),
  }
}
export type TodoState = ReturnType<typeof useTodoState>

/** Open items of one kind beyond those shown elsewhere, and how many remain in total. */
export function bundleOf(todos: TodoState, kind: TodoKind, shownElsewhere: Set<string> = new Set()) {
  const b = todoBundles.find((x) => x.kind === kind)!
  const ranked = rankedTodos.filter((t) => t.kind === kind)
  const items = [
    ...ranked.filter((t) => !shownElsewhere.has(t.id) && todos.st(t.id) === 'open'),
    ...b.more.filter((t) => todos.st(t.id) === 'open'),
  ]
  const used =
    ranked.filter((t) => shownElsewhere.has(t.id) || todos.st(t.id) !== 'open').length +
    b.more.filter((t) => todos.st(t.id) !== 'open').length
  return { kind, total: b.total, remaining: b.total - used, items }
}

/** Focus ring for full-width row buttons. */
export const ROW_FOCUS = 'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-border-selected'
