// Settings / Profile on mobile — Figma frames "New" (collapsed and expanded).
import { account, emailPreferences } from '@guardio/data';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View, type TextInputProps } from 'react-native';

import { Icon } from '@/components/icon';
import { font, textStyle, theme } from '@/constants/theme';

import { CollapsibleCard, FieldLabel, SummaryText } from './collapsible-card';

export function Profile() {
  return (
    <>
      <CollapsibleCard
        label="Your account"
        title={`${account.firstName} ${account.lastName}`}
        openLabel="Edit account details"
        closeLabel="Hide account details"
        summary={
          <>
            <View style={styles.iconRow}>
              <Icon name="settingsMail" size={16} />
              <Text style={[textStyle('body-lg'), styles.flex]} numberOfLines={1}>
                {account.email}
              </Text>
            </View>
            <View style={styles.iconRow}>
              <Icon name="settingsCall" size={16} />
              <Text style={textStyle('body-lg')}>{account.phone}</Text>
            </View>
          </>
        }>
        <AccountForm />
      </CollapsibleCard>

      <CollapsibleCard
        title="Password"
        openLabel="Change password"
        closeLabel="Hide password details"
        summary={<SummaryText>Reset or update your login password</SummaryText>}>
        <Field label="Current password" secureTextEntry defaultValue="password" />
        <Field label="Choose new password" secureTextEntry hint="Minimum 6 characters" />
        <View style={styles.buttons}>
          <Button label="Save" />
          <Button label="Cancel" variant="outline" />
        </View>
      </CollapsibleCard>

      <CollapsibleCard
        title="Emails from Guardio"
        openLabel="Choose your emails"
        closeLabel="Hide emails details"
        summary={<SummaryText>Personalize how we communicate with you via email</SummaryText>}>
        <EmailPreferences />
      </CollapsibleCard>

      <CollapsibleCard
        title="Log out"
        summary={
          <SummaryText>Logged in on a shared device or browser that isn’t yours? Log out easily from here.</SummaryText>
        }>
        <View style={{ gap: theme.spacing[2] }}>
          <Text style={textStyle('title-md')}>Before you go</Text>
          <Text style={textStyle('body-md', 'textSecondary')}>
            Keep in mind that once you sign out from your guardio account, your protection will be disabled on this
            browser.
          </Text>
        </View>
        <Button label="Logout" variant="destructive" />
      </CollapsibleCard>
    </>
  );
}

function AccountForm() {
  const [first, setFirst] = useState(account.firstName);
  const [last, setLast] = useState(account.lastName);
  const dirty = first !== account.firstName || last !== account.lastName;
  return (
    <>
      <Field label="Email" defaultValue={account.email} editable={false} />
      <Field label="Phone Number" defaultValue={`${account.phonePrefix}  ${account.phone}`} keyboardType="phone-pad" />
      <Field label="First name" required value={first} onChangeText={setFirst} />
      <Field label="Last name" required value={last} onChangeText={setLast} />
      <View style={styles.buttons}>
        <Button label="Save" disabled={!dirty} />
        <Button
          label="Cancel"
          variant="outline"
          onPress={() => {
            setFirst(account.firstName);
            setLast(account.lastName);
          }}
        />
      </View>
    </>
  );
}

function EmailPreferences() {
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(emailPreferences.flatMap((g) => g.items.map((i) => [i.id, i.on]))),
  );
  return (
    <>
      {emailPreferences.map((group) => (
        <View key={group.group} style={{ gap: theme.spacing[2] }}>
          <Text style={textStyle('body-md', 'textSecondary')}>{group.group}</Text>
          {group.items.map((item) => (
            <View key={item.id} style={styles.toggleRow}>
              <View style={[styles.flex, { gap: theme.spacing[1] }]}>
                <Text style={textStyle('body-lg')}>{item.title}</Text>
                <Text style={textStyle('body-md', 'textSecondary')}>{item.body}</Text>
              </View>
              <Switch
                value={state[item.id]}
                onValueChange={(on) => setState({ ...state, [item.id]: on })}
                trackColor={{ true: theme.color.info, false: theme.color.switchOff }}
                accessibilityLabel={item.title}
              />
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

function Field({
  label,
  required,
  hint,
  editable = true,
  ...input
}: { label: string; required?: boolean; hint?: string } & TextInputProps) {
  return (
    <View style={{ gap: theme.spacing[1.5] }}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <TextInput
        {...input}
        editable={editable}
        style={[styles.input, font(400), !editable && styles.inputDisabled]}
        placeholderTextColor={theme.color.textSecondary}
      />
      {hint && <Text style={textStyle('body-sm', 'textSecondary')}>{hint}</Text>}
    </View>
  );
}

function Button({
  label,
  variant = 'primary',
  disabled,
  onPress,
}: {
  label: string;
  variant?: 'primary' | 'outline' | 'destructive';
  disabled?: boolean;
  onPress?: () => void;
}) {
  const primary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        primary ? styles.buttonPrimary : styles.buttonOutline,
        variant === 'destructive' && { borderColor: theme.color.destructive },
        (disabled || pressed) && { opacity: 0.5 },
      ]}>
      <Text
        style={[
          textStyle('body-lg-medium', primary ? 'primaryForeground' : variant === 'destructive' ? 'destructive' : 'textPrimary'),
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing[2] },
  buttons: { gap: theme.spacing[2] },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[3],
    padding: theme.spacing[4],
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.color.border,
  },
  input: {
    height: 44,
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.color.border,
    backgroundColor: theme.color.background,
    fontSize: theme.text['body-lg'].size,
    color: theme.color.textPrimary,
  },
  inputDisabled: { backgroundColor: theme.color.accent, color: theme.color.textSecondary },
  button: { height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radius.sm },
  buttonPrimary: { backgroundColor: theme.color.primary },
  buttonOutline: { borderWidth: 1, borderColor: theme.color.border, backgroundColor: theme.color.background },
});
