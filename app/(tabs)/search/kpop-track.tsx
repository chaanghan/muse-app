import getAccessToken from '@/api/getAccessToken';
import getKpopTracks from '@/api/getKpopTracks';
import Loading from '@/components/Loading';
import TrackOfKpop from '@/components/TrackOfKpop';
import { useTokenStore } from '@/store/authStore';
import { TrackData } from '@/types/types';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function KpopTrack() {
  const [isloading, setIsLoading] = useState(true);
  const [kpopTracks, setKpopTracks] = useState<TrackData[]>([]);
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    const loadData = async () => {
      const accessToken = await getAccessToken();
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
  }, []);

  if (isloading || !token) {
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
