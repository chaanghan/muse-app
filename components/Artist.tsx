import { Album } from '@/types/types';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Artist({
  id,
  name,
  images,
  artists,
  release_date,
}: Album) {
  return (
    <Pressable style={styles.container}>
      <Image source={images[0]} style={styles.albumImage} />
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.albumName}>
        {name}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginHorizontal: 12,
  },
  albumImage: {
    width: 140,
    height: 140,
    borderRadius: 140,
  },
  albumName: {
    width: 140,
    textAlign: 'center',
  },
});
