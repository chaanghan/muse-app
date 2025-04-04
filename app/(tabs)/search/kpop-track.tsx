import getAceessToken from '@/api/getAccessToken';
import getKpopTracks from '@/api/getKpopTracks';
import Loading from '@/components/Loading';
import TrackOfKpop from '@/components/TrackOfKpop';
import { SearchGenreTrackData } from '@/types/types';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function KpopTrack() {
  const [accessToken, setAccessToken] = useState('');
  const [isloading, setIsLoading] = useState(true);
  const [kpopTracks, setKpopTracks] = useState<SearchGenreTrackData[]>([]);

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

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (accessToken) {
        try {
          const data = await getKpopTracks(accessToken);
          setKpopTracks(data);
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

  if (isloading || !accessToken) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>Pop</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={kpopTracks}
          renderItem={({ item }) => <TrackOfKpop {...item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 12,
    marginBottom: 12,
  },
});
