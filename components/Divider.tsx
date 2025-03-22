import { StyleSheet, View } from 'react-native';

export default function Divider() {
  return <View style={styles.divider}></View>;
}
const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
  },
});
