// Concept B — "Top three, the rest can wait" (concept 1, approved in step 6).
// Three ranked items, the first open; done items keep their place with a check and the
// next rises in. Everything else is bundled by kind of fix. Research direction B.
import checkCircle from '@guardio/assets/settings/check-circle.svg'
import { rankedTodos, todoBundles, type TodoItem, type TodoStatus } from '@guardio/data'
import { useState } from 'react'

import { Button } from '../../components/settings-ui'
import { RankNumber, StepList, VerifyHint } from '../../components/todos-ui'
import { Card, IconTile, SectionTitle, StatusBadge, TextLink } from '../../components/ui'
import { BundleRow, Chevron, TodosFrame, type ConceptProps } from './shared'
import { ROW_FOCUS, bundleOf, useTodoState } from './state'

export function ConceptB(props: ConceptProps) {
  const todos = useTodoState()
  // undefined = follow the first open item; null = all closed; id = the one the user opened
  const [pinned, setPinned] = useState<string | null | undefined>(undefined)
  const [opened, setOpened] = useState<Record<string, boolean>>({})
  const { st } = todos
  const set = (id: string, s: TodoStatus) => {
    todos.set(id, s)
    setPinned(undefined) // the next open item opens by itself
  }

  // The top set: done items keep their place (with a check), and open items fill it up to three.
  const top: TodoItem[] = []
  let openShown = 0
  for (const t of rankedTodos) {
    const s = st(t.id)
    if (s === 'fixed' || s === 'checking') top.push(t)
    else if (s === 'open' && openShown < 3) {
      top.push(t)
      openShown++
    }
  }
  const topIds = new Set(top.map((t) => t.id))
  // Open items are numbered 1–3, so "Start with these 3" always reads 1, 2, 3; done items show a check.
  let openRank = 0
  const ranks = top.map((t) => (st(t.id) === 'open' ? ++openRank : 0))
  const firstOpen = top.find((t) => st(t.id) === 'open')?.id ?? null
  const expandedId = pinned === undefined ? firstOpen : pinned
  const bundles = todoBundles.map((b) => bundleOf(todos, b.kind, topIds)).filter((b) => b.remaining > 0)

  return (
    <TodosFrame {...props} todos={todos}>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <SectionTitle>Start with these 3</SectionTitle>
          <p className="text-body-md text-text-secondary">
            Picked by Guardio: the issues most likely to be misused right now. Each one says why.
          </p>
        </div>
        <Card>
          {top.map((t, i) => (
            <TopRow
              key={t.id}
              item={t}
              rank={ranks[i]}
              last={i === top.length - 1}
              status={st(t.id)}
              expanded={expandedId === t.id}
              opened={!!opened[t.id]}
              onToggle={() => setPinned(expandedId === t.id ? null : t.id)}
              onOpen={() => (t.verify === 'auto' ? set(t.id, 'checking') : setOpened((o) => ({ ...o, [t.id]: true })))}
              onDone={() => set(t.id, 'fixed')}
              onLater={() => set(t.id, 'later')}
              onDismiss={() => set(t.id, 'dismissed')}
            />
          ))}
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <SectionTitle>Everything else ({todos.openCount - openShown})</SectionTitle>
          <p className="text-body-md text-text-secondary">
            These can wait. They stay on your list, and at risk, until they’re fixed. Grouped by what you’d do.
          </p>
        </div>
        <Card>
          {bundles.map((b, i) => (
            <BundleRow
              key={b.kind}
              kind={b.kind}
              remaining={b.remaining}
              items={b.items}
              last={i === bundles.length - 1}
              onLater={(id) => set(id, 'later')}
            />
          ))}
        </Card>
      </section>
    </TodosFrame>
  )
}

/** A ranked item in "Start with these 3". The open one shows the why, the steps and the actions. */
function TopRow({
  item,
  rank,
  last,
  status,
  expanded,
  opened,
  onToggle,
  onOpen,
  onDone,
  onLater,
  onDismiss,
}: {
  item: TodoItem
  rank: number
  last: boolean
  status: TodoStatus
  expanded: boolean
  opened: boolean
  onToggle: () => void
  onOpen: () => void
  onDone: () => void
  onLater: () => void
  onDismiss: () => void
}) {
  const done = status === 'fixed' || status === 'checking'
  const line = done
    ? status === 'fixed'
      ? 'Done. It’s off your list.'
      : 'Guardio is checking. We’ll confirm within a day, nothing else to do.'
    : item.why
  return (
    <div className={last ? '' : 'border-b border-border'}>
      <button
        type="button"
        onClick={done ? undefined : onToggle}
        aria-expanded={done ? undefined : expanded}
        className={`flex w-full items-center gap-5 px-6 py-5 text-left ${ROW_FOCUS} ${done ? 'cursor-default' : 'cursor-pointer hover:bg-surface'}`}
      >
        {done ? <img src={checkCircle} alt="" className="size-6 shrink-0" /> : <RankNumber n={rank} />}
        <IconTile icon={item.icon} />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={`text-title-md font-semibold ${done ? 'text-text-secondary' : 'text-text-strong'}`}>{item.title}</span>
          <span className="text-body-md text-text-secondary">{line}</span>
        </span>
        {done ? <StatusBadge status={status === 'fixed' ? 'fixed' : 'checking'} /> : <VerifyHint verify={item.verify} />}
        {!done && <Chevron open={expanded} />}
      </button>

      {expanded && !done && (
        <div className="grid grid-cols-[1fr_280px] gap-10 pr-6 pb-6 pl-[134px]">
          <div className="flex flex-col gap-4">
            <p className="text-body-sm text-text-secondary">
              {item.asset} · {item.issue} · {item.detected}
              {item.breachDate && ` · Breach: ${item.breachDate}`}
            </p>
            {item.steps && <StepList steps={item.steps} />}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Button onClick={onOpen}>{item.action}</Button>
              {item.where && (
                <p className="text-center text-body-sm text-text-secondary">
                  {opened ? `Opened ${item.where}. Come back when you’re done.` : `Happens on ${item.where}`}
                </p>
              )}
            </div>
            {item.verify === 'manual' && (
              <Button variant="outline" onClick={onDone}>
                I changed it
              </Button>
            )}
            <div className="flex gap-4 pt-1">
              <TextLink size="md" onClick={onLater}>
                Later
              </TextLink>
              <TextLink size="md" onClick={onDismiss}>
                Not relevant to me
              </TextLink>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
