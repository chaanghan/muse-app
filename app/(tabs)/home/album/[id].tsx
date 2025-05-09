import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import getArtist from '@/api/getArtist';
import { AccessToken, ArtistData, TrackOfAlbum } from '@/types/types';
import Loading from '@/components/Loading';
import getAlbumTracks from '@/api/getAlbumTracks';
import { colors } from '@/constants/colors';
import { useTokenStore } from '@/store/authStore';
import getAccessToken from '@/api/getAccessToken';

export default function AlbumDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [artistInfo, setArtistInfo] = useState<ArtistData | null>(null);
  const [tracksOfAlbum, setTracksOfAlbum] = useState<TrackOfAlbum[] | []>([]);
  const token = useTokenStore((state) => state.token);
  const {
    id: albumId,
    name: albumName,
    images,
    artists,
    release_date,
  } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const artistsData =
    typeof artists === 'string' ? JSON.parse(artists) : artists;
  const imagesData = typeof images === 'string' ? JSON.parse(images) : images;

  const { id: artistId, name: artistName } = artistsData[0];

  console.log(isClick);

  useEffect(() => {
    const loadData = async () => {
      const accessToken: AccessToken = await getAccessToken();
      setIsLoading(true);
      if (accessToken) {
        try {
          const [artistData, trackData] = await Promise.all([
            getArtist(accessToken, artistId),
            getAlbumTracks(accessToken, albumId as string),
          ]);
          setArtistInfo(artistData);
          setTracksOfAlbum(trackData);
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
  console.log('artistInfo', artistInfo);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.GRAY_800} />
        </Pressable>
        <View style={styles.albumImageContainer}>
          <Image
            source={{ uri: imagesData[0].url }}
            style={styles.albumImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.albumName}>{albumName}</Text>
          <View style={styles.artistContainer}>
            <Image
              source={{ uri: artistInfo?.images[0].url }}
              style={styles.artistImage}
            />
            <Text style={styles.artistName}>{artistName}</Text>
          </View>
          <Text style={styles.releaseDateYear}>{release_date.slice(0, 4)}</Text>
        </View>
        <View style={styles.tracksContainer}>
          <Text style={styles.tracksTitle}>Songs</Text>
          <View style={styles.tracks}>
            {isClick
              ? tracksOfAlbum
                  .map((track) => track.name)
                  .map((track, idx) => (
                    <Text style={styles.trackText} numberOfLines={1} key={idx}>
                      {track}
                    </Text>
                  ))
              : tracksOfAlbum
                  .slice(0, 4)
                  .map((track) => track.name)
                  .map((track, idx) => (
                    <Text style={styles.trackText} numberOfLines={1} key={idx}>
                      {track}
                    </Text>
                  ))}
          </View>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => setIsClick(!isClick)}
          >
            <Text style={styles.buttonText}>
              {isClick ? '간략히 보기' : '더 보기'}
            </Text>
          </Pressable>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.releaseDate}>{`${release_date.slice(
            0,
            4
          )}년 ${release_date.slice(5, 7)}월 ${release_date.slice(
            8,
            10
          )}일`}</Text>
          <View style={[styles.artistContainer, styles.profile]}>
            <Image
              source={{ uri: artistInfo?.images[0].url }}
              style={[styles.artistImage, styles.profileImage]}
            />
            <Text style={[styles.artistName, styles.profileName]}>
              {artistName}
            </Text>
          </View>
        </View>
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
    gap: 10,
  },
  albumName: {
    fontSize: 28,
    fontWeight: '600',
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  artistImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  artistName: {
    fontWeight: '600',
  },
  releaseDateYear: {
    color: colors.GRAY_800,
  },
  tracksContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  tracksTitle: {
    fontWeight: '600',
  },
  tracks: {
    paddingTop: 5,
  },
  trackText: {
    color: colors.GRAY_800,
    paddingVertical: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
  },
  profileContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  releaseDate: {
    paddingBottom: 5,
    fontWeight: '600',
  },
  profile: {
    paddingTop: 5,
    gap: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '500',
  },
});
