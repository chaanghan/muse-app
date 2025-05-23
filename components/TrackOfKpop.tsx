import { colors } from '@/constants/colors';
import { TrackData } from '@/types/types';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function TrackOfKpop({ album, artists, id, name }: TrackData) {
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: album?.images[2].url }} style={styles.albumImage} />
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
    marginBottom: 12,
  },
  albumImage: {
    width: 170,
    height: 170,
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
