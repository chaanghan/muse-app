import { ArtistData } from '@/types/types';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

export default function Artist({ name, images, followers, id }: ArtistData) {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: '/home/artist/[id]',
          params: {
            name,
            images: JSON.stringify(images),
            followers: followers.total,
            id,
          },
        })
      }
    >
      <Image source={{ uri: images[2].url }} style={styles.artistImage} />
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.artistName}>
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
  artistImage: {
    width: 140,
    height: 140,
    borderRadius: 140,
  },
  albumName: {
    width: 140,
    fontSize: 16,
  },
  artistName: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
