import getAceessToken from '@/api/getAccessToken';
import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NewReleaseAlbum, AlbumData, ArtistData } from '@/types/types';
import getNewReleasedAlbums from '@/api/getNewReleasedAlbums';
import getPopularArtists from '@/api/getPopularArtists';
import Album from '@/components/Album';
import Artist from '@/components/Artist';
import Divider from '@/components/Divider';
import getNewAddedAlbums from '@/api/getNewAddedAlbums';
import Loading from '@/components/Loading';

export default function HomeScreen() {
  const [accessToken, setAccessToken] = useState('');
  const [isloading, setIsLoading] = useState(true);
  const [newAlbums, setNewAlbums] = useState<NewReleaseAlbum[]>([]);
  const [popularArtists, setPopularArtists] = useState<ArtistData[]>([]);
  const [newAddedAlbums, setNewAddedAlbums] = useState<AlbumData[]>([]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const { access_token } = await getAceessToken(
        process.env.EXPO_PUBLIC_CLIENT_ID as string,
        process.env.EXPO_PUBLIC_CLIENT_SECRET as string
      ); // 토큰을 요청해서 가져옴
      setAccessToken(access_token); // 토큰 저장
    };

    fetchAccessToken();
  }, []);

  // 새로운 앨범 요청
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (accessToken) {
        try {
          const albums = await getNewReleasedAlbums(accessToken);
          const artists = await getPopularArtists(accessToken);
          const addedAlbums = await getNewAddedAlbums(accessToken);
          setNewAlbums(albums);
          setPopularArtists(artists);
          setNewAddedAlbums(addedAlbums);
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
  }, [accessToken]);

  console.log(accessToken);

  if (isloading || !accessToken) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.newAlbumContainer}>
          <Text style={styles.title}>새로운 앨범</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={newAlbums}
            renderItem={({ item }) => <Album {...item} />}
            keyExtractor={(item) => item.id}
            style={styles.albumList}
          />
        </View>
        <Divider />
        <View>
          <Text style={styles.title}>인기 아티스트</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularArtists.sort((a, b) => a.popularity - b.popularity)}
            renderItem={({ item }) => <Artist {...item} />}
            keyExtractor={(item) => item.id}
            style={styles.artistList}
          />
        </View>
        <Divider />
        <View>
          <Text style={styles.title}>새로 추가된 앨범</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={newAddedAlbums}
            renderItem={({ item }) => <Album {...item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newAlbumContainer: {},
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 12,
    marginBottom: 12,
  },
  albumList: {},
  artistList: {},
});
