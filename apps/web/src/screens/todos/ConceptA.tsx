// Concept A — "Next up": one fix at a time (concept 2, step 7). Research direction A.
// The page is a single fix Guardio picked, with why it's first. Fix it, and a short
// "done" moment hands over to the next. Skip, Later and "See all" keep the user in control.
// In At risk, the payment fix is the card (it outranks every to-do).
import checkCircle from '@guardio/assets/settings/check-circle.svg'
import { TODO_KINDS, rankedTodos, todoBundles, type TodoItem } from '@guardio/data'
import { useState, type ReactNode } from 'react'

import { Button } from '../../components/settings-ui'
import { EmptyState, StepList, VerifyHint } from '../../components/todos-ui'
import { Card, CardHeader, IconTile, InfoBadge, SectionTitle, TextLink } from '../../components/ui'
import { href } from '../../router'
import { BundleRow, ItemRow, TodosFrame, type ConceptProps } from './shared'
import { ALL_TODOS, bundleOf, useTodoState } from './state'

export function ConceptA(props: ConceptProps) {
  const todos = useTodoState()
  const { st } = todos
  const [skipped, setSkipped] = useState<string[]>([])
  const [justDone, setJustDone] = useState<TodoItem | null>(null)
  const [opened, setOpened] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)

  // The queue: ranked items in order, skipped ones moved to the end, then the rest by kind.
  const open = (t: TodoItem) => st(t.id) === 'open'
  const ranked = rankedTodos.filter((t) => open(t) && !skipped.includes(t.id))
  const queue = [
    ...ranked,
    ...skipped.map((id) => ALL_TODOS.find((t) => t.id === id)!).filter(open),
    ...todoBundles.flatMap((b) => b.more).filter((t) => open(t) && !skipped.includes(t.id)),
  ]
  const current = queue[0]
  const upNext = queue.slice(1, 3)
  const payment = props.userState === 'atRisk' && !paymentDone

  const finish = (t: TodoItem) => {
    todos.set(t.id, t.verify === 'auto' ? 'checking' : 'fixed')
    setJustDone(t)
    setOpened(false)
  }
  const move = (t: TodoItem, to: 'later' | 'dismissed') => {
    todos.set(t.id, to)
    setOpened(false)
  }

  const shown = new Set(current ? [current.id] : [])
  const bundles = todoBundles.map((b) => bundleOf(todos, b.kind, shown)).filter((b) => b.remaining > 0)

  return (
    <TodosFrame {...props} todos={todos} paymentInPage>
      <div className="grid grid-cols-[1fr_360px] items-start gap-8">
        {/* The one card */}
        {payment ? (
          <NextCard
            eyebrow="Start here"
            title="Update your payment"
            why="Your protection is paused because your last payment didn’t go through. Until it’s fixed, nothing below is being checked."
            meta="Guardio subscription · Payment failed · 3 days ago"
            steps={['Open your subscription in Settings.', 'Update your card or choose another way to pay.']}
            actions={
              <>
                <Button variant="destructive">Update payment</Button>
                <Button variant="outline" onClick={() => setPaymentDone(true)}>
                  I’ve updated it
                </Button>
              </>
            }
          />
        ) : justDone ? (
          <Card className="flex flex-col items-start gap-4 p-8">
            <img src={checkCircle} alt="" className="size-8" />
            <div className="flex flex-col gap-1">
              <p className="text-headline-sm font-semibold text-text-strong">
                {st(justDone.id) === 'checking' ? 'Nice. Guardio is checking it.' : 'Done. One less way in.'}
              </p>
              <p className="text-body-lg text-text-secondary">
                {st(justDone.id) === 'checking'
                  ? `We’ll confirm “${justDone.title}” within a day. Nothing else to do.`
                  : `“${justDone.title}” is off your list.`}{' '}
                {todos.openCount} left.
              </p>
            </div>
            {current ? (
              <div className="flex items-center gap-6 pt-2">
                <Button onClick={() => setJustDone(null)}>Next: {current.title}</Button>
                <TextLink href={href.home}>That’s enough for today</TextLink>
              </div>
            ) : null}
          </Card>
        ) : current ? (
          <NextCard
            eyebrow="Next up"
            icon={<IconTile icon={current.icon} />}
            title={current.title}
            why={current.why ?? TODO_KINDS[current.kind].why}
            meta={`${current.asset} · ${current.issue} · ${current.detected}${current.breachDate ? ` · Breach: ${current.breachDate}` : ''}`}
            steps={current.steps ?? TODO_KINDS[current.kind].steps}
            hint={<VerifyHint verify={current.verify} />}
            actions={
              <>
                <div className="flex flex-col gap-1.5">
                  <Button onClick={() => (current.verify === 'auto' ? finish(current) : setOpened(true))}>
                    {current.action}
                  </Button>
                  {current.where && (
                    <p className="text-center text-body-sm text-text-secondary">
                      {opened ? `Opened ${current.where}. Come back when you’re done.` : `Happens on ${current.where}`}
                    </p>
                  )}
                </div>
                {current.verify === 'manual' && (
                  <Button variant="outline" onClick={() => finish(current)}>
                    I changed it
                  </Button>
                )}
              </>
            }
            links={
              <>
                <TextLink size="md" onClick={() => { setSkipped((s) => [...s, current.id]); setOpened(false) }}>
                  Skip for now
                </TextLink>
                <TextLink size="md" onClick={() => move(current, 'later')}>
                  Move to Later
                </TextLink>
                <TextLink size="md" onClick={() => move(current, 'dismissed')}>
                  Not relevant to me
                </TextLink>
              </>
            }
          />
        ) : (
          <EmptyState icon="check" title="Nothing needs you right now">
            We’ll let you know if something comes up.
          </EmptyState>
        )}

        {/* Side: progress as a count, what's next, and the way to everything */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader title="Your progress" />
            <dl className="grid grid-cols-3 gap-4 px-6 pb-6">
              <Stat label="Fixed today" value={todos.n('fixed')} />
              <Stat label="This month" value={todos.fixedCount} />
              <Stat label="Still open" value={todos.openCount} />
            </dl>
          </Card>
          <Card>
            <CardHeader title={payment ? 'After that' : 'Up next'} />
            {(payment ? queue.slice(0, 2) : upNext).map((t, i, arr) => (
              <ItemRow key={t.id} item={{ asset: t.asset, icon: t.icon, title: t.title }} last={i === arr.length - 1} wrap />
            ))}
            <div className="p-6 pt-4">
              <TextLink size="md" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Hide the full list' : `See all ${todos.openCount}`}
              </TextLink>
            </div>
          </Card>
        </div>
      </div>

      {showAll && (
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <SectionTitle>All open to-dos ({todos.openCount})</SectionTitle>
            <p className="text-body-md text-text-secondary">Grouped by what you’d do. The one above comes first.</p>
          </div>
          <Card>
            {bundles.map((b, i) => (
              <BundleRow
                key={b.kind}
                kind={b.kind}
                remaining={b.remaining}
                items={b.items}
                last={i === bundles.length - 1}
                onLater={(id) => todos.set(id, 'later')}
              />
            ))}
          </Card>
        </section>
      )}
    </TodosFrame>
  )
}

