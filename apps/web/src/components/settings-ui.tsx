// Building blocks of the desktop Settings pages (Figma "✔️ Collapsible Card", "✔️ TabList").
import chevronDown from '@guardio/assets/settings/chevron-down.svg'
import type { Toggle } from '@guardio/data'
import { useState, type ReactNode } from 'react'

export function CollapsibleCard({
  label,
  title,
  titleSize = 'lg',
  summary,
  children,
  defaultOpen = false,
}: {
  label?: string
  title?: string
  titleSize?: 'lg' | 'xl'
  summary: ReactNode
  children?: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="rounded-md border border-border bg-background">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => children && setOpen(!open)}
        className={`flex w-full items-center gap-8 p-8 text-left ${children ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col gap-1.5">
            {label && <span className="text-body-md font-medium text-text-secondary">{label}</span>}
            {title && (
              <span className={`font-semibold text-text-primary ${titleSize === 'xl' ? 'text-title-xl' : 'text-title-lg'}`}>
                {title}
              </span>
            )}
          </div>
          <div className="flex h-6 items-center gap-4 text-body-lg text-text-primary">{summary}</div>
        </div>
        <img src={chevronDown} alt="" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && children && (
        <div className="px-8 pb-8">
          <div className="border-t border-border pt-6">{children}</div>
        </div>
      )}
    </section>
  )
}

export function IconText({ icon, children, className = '' }: { icon: string; children: ReactNode; className?: string }) {
  return (
    <span className={`flex min-w-0 items-center gap-2 ${className}`}>
      <img src={icon} alt="" className="shrink-0" />
      <span className="truncate">{children}</span>
    </span>
  )
}

export const Divider = () => <span className="h-full w-px shrink-0 bg-border" />

export function Switch({ on, onChange, label }: { on: boolean; onChange: (on: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors ${
        on ? 'justify-end bg-info' : 'justify-start bg-switch-off'
      }`}
    >
      <span className="size-4 rounded-full bg-background shadow-sm" />
    </button>
  )
}

/** Groups of bordered rows with a title, a description and a switch. */
export function ToggleGroups({ groups }: { groups: { group: string; items: Toggle[] }[] }) {
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.flatMap((g) => g.items.map((i) => [i.id, i.on]))),
  )
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.group} className="flex flex-col gap-2">
          <h3 className="text-body-md text-text-secondary">{group.group}</h3>
          <div className="flex flex-col gap-3">
            {group.items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-8 rounded-md border border-border p-5">
                <div className="flex max-w-[520px] flex-col gap-2">
                  <p className="text-body-lg text-text-primary">{item.title}</p>
                  <p className="text-body-md text-text-secondary">
                    {item.body}{' '}
                    {item.learnMore && (
                      <a href="#" className="text-text-primary underline" onClick={(e) => e.preventDefault()}>
                        Learn more
                      </a>
                    )}
                  </p>
                </div>
                <Switch on={state[item.id]} label={item.title} onChange={(on) => setState({ ...state, [item.id]: on })} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Field({
  label,
  required,
  hint,
  ...input
}: { label: string; required?: boolean; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-body-md font-medium text-text-primary">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      <input
        {...input}
        className="h-10 rounded-sm border border-border bg-background px-3 text-body-md text-text-primary outline-none focus:border-border-selected disabled:bg-accent disabled:text-text-secondary"
      />
      {hint && <span className="text-body-sm text-text-secondary">{hint}</span>}
    </label>
  )
}

export function Button({
  variant = 'primary',
  children,
  ...props
}: { variant?: 'primary' | 'outline' | 'destructive' } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    outline: 'border border-border bg-background text-text-primary hover:bg-surface',
    destructive: 'border border-destructive bg-background text-destructive hover:bg-surface',
  }[variant]
  return (
    <button
      type="button"
      {...props}
      className={`h-11 cursor-pointer rounded-sm px-5 text-body-lg font-medium disabled:cursor-not-allowed disabled:opacity-50 ${styles}`}
    >
      {children}
    </button>
  )
}
