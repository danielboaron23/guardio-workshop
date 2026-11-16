import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { textStyle, theme } from '@/constants/theme';

// Stand-in for screens that are not built yet.
export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.body}>
        <Text style={textStyle('headline-sm')}>{title}</Text>
        <Text style={textStyle('body-md', 'textSecondary')}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.canvas },
  body: { padding: theme.spacing[4], gap: theme.spacing[1] },
});
