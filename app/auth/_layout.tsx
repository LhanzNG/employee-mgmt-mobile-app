import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: styles.container,
        animation: 'fade',
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});