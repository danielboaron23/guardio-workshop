// Desktop Settings — Figma sections "Settings / Profile", "/ Subscription", "/ Protection".
import arrowRight from '@guardio/assets/home/m-arrow-right-link.svg'
import calling from '@guardio/assets/home/m-calling.svg'
import internet from '@guardio/assets/home/m-internet.svg'
import mailIcon from '@guardio/assets/home/m-mail.svg'
import message from '@guardio/assets/home/m-message.svg'
import plus from '@guardio/assets/home/m-plus.svg'
import call from '@guardio/assets/settings/call.svg'
import cashback from '@guardio/assets/settings/cashback.svg'
import checkCircle from '@guardio/assets/settings/check-circle.svg'
import dollarCircle from '@guardio/assets/settings/dollar-circle.svg'
import mail from '@guardio/assets/settings/mail.svg'
import receiptDollar from '@guardio/assets/settings/receipt-dollar.svg'
import visa from '@guardio/assets/settings/visa.svg'
import {
  account,
  emailPreferences,
  protectionSettings,
  SETTINGS_TABS,
  subscription,
  type SettingsTabId,
} from '@guardio/data'
import { useState } from 'react'

import { Button, CollapsibleCard, Divider, Field, IconText, ToggleGroups } from '../components/settings-ui'
import { Avatar, StatusBadge, Tabs } from '../components/ui'
import { href } from '../router'

export function Settings({ tab }: { tab: SettingsTabId }) {
  return (
    <main className="mx-auto flex w-[1024px] max-w-full flex-col gap-6 px-16 pt-4 pb-16">
      <Tabs tabs={SETTINGS_TABS} value={tab} hrefFor={href.settings} label="Settings sections" />
      <div className="flex flex-col gap-5">
        {tab === 'profile' && <Profile />}
        {tab === 'subscription' && <Subscription />}
        {tab === 'protection' && <Protection />}
        {(tab === 'family' || tab === 'help') && (
          <p className="py-10 text-center text-body-lg text-text-secondary">Not designed yet.</p>
        )}
      </div>
    </main>
  )
}

function Profile() {
  return (
    <>
      <CollapsibleCard
        label="Your account"
        title={`${account.firstName} ${account.lastName}`}
        summary={
          <>
            <IconText icon={mail} className="max-w-[200px]">{account.email}</IconText>
            <Divider />
            <IconText icon={call}>{account.phone}</IconText>
          </>
        }
      >
        <AccountForm />
      </CollapsibleCard>

      <CollapsibleCard
        title="Password"
        summary={<span className="text-text-secondary">Reset or update your login password</span>}
      >
        <form className="flex max-w-[400px] flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <Field label="Current password" type="password" defaultValue="password" autoComplete="current-password" />
          <Field label="Choose new password" type="password" hint="Minimum 6 characters" autoComplete="new-password" />
          <div className="flex gap-3">
            <Button>Save</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </form>
      </CollapsibleCard>

      <CollapsibleCard
        title="Emails from Guardio"
        summary={<span className="text-text-secondary">Personalize how we communicate with you via email</span>}
      >
        <ToggleGroups groups={emailPreferences} />
      </CollapsibleCard>

      <CollapsibleCard
        title="Log out"
        summary={
          <span className="text-text-secondary">
            Logged in on a shared device or browser that isn&apos;t yours? Log out easily from here.
          </span>
        }
      >
        <div className="flex max-w-[520px] flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-title-md font-semibold text-text-primary">Before you go</p>
            <p className="text-body-md text-text-secondary">
              Keep in mind that once you sign out from your guardio account, your protection will be disabled on this
              browser.
            </p>
          </div>
          <div>
            <Button variant="destructive">Logout</Button>
          </div>
        </div>
      </CollapsibleCard>
    </>
  )
}

function AccountForm() {
  const [first, setFirst] = useState(account.firstName)
  const [last, setLast] = useState(account.lastName)
  const dirty = first !== account.firstName || last !== account.lastName
  return (
    <form className="flex max-w-[400px] flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <Field label="Email" type="email" defaultValue={account.email} disabled />
      <Field label="Phone Number" type="tel" defaultValue={`${account.phonePrefix} ${account.phone}`} />
      <Field label="First name" required value={first} onChange={(e) => setFirst(e.target.value)} />
      <Field label="Last name" required value={last} onChange={(e) => setLast(e.target.value)} />
      <div className="flex gap-3">
        <Button disabled={!dirty}>Save</Button>
        <Button
          variant="outline"
          onClick={() => {
            setFirst(account.firstName)
            setLast(account.lastName)
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

const PROTECTION_ICON = { browsing: internet, email: mailIcon, sms: message, call: calling }

function Subscription() {
  const s = subscription
  return (
    <>
      <CollapsibleCard
        label="Your plan"
        title={s.plan}
        titleSize="xl"
        summary={
          <IconText icon={checkCircle} className="font-medium text-success-subtle-foreground">
            {s.status}
          </IconText>
        }
      >
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-5 pr-14">
            <div>
              <p className="text-title-lg font-semibold text-text-primary">{s.membersTitle}</p>
              <p className="text-body-lg text-text-primary">{s.membersBody}</p>
            </div>
            <ul className="flex flex-col gap-5">
              {s.members.map((m) => (
                <li key={m.id} className="flex items-center gap-3 text-body-lg text-text-primary">
                  <Avatar size="sm">{m.initials}</Avatar>
                  {m.name}
                </li>
              ))}
              <li className="flex items-center gap-3 text-body-lg text-text-primary">
                <Avatar size="sm" tone="primary">
                  <img src={plus} alt="" />
                </Avatar>
                Add member
              </li>
            </ul>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 text-body-lg font-medium text-text-link">
              Manage members <img src={arrowRight} alt="" />
            </a>
          </div>
          <div className="flex flex-col gap-5 border-l border-border pl-14">
            <div>
              <p className="text-title-lg font-semibold text-text-primary">{s.protectionsTitle}</p>
              <p className="text-body-lg text-text-primary">{s.protectionsBody}</p>
            </div>
            <ul className="flex flex-col gap-4">
              {s.protections.map((p) => (
                <li key={p.id} className="flex items-center gap-3 text-body-lg text-text-primary">
                  <img src={PROTECTION_ICON[p.id]} alt="" />
                  <span className="flex-1">{p.label}</span>
                  <StatusBadge on={p.on} />
                </li>
              ))}
            </ul>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 text-body-lg font-medium text-text-link">
              Set up now <img src={arrowRight} alt="" />
            </a>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-6">
          <Button variant="outline">Cancel subscription</Button>
          <Button>Manage plan</Button>
        </div>
      </CollapsibleCard>

      <CollapsibleCard
        label="Next billing"
        title={s.nextBilling}
        titleSize="xl"
        summary={<IconText icon={dollarCircle}>{s.billingCycle}</IconText>}
      />
      <CollapsibleCard
        label="Payment methods"
        summary={<IconText icon={visa}>{s.paymentMethod}</IconText>}
      />
      <CollapsibleCard
        label="Invoices"
        summary={
          <>
            <IconText icon={receiptDollar}>{s.invoices}</IconText>
            <Divider />
            <IconText icon={cashback}>{s.invoicesLink}</IconText>
          </>
        }
      />
    </>
  )
}

function Protection() {
  return (
    <CollapsibleCard
      title="Protection settings"
      summary={<span className="text-text-secondary">Personalize how Guardio protects you</span>}
    >
      <ToggleGroups groups={protectionSettings} />
    </CollapsibleCard>
  )
}