/** The single "Next up" card: what, why it's first, the steps, the actions. */
function NextCard({
  eyebrow,
  icon,
  title,
  why,
  meta,
  steps,
  hint,
  actions,
  links,
}: {
  eyebrow: string
  icon?: ReactNode
  title: string
  why: string
  meta: string
  steps: string[]
  hint?: ReactNode
  actions: ReactNode
  links?: ReactNode
}) {
  return (
    <Card className="flex flex-col">
      <div className="flex flex-col gap-4 p-8">
        <span className="self-start">
          <InfoBadge>{eyebrow}</InfoBadge>
        </span>
        <div className="flex items-start gap-5">
          {icon}
          <div className="flex flex-col gap-1">
            <h2 className="text-headline-sm font-semibold text-text-strong">{title}</h2>
            <p className="text-body-lg text-text-secondary">{why}</p>
          </div>
        </div>
        <p className="text-body-sm text-text-secondary">{meta}</p>
      </div>
      <div className="grid grid-cols-[1fr_260px] gap-10 border-t border-border p-8">
        <div className="flex flex-col gap-3">
          <p className="text-body-md font-medium text-text-strong">How to fix it</p>
          <StepList steps={steps} />
        </div>
        <div className="flex flex-col gap-3">
          {actions}
          {hint && <div className="flex justify-center pt-1">{hint}</div>}
        </div>
      </div>
      {links && <div className="flex gap-6 border-t border-border px-8 py-4">{links}</div>}
    </Card>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-body-sm text-text-secondary">{label}</dt>
      <dd className="text-title-xl font-semibold text-text-strong">{value}</dd>
    </div>
  )
}
