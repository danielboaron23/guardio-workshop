// What the three To-dos concepts share: the to-do state, the page frame (title, notices,
// tabs, user and page states, Later and Fixed), and the rows. Each concept only supplies
// the "To do" tab. Spec: docs/specs/todos-page.md.
import chevronDown from '@guardio/assets/home/d-chevron-down.svg'
import checkCircle from '@guardio/assets/settings/check-circle.svg'
import { TODO_KINDS, todosPage, type TodoItem, type TodoKind, type UserStateId } from '@guardio/data'
import { useState, type ReactNode } from 'react'

import { Button } from '../../components/settings-ui'
import { EmptyState, Notice, SkeletonRows, StepList, VerifyHint } from '../../components/todos-ui'
import { Card, CardHeader, CountBadge, IconTile, StatusBadge, Tabs, TextLink } from '../../components/ui'
import { href, type TodosConcept, type TodosPreview, type TodosTab } from '../../router'
import type { TodoState } from './state'

export type ConceptProps = {
  concept: TodosConcept
  tab: TodosTab
  state?: UserStateId
  preview: TodosPreview
  userState: UserStateId
}

/**
 * The page around every concept: title and freshness, user-state notices, the
 * To do / Later / Fixed tabs, loading / error / all-fixed, and the Later and Fixed tabs.
 * `children` is the concept's own "To do" tab. `paymentInPage` = the concept shows
 * the At risk payment fix itself (concept A makes it the card).
 */
export function TodosFrame({
  tab,
  state,
  preview,
  userState,
  concept,
  todos,
  paymentInPage = false,
  children,
}: ConceptProps & { todos: TodoState; paymentInPage?: boolean; children: ReactNode }) {
  const tabHref = (t: TodosTab) => href.todos(concept, t, { state, preview })
  const atRisk = userState === 'atRisk'

  if (userState === 'nothingInstalled') {
    return (
      <Page title="To-dos" subtitle="Nothing is being checked yet">
        <EmptyState icon="shield" title="Install Guardio to start finding issues" action={<Button>Install Guardio</Button>}>
          Once Guardio is on your browser or phone, we check your accounts and devices and list what needs you here.
          Until then, we can’t tell you everything is fine.
        </EmptyState>
      </Page>
    )
  }

  const shownOpen = preview === 'allFixed' ? 0 : todos.openCount
  // While loading or after an error the counts are unknown, so they are not shown.
  const unknown = preview === 'loading' || preview === 'error'
  const fixedToday = todos.n('fixed')
  const subtitle =
    preview === 'loading' ? (
      'Checking your accounts and devices…'
    ) : preview === 'error' ? (
      'Couldn’t load the list'
    ) : (
      <>
        {shownOpen === 0 ? 'Nothing open' : `${shownOpen} open`} · Last checked{' '}
        {atRisk ? '3 days ago, may be out of date' : todosPage.lastChecked}
        {fixedToday > 0 && (
          <span className="ml-2 inline-flex items-center gap-1 text-success-subtle-foreground">
            · <img src={checkCircle} alt="" className="size-3.5" /> {fixedToday} fixed today
          </span>
        )}
      </>
    )

  return (
    <Page title="To-dos" subtitle={subtitle}>
      {userState === 'onboarding' && (
        <Notice tone="info" title="We’re still setting up" action={<TextLink href={href.home}>Continue setup</TextLink>}>
          1 of 6 setup steps done. We’ll find more as you finish setup.
        </Notice>
      )}
      {atRisk && !paymentInPage && (
        <Notice tone="risk" title="Your protection is paused" action={<Button variant="destructive">Update payment</Button>}>
          Your last payment didn’t go through, so we stopped checking. This comes before any to-do.
        </Notice>
      )}

      <Tabs
        label="To-dos"
        value={tab}
        hrefFor={tabHref}
        tabs={
          unknown
            ? [
                { id: 'open', label: 'To do' },
                { id: 'later', label: 'Later' },
                { id: 'fixed', label: 'Fixed' },
              ]
            : [
                { id: 'open', label: `To do (${shownOpen})` },
                { id: 'later', label: `Later (${todos.laterCount})` },
                { id: 'fixed', label: `Fixed (${todos.fixedCount})` },
              ]
        }
      />

      {preview === 'loading' && (
        <Card>
          <SkeletonRows rows={3} />
        </Card>
      )}

      {preview === 'error' && (
        <EmptyState
          icon="shield"
          title="We couldn’t load your to-dos"
          action={<TextLink href={href.todos(concept, tab, { state })}>Try again</TextLink>}
        >
          Your protection is still on. Only this page didn’t load.
        </EmptyState>
      )}

      {preview === 'allFixed' && tab === 'open' && (
        <EmptyState icon="check" title="Nothing needs you right now">
          Guardio checked your 112 accounts and 4 devices {todosPage.lastChecked} and keeps watching. We’ll let you
          know if something comes up.{' '}
          <TextLink size="md" href={tabHref('later')}>
            {todos.laterCount} you put off are still at risk
          </TextLink>
        </EmptyState>
      )}

      {preview === 'live' && tab === 'open' && children}

      {(preview === 'live' || preview === 'allFixed') && tab === 'later' && <LaterPanel todos={todos} />}
      {(preview === 'live' || preview === 'allFixed') && tab === 'fixed' && <FixedPanel todos={todos} />}
    </Page>
  )
}

/** Page frame — same width, padding and rhythm as Home. */
export function Page({ title, subtitle, children }: { title: string; subtitle: ReactNode; children: ReactNode }) {
  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-8 px-20 pt-[55px] pb-16">
      <div className="flex flex-col gap-1">
        <h1 className="text-headline-md font-semibold text-text-primary">{title}</h1>
        <p className="text-body-md text-text-secondary">{subtitle}</p>
      </div>
      {children}
    </main>
  )
}

