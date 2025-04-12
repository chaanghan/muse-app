import { colors } from '@/constants/colors';
import { NewReleaseAlbumData } from '@/types/types';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Album({
  id,
  name,
  images,
  artists,
  release_date,
}: NewReleaseAlbumData) {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: '/home/album/[id]',
          params: {
            id,
            name,
            images: JSON.stringify(images),
            artists: JSON.stringify(artists),
            release_date,
          },
        })
      }
    >
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
    fontWeight: '600',
  },
  artistName: {
    color: colors.GRAY,
    fontSize: 12,
    fontWeight: '600',
  },
});
