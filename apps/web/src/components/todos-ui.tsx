// Building blocks for the To-dos page (docs/specs/todos-page.md). Composed from the
// existing system — Card, Button, TextLink, tokens. `StepList` is the one new pattern
// (INVENT, proposed back to the design system). Tokens only — no raw colours.
import clock from '@guardio/assets/home/badge-clock.svg'
import shield from '@guardio/assets/home/d-ticker-shield.svg'
import checkCircle from '@guardio/assets/settings/check-circle.svg'
import type { TodoVerify } from '@guardio/data'
import type { ReactNode } from 'react'

import { Card } from './ui'

/** Rank of an item in "Start with these 3". COMPOSE: a circle in accent tokens. */
export function RankNumber({ n }: { n: number }) {
  return (
    <span
      aria-label={`Priority ${n}`}
      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-label-sm font-medium text-text-primary"
    >
      {n}
    </span>
  )
}

/** How Guardio will know the fix is done — on every item (research verdict). */
export function VerifyHint({ verify }: { verify: TodoVerify }) {
  return (
    <span className="flex items-center gap-1.5 text-body-sm text-text-secondary">
      <img src={clock} alt="" className="size-3" />
      {verify === 'auto' ? 'Guardio confirms this one by itself' : 'You tell us when it’s done'}
    </span>
  )
}

/**
 * INVENT — numbered fix steps, for fixes that happen outside Guardio.
 * Anatomy: a number in an accent circle + one short sentence per step.
 * Proposed back to the design system (see DESIGN_CONTEXT.md, Decisions Log).
 */
export function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step, i) => (
        <li key={step} className="flex items-start gap-3 text-body-md text-text-primary">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-border text-label-sm font-medium text-text-secondary">
            {i + 1}
          </span>
          <span className="pt-px">{step}</span>
        </li>
      ))}
    </ol>
  )
}

/**
 * A notice above the list. `info` for Onboarding; `risk` only for the At risk state
 * (red belongs to At risk, never to a to-do). COMPOSE: bordered box + text + action.
 */
export function Notice({
  tone,
  title,
  children,
  action,
}: {
  tone: 'info' | 'risk'
  title: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div
      role={tone === 'risk' ? 'alert' : 'status'}
      className={`flex items-center justify-between gap-6 rounded-md border px-6 py-4 ${
        tone === 'risk' ? 'border-destructive bg-background' : 'border-border bg-issue-bg'
      }`}
    >
      <div className="flex flex-col gap-0.5">
        <p className={`text-body-lg font-semibold ${tone === 'risk' ? 'text-destructive' : 'text-text-strong'}`}>{title}</p>
        <p className="text-body-md text-text-primary">{children}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/** Empty states — COMPOSE: Card + system icon + title + text + optional action. */
export function EmptyState({
  icon,
  title,
  children,
  action,
}: {
  icon: 'check' | 'shield'
  title: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <Card className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      <img src={icon === 'check' ? checkCircle : shield} alt="" className="size-8" />
      <p className="text-title-lg font-semibold text-text-strong">{title}</p>
      <div className="max-w-[520px] text-body-md text-text-secondary">{children}</div>
      {action && <div className="pt-2">{action}</div>}
    </Card>
  )
}

/** Loading placeholder in the shape of the list — reserves space, no layout shift. */
export function SkeletonRows({ rows = 3 }: { rows?: number }) {
  return (
    <div aria-hidden className="flex flex-col">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={`flex h-20 items-center gap-5 px-8 ${i < rows - 1 ? 'border-b border-border' : ''}`}>
          <span className="size-10 rounded-sm bg-accent motion-safe:animate-pulse" />
          <span className="flex flex-1 flex-col gap-2">
            <span className="h-3 w-1/3 rounded-full bg-accent motion-safe:animate-pulse" />
            <span className="h-3 w-1/2 rounded-full bg-accent motion-safe:animate-pulse" />
          </span>
        </div>
      ))}
    </div>
  )
}
