import getAceessToken from '@/api/getAccessToken';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getNewReleasedAlbums from '@/api/getNewReleasedAlbums';
import Artist from '@/components/Artist';
import { Album } from '@/types/types';

const clientId = 'b54da5a5b1c0451fba594d39b1d534a7';
const clientSecret = 'cc04d4fbfb224787985ece68c7a964c9';

export default function HomeScreen() {
  const [accessToken, setAccessToken] = useState('');
  const [newAlbums, setNewAlbums] = useState<Album[]>([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const { access_token } = await getAceessToken(clientId, clientSecret); // 토큰을 요청해서 가져옴
      setAccessToken(access_token); // 토큰 저장
    };

    fetchAccessToken();
  }, []);

  // 새로운 앨범 요청
  useEffect(() => {
    const fetchReleasedAlbums = async () => {
      setIsLoading(true);
      if (accessToken) {
        try {
          const albums = await getNewReleasedAlbums(accessToken);
          setNewAlbums(albums);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchReleasedAlbums();
  }, [accessToken]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>새로운 앨범</Text>
      <FlatList
        horizontal
        data={newAlbums}
        renderItem={({ item }) => <Artist {...item} />}
        keyExtractor={(item) => item.id}
        style={styles.albumList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 12,
    marginBottom: 12,
  },
  albumList: {},
});
