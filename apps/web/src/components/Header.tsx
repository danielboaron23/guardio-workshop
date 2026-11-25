import chevronDown from '@guardio/assets/home/d-chevron-down-sm.svg'
import help from '@guardio/assets/home/d-circle-help.svg'
import logo from '@guardio/assets/home/logo.svg'
import { account } from '@guardio/data'

import { href } from '../router'
import { Avatar } from './ui'

type NavId = 'home' | 'todos' | 'assets' | 'activity'

// My Assets and Activity have no page yet, so they still lead Home.
const NAV: { id: NavId; label: string; href: string; menu?: boolean }[] = [
  { id: 'home', label: 'Home', href: href.home },
  { id: 'todos', label: 'To do', href: href.todos() },
  { id: 'assets', label: 'My Assets', href: href.home, menu: true },
  { id: 'activity', label: 'Activity', href: href.home },
]

/** `minimal` is the Settings header from Figma: logo only. `active` marks the current page. */
export function Header({ minimal = false, active = 'home' }: { minimal?: boolean; active?: NavId }) {
  return (
    <header className={`flex ${minimal ? "h-[72px]" : "h-[81px]"} items-center justify-between border-b border-accent bg-background px-8`}>
      <div className="flex items-center gap-10">
        <a href={href.home} aria-label="Guardio home">
          <img src={logo} alt="Guardio" />
        </a>
        {!minimal && (
          <nav className="flex items-center gap-3">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.id === active ? 'page' : undefined}
                className={`flex items-center gap-1 rounded-sm px-4 py-2 text-body-lg text-text-primary ${
                  item.id === active ? 'bg-accent font-medium' : 'hover:bg-surface'
                }`}
              >
                {item.label}
                {item.menu && <img src={chevronDown} alt="" />}
              </a>
            ))}
          </nav>
        )}
      </div>
      {!minimal && (
        <div className="flex items-center gap-5">
          <span className="rounded-lg bg-issue-bg px-2.5 py-0.5 text-body-md font-medium text-issue-text">
            Beta
          </span>
          <button type="button" aria-label="Help" className="cursor-pointer">
            <img src={help} alt="" />
          </button>
          {/* Not in Figma: the design has no entry point to Settings on desktop. */}
          <a
            href={href.settings()}
            aria-label="Account settings"
            title="Account settings"
            className="rounded-full hover:opacity-80"
          >
            <Avatar tone="amber">
              {account.firstName[0]}
              {account.lastName[0]}
            </Avatar>
          </a>
        </div>
      )}
    </header>
  )
}
