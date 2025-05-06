import getAccessToken from '@/api/getAccessToken';
import getPlaylist from '@/api/getPlaylist';
import Loading from '@/components/Loading';
import Playlist from '@/components/Playlist';
import { colors } from '@/constants/colors';
import { useTokenStore } from '@/store/authStore';
import { AccessToken, AlbumData, PlaylistData } from '@/types/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function TrackDetail() {
  const { id, name, artists, album } = useLocalSearchParams();
  const artistData =
    typeof artists === 'string' ? JSON.parse(artists) : artists;
  const albumData: AlbumData =
    typeof album === 'string' ? JSON.parse(album) : album;
  const { images, release_date } = albumData;
  const token = useTokenStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistData[] | []>([]);

  useEffect(() => {
    const loadData = async () => {
      const accessToken: AccessToken = await getAccessToken();
      setIsLoading(true);
      if (accessToken) {
        try {
          const data = await getPlaylist(accessToken, artistData[0].name);
          setPlaylists(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (!token || isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color={colors.GRAY_800} />
      </Pressable>
      <View style={styles.albumImageContainer}>
        <Image source={{ uri: images[0].url }} style={styles.albumImage} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.title}>
          <Text style={styles.trackName}>{name}</Text>
          <Text style={styles.releaseDateYear}>
            ({release_date.slice(0, 4)})
          </Text>
        </View>
        <Text style={styles.artistName}>{artistData[0].name}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {playlists.map((playlist) => (
          <Playlist key={playlist.id} {...playlist} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  backButton: {
    paddingLeft: 10,
  },
  albumImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumImage: {
    width: 250,
    height: 250,
  },
  infoContainer: {
    paddingTop: 15,
    paddingHorizontal: 12,
    gap: 7,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  trackName: {
    fontSize: 28,
    fontWeight: '700',
  },
  releaseDateYear: {
    // fontSize: 28,
    fontWeight: '700',
  },
  artistName: {
    fontWeight: '600',
    color: colors.GRAY_800,
  },
});
