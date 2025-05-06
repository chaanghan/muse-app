import { colors } from '@/constants/colors';
import { PlaylistData } from '@/types/types';
import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Playlist({
  id,
  description,
  images,
  name,
  tracks,
  owner,
}: PlaylistData) {
  const [color, setColor] = useState(null);

  useEffect(() => {
    const url = images[0].url;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.owner}>{owner.display_name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: images[0].url }} style={styles.image} />
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 24,
    backgroundColor: colors.GRAY_200,
    padding: 12,
    margin: 12,
    borderRadius: 10,
    justifyContent: 'space-between',
    gap: 5,
  },
  header: {},
  name: {
    fontSize: 20,
    fontWeight: 600,
  },
  owner: {
    color: colors.GRAY_800,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  description: {},
});
