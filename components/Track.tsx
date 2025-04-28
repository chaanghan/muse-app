import { colors } from '@/constants/colors';
import { AlbumData, TrackData } from '@/types/types';
import { router } from 'expo-router';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Track({
  id,
  name,
  artists,
  album,
  duration_ms,
}: TrackData) {
  const { images } = album;

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: '/home/track/[id]',
          params: {
            id,
            name,
            artists: JSON.stringify(artists),
            album: JSON.stringify(album),
            duration_ms,
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
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  albumImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  albumName: {
    width: Dimensions.get('window').width / 0.8,
    fontSize: 16,
    fontWeight: '600',
  },
  artistName: {
    color: colors.GRAY,
    fontSize: 12,
    fontWeight: '600',
  },
});
