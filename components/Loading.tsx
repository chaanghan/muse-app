import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loadingText}>로딩 중...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
