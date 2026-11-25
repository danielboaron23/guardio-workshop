// Concept C — "Fix by kind": work through a batch (concept 3, step 7). Research direction C.
// The unit is a kind of fix, not a single issue: one set of instructions, then a checklist
// of the affected sites and devices. Guardio orders the batches and marks where to start
// inside each one, so a critical item is not buried in a big batch.
import checkCircle from '@guardio/assets/settings/check-circle.svg'
import { TODO_KINDS, rankedTodos, todoBundles, type TodoItem, type TodoKind } from '@guardio/data'
import { useState } from 'react'

import { StepList, VerifyHint } from '../../components/todos-ui'
import { Card, CountBadge, InfoBadge, StatusBadge, TextLink } from '../../components/ui'
import { ItemRow, TodosFrame, type ConceptProps } from './shared'
import { ROW_FOCUS, bundleOf, useTodoState, type TodoState } from './state'

/** Guardio's order of the batches, with the reason each one sits where it does. */
const BATCHES: { kind: TodoKind; reason: string }[] = [
  { kind: 'exposedPassword', reason: 'Most urgent: includes your Gmail password, found 3 days ago.' },
  { kind: 'appOutdated', reason: 'Quickest: two phones, about a minute each.' },
  { kind: 'twoStepOff', reason: 'Stops someone who has your password from signing in.' },
  { kind: 'biometricsOff', reason: 'One phone without a lock.' },
  { kind: 'emailUnconfirmed', reason: 'One address we can’t watch yet.' },
]

export function ConceptC(props: ConceptProps) {
  const todos = useTodoState()
  const batches = BATCHES.map((b) => ({ ...b, ...bundleOf(todos, b.kind) }))
  const firstOpen = batches.find((b) => b.remaining > 0)?.kind ?? batches[0].kind
  const [picked, setPicked] = useState<TodoKind | null>(null)
  const selected = batches.find((b) => b.kind === (picked ?? firstOpen))!

  return (
    <TodosFrame {...props} todos={todos}>
      <div className="grid grid-cols-[360px_1fr] items-start gap-8">
        {/* The batches, in Guardio's order */}
        <Card className="overflow-hidden">
          <p className="px-6 pt-5 pb-2 text-body-md text-text-secondary">
            Fix one kind at a time. We’ve put them in order.
          </p>
          <ol>
            {batches.map((b, i) => {
              const done = b.total - b.remaining
              const active = b.kind === selected.kind
              return (
                <li key={b.kind} className={i < batches.length - 1 ? 'border-b border-border' : ''}>
                  <button
                    type="button"
                    aria-current={active ? 'true' : undefined}
                    onClick={() => setPicked(b.kind)}
                    className={`flex w-full cursor-pointer items-start gap-3 px-6 py-4 text-left ${ROW_FOCUS} ${
                      active ? 'bg-accent' : 'hover:bg-surface'
                    }`}
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="flex items-center gap-2 text-body-lg font-medium text-text-strong">
                        {TODO_KINDS[b.kind].label}
                        {b.remaining > 0 ? <CountBadge>{b.remaining}</CountBadge> : <img src={checkCircle} alt="Done" className="size-4" />}
                      </span>
                      <span className="text-body-sm text-text-secondary">
                        {b.remaining === 0 ? 'Nothing left to do' : done > 0 ? `${done} of ${b.total} done` : b.reason}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </Card>

        {/* The selected batch: how to fix it once, then the checklist */}
        <Batch todos={todos} kind={selected.kind} total={selected.total} remaining={selected.remaining} reason={selected.reason} />
      </div>
    </TodosFrame>
  )
}

function Batch({
  todos,
  kind,
  total,
  remaining,
  reason,
}: {
  todos: TodoState
  kind: TodoKind
  total: number
  remaining: number
  reason: string
}) {
  const info = TODO_KINDS[kind]
  const b = todoBundles.find((x) => x.kind === kind)!
  // Every named item of this kind, in priority order; done ones keep their place with a check.
  const items: TodoItem[] = [...rankedTodos.filter((t) => t.kind === kind), ...b.more].filter((t) =>
    ['open', 'checking', 'fixed'].includes(todos.st(t.id)),
  )
  const startHere = items.find((t) => todos.st(t.id) === 'open')
  const listedOpen = items.filter((t) => todos.st(t.id) === 'open').length
  const more = remaining - listedOpen
  const done = total - remaining
  const checking = items.filter((t) => todos.st(t.id) === 'checking').length

  const mark = (t: TodoItem) => todos.set(t.id, t.verify === 'auto' ? 'checking' : 'fixed')

  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between gap-6 p-8 pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-headline-sm font-semibold text-text-strong">
            {info.fix}
            {remaining > 0 && <span className="text-text-secondary"> · {remaining} left</span>}
          </h2>
          <p className="text-body-lg text-text-secondary">{info.why}</p>
          {/* The ordering reason names specific items, so it goes once work starts */}
          {done === 0 && <p className="text-body-sm text-text-secondary">{reason}</p>}
        </div>
        <span className="shrink-0 pt-1 text-body-md font-medium text-text-strong">
          {done} of {total} done
        </span>
      </div>

      {remaining === 0 ? (
        <div className="flex flex-col items-center gap-2 border-t border-border px-8 py-12 text-center">
          <img src={checkCircle} alt="" className="size-8" />
          <p className="text-title-lg font-semibold text-text-strong">Nothing left to do here</p>
          <p className="text-body-md text-text-secondary">
            {checking > 0
              ? `Guardio is checking ${checking === 1 ? 'it' : `all ${checking}`} and will confirm within a day.`
              : 'Guardio keeps watching. We’ll tell you if a new one comes up.'}
          </p>
        </div>
      ) : (
        <>
          <div className="mx-8 flex items-start justify-between gap-8 rounded-md bg-surface p-5">
            <div className="flex flex-col gap-3">
              <p className="text-body-md font-medium text-text-strong">How to fix, for each one</p>
              <StepList steps={info.steps} />
            </div>
            <VerifyHint verify={info.verify} />
          </div>

          <div className="flex flex-col px-8 pt-4 pb-6">
            {items.map((t, i) => {
              const s = todos.st(t.id)
              const isDone = s !== 'open'
              return (
                <div key={t.id}>
                  <ItemRow
                    item={t}
                    inset={false}
                    last={i === items.length - 1 && more <= 0}
                    note={t === startHere ? t.why : undefined}
                    lead={
                      isDone ? (
                        <img src={checkCircle} alt="" className="size-6 shrink-0" />
                      ) : (
                        <button
                          type="button"
                          onClick={() => mark(t)}
                          aria-label={info.verify === 'auto' ? `Ask Guardio to check ${t.asset}` : `Mark ${t.asset} as done`}
                          className="size-6 shrink-0 cursor-pointer rounded-full border-2 border-border hover:border-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-selected"
                        />
                      )
                    }
                  >
                    {isDone ? (
                      <StatusBadge status={s === 'checking' ? 'checking' : 'fixed'} />
                    ) : (
                      <>
                        {t === startHere && <InfoBadge>Start here</InfoBadge>}
                        <TextLink size="md">{t.action}</TextLink>
                        <TextLink size="md" onClick={() => todos.set(t.id, 'later')}>
                          Later
                        </TextLink>
                      </>
                    )}
                  </ItemRow>
                </div>
              )
            })}
            {more > 0 && (
              <p className="pt-4 text-body-md text-text-secondary">
                And {more} more {more === 1 ? 'like this' : 'like these'}. <TextLink size="md">Show all</TextLink>
              </p>
            )}
          </div>
        </>
      )}
    </Card>
  )
}
