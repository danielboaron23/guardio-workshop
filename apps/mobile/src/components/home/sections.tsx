// The sections below the hero on the mobile Home. Same in every user state — only the data changes.
import { mobileCounts, type Member, type MobileHome, type Protection, type ProtectionId } from '@guardio/data';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Badge, Card, SectionTitle } from '@/components/ui';
import type { AssetKey } from '@/constants/assets';
import { font, textStyle, theme } from '@/constants/theme';

const SCREEN_PADDING = theme.spacing[5];

// ───────── My Protection ─────────

const PROTECTION_ICON: Record<ProtectionId, AssetKey> = {
  browsing: 'internet',
  email: 'mail',
  sms: 'message',
  call: 'calling',
};

export function MyProtection({ protections }: { protections: Protection[] }) {
  return (
    <View style={styles.section}>
      <View style={styles.inset}>
        <SectionTitle>My Protection</SectionTitle>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.protections}>
        {protections.map((p) => (
          <View key={p.id} style={styles.protection}>
            <View style={styles.iconTile}>
              <Icon name={PROTECTION_ICON[p.id]} size={20} />
            </View>
            <View style={{ gap: theme.spacing[1] }}>
              <Text style={textStyle('title-sm')}>{p.title}</Text>
              <View style={styles.status}>
                <View style={[styles.dot, { backgroundColor: p.active ? theme.color.success : theme.color.warning }]} />
                <Text style={[textStyle('body-sm', 'textSecondary'), styles.statusLabel]}>
                  {p.active ? 'Active' : 'Not Active'}
                </Text>
                <Icon name="arrowRightSm" size={16} />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ───────── Threats ─────────

export function Threats({ threats }: { threats: MobileHome['threats'] }) {
  const rows: { icon: AssetKey; size: number; label: string; value: number }[] = [
    { icon: 'mail18', size: 18, label: 'Scam emails caught', value: threats.emails },
    { icon: 'internet18', size: 18, label: 'Risky websites blocked', value: threats.websites },
    { icon: 'squareUnlock', size: 20, label: 'New leaks found', value: threats.leaks },
  ];
  return (
    <Card style={styles.insetCard}>
      <View style={styles.threatsHeader}>
        <Text style={textStyle('body-sm', 'textSecondary')}>Last 7 days</Text>
        <Text style={textStyle('headline-sm')}>{threats.total} threats stopped</Text>
      </View>
      <View style={styles.threatRows}>
        {rows.map((row) => (
          <View key={row.label} style={styles.threatRow}>
            <View style={styles.threatIcon}>
              <Icon name={row.icon} size={row.size} />
            </View>
            <Text style={[textStyle('body-lg'), { flex: 1 }]}>{row.label}</Text>
            <View style={styles.pill}>
              <Text style={textStyle('body-md-medium')}>{row.value}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.cardFooter}>
        <Text style={[textStyle('body-md-medium', 'textLink'), { lineHeight: 14 }]}>See all activities</Text>
        <Icon name="arrowRightLink" size={20} />
      </View>
    </Card>
  );
}

// ───────── Accounts and Devices ─────────

const COUNT_CARDS: { label: string; value: number; chips: { icon: AssetKey; size: number }[] }[] = [
  {
    label: 'Accounts',
    value: mobileCounts.accounts,
    chips: [
      { icon: 'spotify', size: 16 },
      { icon: 'facebook', size: 16 },
      { icon: 'instagram', size: 16 },
      { icon: 'tiktok', size: 16 },
    ],
  },
  {
    label: 'Monitred items',
    value: mobileCounts.monitoredItems,
    chips: [
      { icon: 'smartphoneSm', size: 14.4 },
      { icon: 'mailSm', size: 14.4 },
    ],
  },
  {
    label: 'Connections',
    value: mobileCounts.connections,
    chips: [
      { icon: 'gmail', size: 16 },
      { icon: 'google', size: 14 },
    ],
  },
  { label: 'Devices', value: mobileCounts.devices, chips: [{ icon: 'apple', size: 14.4 }] },
];

export function AccountsAndDevices() {
  return (
    <View style={[styles.section, styles.inset]}>
      <SectionTitle>Accounts and Devices</SectionTitle>
      <View style={styles.grid}>
        {COUNT_CARDS.map((card) => (
          <Card key={card.label} style={styles.countCard}>
            <View>
              <Text style={textStyle('title-xl', 'textStrong')}>{card.value}</Text>
              <Text style={textStyle('body-md')}>{card.label}</Text>
            </View>
            <View style={styles.chips}>
              {card.chips.map((chip, i) => (
                <View key={chip.icon} style={[styles.chip, i > 0 && styles.chipOverlap]}>
                  <Icon name={chip.icon} size={chip.size} style={chip.size === 16 ? styles.logo : undefined} />
                </View>
              ))}
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}

// ───────── Protect more people ─────────

export function ProtectMorePeople({ members }: { members: Member[] }) {
  return (
    <View style={[styles.section, styles.inset]}>
      <View style={{ gap: theme.spacing[1] }}>
        <Text style={[textStyle('title-lg'), { color: theme.color.textStrong }]}>Protect more people</Text>
        <Text style={textStyle('body-md', 'textSecondary')}>
          <Text style={{ color: theme.color.textStrong }}>
            Manage who&apos;s on your <Text style={font(500)}>Family plan.</Text>
          </Text>
          {'\n'}You can invite <Text style={font(500)}>2</Text> more people to your plan free of charge.
        </Text>
      </View>
      <Card>
        {members.map((member, i) => (
          <Fragment key={member.id}>
            {i > 0 && <View style={styles.divider} />}
            <View style={styles.memberRow}>
              {member.avatar ? (
                <Icon
                  name={member.avatar === 'ronnie' ? 'avatarRonnie' : 'avatarDavid'}
                  size={32}
                  style={styles.avatarPhoto}
                />
              ) : (
                <View style={[styles.avatar, { backgroundColor: theme.color.infoSubtle }]}>
                  <Text style={[textStyle('body-md-medium'), { color: theme.color.infoStrong, lineHeight: 14 }]}>
                    {member.initial}
                  </Text>
                </View>
              )}
              <Text style={[textStyle('body-lg'), { flex: 1 }]} numberOfLines={1}>
                {member.name}
              </Text>
              {member.status === 'active' && <Badge label="Active" icon="badgeCheck" />}
              {member.status === 'pending' && (
                <Badge label="Pending" icon={members.some((m) => m.status === 'active') ? 'badgeClock' : undefined} />
              )}
            </View>
          </Fragment>
        ))}
        <View style={styles.divider} />
        <View style={styles.memberRow}>
          <View style={[styles.avatar, { backgroundColor: theme.color.primary }]}>
            <Icon name="plus" size={16} />
          </View>
          <Text style={textStyle('body-lg')}>Add member</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.memberRow}>
          <Text style={[textStyle('body-md-medium', 'textLink'), { lineHeight: 14 }]}>Manage memebers</Text>
        </View>
      </Card>
    </View>
  );
}

// ───────── ID theft coverage ─────────

export function IdTheftCoverage() {
  return (
    <Card style={[styles.insetCard, styles.idTheft]}>
      <Text style={textStyle('title-sm')}>ID theft coverage</Text>
      <Text style={textStyle('body-md')}>24/7 emergency hotline</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  section: { gap: theme.spacing[4] },
  inset: { paddingHorizontal: SCREEN_PADDING },
  insetCard: { marginHorizontal: SCREEN_PADDING },

  protections: { paddingHorizontal: SCREEN_PADDING, gap: theme.spacing[3] },
  protection: {
    width: 150,
    padding: theme.spacing[3],
    gap: theme.spacing[4],
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.color.divider,
    backgroundColor: theme.color.background,
  },
  iconTile: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.accent,
  },
  status: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing[1] },
  statusLabel: { flex: 1, fontSize: 11 },
  dot: { width: 6, height: 6, borderRadius: theme.radius.full },

  threatsHeader: { paddingTop: theme.spacing[5], paddingHorizontal: theme.spacing[4], gap: theme.spacing[1] },
  threatRows: { paddingTop: theme.spacing[5], paddingBottom: theme.spacing[6], gap: theme.spacing[4] },
  threatRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing[2], paddingHorizontal: theme.spacing[4] },
  threatIcon: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  pill: {
    width: 56,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.accent,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[5],
    borderTopWidth: 1,
    borderTopColor: theme.color.border,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing[3] },
  countCard: { flexBasis: '45%', flexGrow: 1, padding: theme.spacing[4], gap: theme.spacing[3] },
  chips: { flexDirection: 'row' },
  chip: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.full,
    borderWidth: 0.77,
    borderColor: theme.color.divider,
    backgroundColor: theme.color.background,
  },
  chipOverlap: { marginLeft: -theme.spacing[2] },
  logo: { borderRadius: 4 },

  divider: { height: 1, backgroundColor: theme.color.divider },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[5],
  },
  avatar: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.full,
  },
  avatarPhoto: { borderRadius: theme.radius.full },
  idTheft: { padding: theme.spacing[4], borderRadius: theme.radius.md },
});