function LaterPanel({ todos }: { todos: TodoState }) {
  return (
    <Card>
      <CardHeader title="Later" count={todos.laterCount} />
      <p className="-mt-3 px-6 pb-2 text-body-md text-text-secondary">
        You put these off. They’re still at risk until they’re fixed.
      </p>
      {[...todosPage.later, ...todos.laterNow].map((t, i, arr) => (
        <ItemRow key={t.id} item={t} last={i === arr.length - 1 && todos.dismissedNow.length === 0}>
          <StatusBadge status="later" />
          {todos.laterNow.includes(t) ? (
            <TextLink size="md" onClick={() => todos.set(t.id, 'open')}>
              Move back
            </TextLink>
          ) : (
            <TextLink size="md">{t.action}</TextLink>
          )}
        </ItemRow>
      ))}
      {todos.dismissedNow.length > 0 && (
        <>
          <p className="px-6 pt-4 text-label-sm font-medium text-text-muted uppercase">Not relevant to you</p>
          {todos.dismissedNow.map((t, i) => (
            <ItemRow key={t.id} item={t} last={i === todos.dismissedNow.length - 1}>
              <TextLink size="md" onClick={() => todos.set(t.id, 'open')}>
                Restore
              </TextLink>
            </ItemRow>
          ))}
        </>
      )}
    </Card>
  )
}

function FixedPanel({ todos }: { todos: TodoState }) {
  return (
    <Card>
      <CardHeader title="Fixed this month" count={todos.fixedCount} />
      {todos.doneNow.map((t) => (
        <ItemRow key={t.id} item={t}>
          <StatusBadge status={todos.st(t.id) === 'checking' ? 'checking' : 'fixed'} />
          <span className="w-[110px] text-body-md text-text-secondary">Today</span>
        </ItemRow>
      ))}
      {todosPage.fixed.map((f, i) => (
        <ItemRow key={f.id} item={{ asset: f.asset, icon: f.icon, title: f.title }} last={i === todosPage.fixed.length - 1}>
          <StatusBadge status="fixed" />
          <span className="w-[110px] text-body-md text-text-secondary">{f.fixedOn}</span>
        </ItemRow>
      ))}
    </Card>
  )
}

/** One kind of fix, bundled: how to fix it once, then the affected assets. */
export function BundleRow({
  kind,
  remaining,
  items,
  last,
  onLater,
}: {
  kind: TodoKind
  remaining: number
  items: TodoItem[]
  last: boolean
  onLater: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const info = TODO_KINDS[kind]
  const more = remaining - items.length
  return (
    <div className={last ? '' : 'border-b border-border'}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center gap-5 px-6 py-5 text-left hover:bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-border-selected"
      >
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex items-center gap-3 text-body-lg font-medium text-text-strong">
            {info.label}
            <CountBadge>{remaining}</CountBadge>
          </span>
          <span className="text-body-md text-text-secondary">{info.why}</span>
        </span>
        <VerifyHint verify={info.verify} />
        <Chevron open={open} />
      </button>
      {open && (
        <div className="flex flex-col gap-4 px-6 pb-6">
          <div className="rounded-md bg-surface p-5">
            <p className="pb-3 text-body-md font-medium text-text-strong">How to fix: {info.fix.toLowerCase()}</p>
            <StepList steps={info.steps} />
          </div>
          <div className="flex flex-col">
            {items.map((t, i) => (
              <ItemRow key={t.id} item={t} last={i === items.length - 1 && more <= 0} inset={false}>
                <TextLink size="md">{t.action}</TextLink>
                <TextLink size="md" onClick={() => onLater(t.id)}>
                  Later
                </TextLink>
              </ItemRow>
            ))}
          </div>
          {more > 0 && (
            <p className="text-body-md text-text-secondary">
              And {more} more {more === 1 ? 'like this' : 'like these'}. <TextLink size="md">Show all</TextLink>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/** A compact row: icon tile, title, what's wrong, then actions on the right. Home's to-do row anatomy. */
export function ItemRow({
  item,
  last = false,
  inset = true,
  lead,
  wrap = false,
  note,
  children,
}: {
  item: Pick<TodoItem, 'asset' | 'icon' | 'title'> & Partial<Pick<TodoItem, 'issue' | 'detected' | 'breachDate'>>
  last?: boolean
  inset?: boolean
  /** Something before the icon tile, e.g. a done circle. */
  lead?: ReactNode
  /** Let the title wrap instead of cutting it (narrow columns). */
  wrap?: boolean
  /** An extra line under the details, e.g. why this item is first. */
  note?: string
  children?: ReactNode
}) {
  return (
    <div className={inset ? 'px-6' : ''}>
      <div className={`flex min-h-16 items-center gap-5 py-3 ${inset ? 'px-2' : ''} ${last ? '' : 'border-b border-border'}`}>
        {lead}
        <IconTile icon={item.icon} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className={`${wrap ? 'text-body-md' : 'truncate text-body-lg'} text-text-primary`}>{item.title}</span>
          {item.issue && (
            <span className="truncate text-body-sm text-text-secondary">
              {item.issue}
              {item.detected && ` · ${item.detected}`}
              {item.breachDate && ` · Breach: ${item.breachDate}`}
            </span>
          )}
          {note && <span className="pt-1 text-body-sm text-text-primary">{note}</span>}
        </span>
        <span className="flex shrink-0 items-center gap-4">{children}</span>
      </div>
    </div>
  )
}

export function Chevron({ open }: { open: boolean }) {
  return (
    <img
      src={chevronDown}
      alt=""
      className={`shrink-0 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
    />
  )
}
