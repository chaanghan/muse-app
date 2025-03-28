import { colors } from '@/constants/colors';
import { NewReleaseAlbumData } from '@/types/types';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Album({ name, images, artists }: NewReleaseAlbumData) {
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: images[2].url }} style={styles.albumImage} />
      <View>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.albumName}>
          {name}
        </Text>
        <Text style={styles.artistName}>{artists[0].name}</Text>
      </View>
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
    borderRadius: 5,
  },
  albumName: {
    width: 140,
    fontSize: 16,
  },
  artistName: {
    color: colors.GRAY,
    fontSize: 12,
  },
});
