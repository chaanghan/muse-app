import getAccessToken from '@/api/getAccessToken';
import getSearch from '@/api/getSearch';
import getSearchAlbum from '@/api/getSearchAlbum';
import Album from '@/components/Album';
import Loading from '@/components/Loading';
import Track from '@/components/Track';
import { colors } from '@/constants/colors';
import { useTokenStore } from '@/store/authStore';
import { AccessToken, AlbumData, TrackData } from '@/types/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ArtistDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [albumInfo, setAlbumInfo] = useState<AlbumData[] | []>([]);
  const [trackInfo, setTrackInfo] = useState<TrackData[] | []>([]);
  const [isClicked, setIsClicked] = useState(false);
  const token = useTokenStore((state) => state.token);
  const { id: artistId, name, images, followers } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const imageData = typeof images === 'string' ? JSON.parse(images) : images;

  console.log(trackInfo);

  useEffect(() => {
    const loadData = async () => {
      const accessToken: AccessToken = await getAccessToken();
      setIsLoading(true);
      if (accessToken) {
        try {
          const [albumData, trackData] = await Promise.all([
            getSearchAlbum(accessToken, name as string),
            getSearch(accessToken, name as string),
          ]);
          setAlbumInfo(albumData);
          setTrackInfo(trackData);
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
  console.log(trackInfo);

  return (
    <View style={[styles.container]}>
      <View style={styles.artistImageContainer}>
        <Image source={{ uri: imageData[0].url }} style={styles.artistImage} />
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.WHITE} />
        </Pressable>
      </View>
      <ScrollView
        style={styles.infoContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoHeader}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.followersText}>
            팔로워 {Number(followers).toLocaleString()}명
          </Text>
        </View>
        <View style={styles.infoMusic}>
          <Text style={styles.title}>Music</Text>
          <View style={styles.trackContents}>
            {trackInfo.slice(0, 4).map((track) => (
              <Track key={track.id} {...track} />
            ))}
          </View>
          <View style={styles.musicButtonContainer}>
            <Pressable style={styles.musicButton}>
              <Text style={styles.musicButtonText}>See All</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.infoArtistAlbums}>
          <Text style={styles.title}>{name}'s Albums</Text>
          <FlatList
            style={styles.albumContents}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={albumInfo}
            renderItem={({ item }) => <Album key={item.id} {...item} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artistImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    backgroundColor: colors.GRAY_700,
    borderRadius: 50,
    padding: 5,
    opacity: 0.5,
  },
  artistImage: {
    width: '100%',
    height: 400,
  },
  infoContainer: {
    marginHorizontal: 12,
  },
  infoHeader: {
    paddingTop: 10,
    paddingBottom: 12,
  },
  infoMusic: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    paddingBottom: 5,
  },
  trackContents: {},
  musicButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  musicButton: {
    borderColor: colors.GRAY_300,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  musicButtonText: {
    fontWeight: '600',
  },
  infoArtistAlbums: {
    paddingBottom: 12,
  },
  albumContents: {},
  nameText: {
    fontSize: 32,
    fontWeight: '700',
  },
  followersText: {
    color: colors.GRAY_800,
  },
});
