import getAccessToken from '@/api/getAccessToken';
import getSearch from '@/api/getSearch';
import Loading from '@/components/Loading';
import Track from '@/components/Track';
import { useTokenStore } from '@/store/authStore';
import { TrackData } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Result() {
  const { keyword } = useLocalSearchParams();
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    const loadData = async () => {
      const accessToken = await getAccessToken();
      setIsLoading(true);
      if (accessToken) {
        try {
          const searchTrackData = await getSearch(
            accessToken,
            keyword as string
          );
          setTracks(searchTrackData);
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
  }, [keyword]);

  if (isLoading || !token) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={({ item }) => <Track key={item.id} {...item.album} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
});
