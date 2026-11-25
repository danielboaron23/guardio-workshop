// Desktop Home — Figma frame "Set-up status: 1/6" (1440 wide).
import alertDot from '@guardio/assets/home/d-alert-dot.svg'
import arrowRight from '@guardio/assets/home/d-arrow-right.svg'
import chevronDown from '@guardio/assets/home/d-chevron-down.svg'
import plansIllustration from '@guardio/assets/home/d-plans-illustration.png'
import progressArc from '@guardio/assets/home/d-progress-arc.svg'
import progressTrack from '@guardio/assets/home/d-progress-track.svg'
import statusActive from '@guardio/assets/home/d-status-active.svg'
import tickerShield from '@guardio/assets/home/d-ticker-shield.svg'
import { desktopHome as data, type AssetGroup } from '@guardio/data'

import { Avatar, Card, CardHeader, IconTile, InfoBadge, SectionTitle, TextLink } from '../components/ui'

export function Home() {
  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-12 px-20 pt-[55px] pb-16">
      <div className="flex flex-col gap-8">
        <ProtectionStatus />
        <div className="flex flex-col gap-10">
          <SetupProgress />
          <section className="flex flex-col gap-6">
            <SectionTitle>Security Overview</SectionTitle>
            <div className="flex w-[1120px] max-w-full gap-6">
              {data.stats.map((stat) => (
                <StatCard key={stat.id} {...stat} />
              ))}
            </div>
            <Todos />
          </section>
        </div>
      </div>

      <section className="flex flex-col gap-6">
        <SectionTitle>Protected assets</SectionTitle>
        <div className="grid grid-cols-3 gap-6">
          {data.assets.map((group) => (
            <AssetGroupCard key={group.id} group={group} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionTitle>Protected people</SectionTitle>
        <div className="flex gap-6">
          <Card className="w-[410px] shrink-0">
            <CardHeader title={data.plan.title} />
            <div className="px-6 py-2.5">
              <div className="flex h-28 items-center gap-4 rounded-lg border border-border p-6">
                <Avatar size="lg" tone="amber">
                  {data.plan.initial}
                </Avatar>
                <span className="text-body-md text-text-primary">{data.plan.member}</span>
              </div>
            </div>
            <div className="p-6">
              <TextLink>Manage</TextLink>
            </div>
          </Card>

          <Card className="flex-1">
            <CardHeader title="Our plans" />
            <div className="flex items-center gap-10 pt-3 pr-8 pb-6 pl-6">
              <img src={plansIllustration} alt="" className="h-[172px] w-[222px] shrink-0" />
              <div className="flex max-w-[500px] flex-col gap-3 text-body-lg text-text-strong">
                <div>
                  <p className="font-semibold">{data.upsell.title}</p>
                  <p>{data.upsell.body}</p>
                </div>
                <button
                  type="button"
                  className="flex h-9 w-fit min-w-20 cursor-pointer items-center gap-2 rounded-sm bg-primary px-4 text-body-md font-medium text-primary-foreground"
                >
                  {data.upsell.cta}
                  <img src={arrowRight} alt="" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}

export function ProtectionStatus() {
  return (
    <div className="flex items-end gap-5">
      <div className="flex flex-1 items-start gap-2">
        <img src={statusActive} alt="" />
        <h1 className="text-headline-md leading-[44px] font-semibold text-text-primary">
          Your Protection is <span className="text-success-bright">Active</span>
        </h1>
      </div>
      <div className="flex w-[390px] items-center justify-center gap-2 rounded-sm border border-border bg-background px-4 py-3">
        <img src={tickerShield} alt="" />
        <span className="truncate text-body-lg leading-none font-medium text-text-strong">
          {data.ticker}
        </span>
      </div>
    </div>
  )
}

export function SetupProgress() {
  const { done, total, title, body } = data.setup
  return (
    <Card className="flex items-center justify-between p-6">
      <div className="flex items-center gap-[19px]">
        <div className="relative size-16 shrink-0">
          <img src={progressTrack} alt="" className="absolute inset-0" />
          <img src={progressArc} alt="" className="absolute top-0 left-[46.61%]" />
          <span className="absolute inset-0 flex items-center justify-center text-title-xl font-normal text-text-strong">
            {done}/{total}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 text-body-lg text-text-strong">
          <p className="font-semibold">{title}</p>
          <p>{body}</p>
        </div>
      </div>
      <button type="button" aria-label="Show setup steps" className="flex size-10 cursor-pointer items-center justify-center rounded-sm hover:bg-accent">
        <img src={chevronDown} alt="" />
      </button>
    </Card>
  )
}

export function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card className="flex flex-1 items-center justify-between p-6" borderClassName="border-info">
      <div className="flex flex-col gap-2">
        <p className="text-title-md font-semibold text-text-strong">{label}</p>
        <p className="text-headline-md font-semibold text-text-strong">{value}</p>
        <p className="text-body-md text-text-secondary">{note}</p>
      </div>
      <div className="flex h-[120px] w-[253px] items-end gap-3 px-8 py-3">
        {data.chart.map((bar) => (
          <div key={bar.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="flex w-full flex-1 items-end px-[3px]">
              <div className="w-full rounded-t-[4px] bg-info" style={{ height: `${bar.value * 100}%` }} />
            </div>
            <span className="text-[10px] leading-none text-text-secondary">{bar.month}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function Todos() {
  return (
    <Card className="pb-2">
      <CardHeader title="To-dos" count={data.todosCount} />
      {data.todos.map((todo, i) => (
        <div key={todo.id} className="flex h-20 flex-col px-6">
          <div
            className={`flex flex-1 items-center gap-6 px-2 ${
              i < data.todos.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="flex w-[300px] items-center gap-5">
              <IconTile icon={todo.icon} />
              <span className="truncate text-body-lg text-text-primary">{todo.asset}</span>
            </div>
            <span className="flex-1 truncate text-body-lg text-text-primary">{todo.issue}</span>
            <span className="w-[110px] text-body-lg text-text-secondary">{todo.date}</span>
            <span className="flex w-[200px] justify-end">
              <TextLink>{todo.action}</TextLink>
            </span>
            <span className="mr-2 flex size-2 shrink-0">
              {todo.urgent && <img src={alertDot} alt="Urgent" />}
            </span>
          </div>
        </div>
      ))}
      <div className="p-6">
        <TextLink>View To-dos</TextLink>
      </div>
    </Card>
  )
}

/** One "Protected assets" card: title, count, three rows and a link. */
export function AssetGroupCard({ group }: { group: AssetGroup }) {
  return (
    <Card>
      <CardHeader title={group.title} count={group.count} />
      {group.rows.map((row, i) => (
        <div key={row.id} className="flex h-20 flex-col px-6">
          <div
            className={`flex flex-1 items-center gap-4 ${
              i < group.rows.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <IconTile icon={row.icon} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-body-lg text-text-primary">{row.label}</p>
              {row.note && <p className="text-body-md text-text-secondary">{row.note}</p>}
            </div>
            {row.badge && <InfoBadge>{row.badge}</InfoBadge>}
          </div>
        </div>
      ))}
      <div className="p-6">
        <TextLink>{group.link}</TextLink>
      </div>
    </Card>
  )
}
