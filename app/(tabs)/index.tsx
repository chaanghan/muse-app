import getAceessToken from '@/api/getAccessToken';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlbumData, ArtistData } from '@/types/types';
import getNewReleasedAlbums from '@/api/getNewReleasedAlbums';
import getPopularArtists from '@/api/getPopularArtists';
import Album from '@/components/Album';
import Artist from '@/components/Artist';
import Divider from '@/components/Divider';

const clientId = 'b54da5a5b1c0451fba594d39b1d534a7';
const clientSecret = 'cc04d4fbfb224787985ece68c7a964c9';

export default function HomeScreen() {
  const [accessToken, setAccessToken] = useState('');
  const [isloading, setIsLoading] = useState(true);
  const [newAlbums, setNewAlbums] = useState<AlbumData[]>([]);
  const [popularArtists, setPopularArtists] = useState<ArtistData[]>([]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const { access_token } = await getAceessToken(clientId, clientSecret); // 토큰을 요청해서 가져옴
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
          setNewAlbums(albums);
          setPopularArtists(artists);
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

  return (
    <SafeAreaView style={styles.container}>
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
