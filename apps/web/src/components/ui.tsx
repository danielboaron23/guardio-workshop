// Small building blocks shared by the desktop screens. Tokens only — no raw colours.
import type { IconKey } from '@guardio/data'
import type { ReactNode } from 'react'
import { ICONS } from './icons'

export function Card({
  className = '',
  borderClassName = 'border-border',
  children,
}: {
  className?: string
  /** Border colour token class, e.g. `border-info`. */
  borderClassName?: string
  children: ReactNode
}) {
  return (
    <div className={`rounded-lg border ${borderClassName} bg-background ${className}`}>{children}</div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-title-xl font-semibold text-text-strong">{children}</h2>
}

/** Small grey pill with a number, next to a card title. */
export function CountBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-2xl bg-accent px-2 py-1 text-label-sm font-medium text-text-primary">
      {children}
    </span>
  )
}

/** Blue pill, e.g. "2 open issues". */
export function InfoBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-2xl bg-info-subtle px-2 py-1 text-label-sm font-medium whitespace-nowrap text-info-strong">
      {children}
    </span>
  )
}

/** 40×40 tile with an icon (grey) or a brand logo (white, bordered). */
export function IconTile({ icon }: { icon: IconKey }) {
  const { src, brand } = ICONS[icon]
  return (
    <span
      className={`flex size-10 shrink-0 items-center justify-center rounded-sm ${
        brand ? 'border border-border bg-background' : 'bg-accent'
      }`}
    >
      <img src={src} alt="" className={`size-6 ${brand ? 'rounded-[4px] object-cover' : ''}`} />
    </span>
  )
}

/**
 * Blue text action. With `onClick` it renders a button (an action on the page);
 * otherwise a link (`href`, default "#"). `size="md"` for dense rows.
 */
export function TextLink({
  children,
  href = '#',
  onClick,
  size = 'lg',
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  size?: 'lg' | 'md'
}) {
  const className = `${size === 'lg' ? 'text-body-lg' : 'text-body-md'} cursor-pointer text-text-link hover:underline focus-visible:underline focus-visible:outline-none`
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    )
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export function CardHeader({ title, count }: { title: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 p-6">
      <h3 className="text-title-md font-semibold text-text-primary">{title}</h3>
      {count !== undefined && <CountBadge>{count}</CountBadge>}
    </div>
  )
}

/** Round initials avatar. `amber` = the signed-in user, `neutral` = other members, `primary` = an action (e.g. add). */
export function Avatar({
  children,
  size = 'md',
  tone = 'neutral',
}: {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  tone?: 'neutral' | 'amber' | 'primary'
}) {
  const sizes = { sm: 'size-8 text-label-sm', md: 'size-9 text-body-md', lg: 'size-14 text-title-lg font-normal' }
  const tones = {
    neutral: 'bg-accent text-text-primary',
    amber: 'bg-avatar-bg text-avatar-text',
    primary: 'bg-primary text-primary-foreground',
  }
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full font-medium ${sizes[size]} ${tones[tone]}`}>
      {children}
    </span>
  )
}

type BadgeStatus = 'on' | 'off' | 'fixed' | 'checking' | 'later'

const BADGE: Record<BadgeStatus, { label: string; pill: string; dot: string }> = {
  on: { label: 'ON', pill: 'bg-success-subtle text-success-subtle-foreground', dot: 'bg-success' },
  off: { label: 'OFF', pill: 'bg-accent text-text-secondary', dot: 'bg-text-secondary' },
  fixed: { label: 'Fixed', pill: 'bg-success-subtle text-success-subtle-foreground', dot: 'bg-success' },
  checking: { label: 'Checking', pill: 'bg-info-subtle text-info-strong', dot: 'bg-info animate-pulse motion-reduce:animate-none' },
  later: { label: 'Later', pill: 'bg-accent text-text-secondary', dot: 'bg-warning' },
}

/**
 * Pill with a status dot. `on` keeps the original ON/OFF use (Settings);
 * `status` adds the To-dos states (Fixed / Checking / Later).
 */
export function StatusBadge({ on, status }: { on?: boolean; status?: BadgeStatus }) {
  const s = BADGE[status ?? (on ? 'on' : 'off')]
  return (
    <span className={`flex w-fit items-center gap-1 rounded-full px-3 py-2 text-label-sm font-medium whitespace-nowrap ${s.pill}`}>
      <span className={`size-2 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

/** Underline tabs (Figma "✔️ TabList", Line style) for switching sections inside a page. */
export function Tabs<T extends string>({
  tabs,
  value,
  hrefFor,
  label,
}: {
  tabs: { id: T; label: string }[]
  value: T
  hrefFor: (id: T) => string
  label: string
}) {
  return (
    <nav className="flex border-b-2 border-border" aria-label={label}>
      {tabs.map((t) => (
        <a
          key={t.id}
          href={hrefFor(t.id)}
          aria-current={t.id === value ? 'page' : undefined}
          className={`-mb-0.5 border-b-2 p-4 text-body-lg whitespace-nowrap text-text-primary ${
            t.id === value ? 'border-border-selected font-semibold' : 'border-transparent hover:border-border-selected/30'
          }`}
        >
          {t.label}
        </a>
      ))}
    </nav>
  )
}
