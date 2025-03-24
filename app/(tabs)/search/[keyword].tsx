import getAceessToken from '@/api/getAccessToken';
import getSearch from '@/api/getSearch';
import Track from '@/components/Track';
import { TrackData } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

const clientId = 'b54da5a5b1c0451fba594d39b1d534a7';
const clientSecret = 'cc04d4fbfb224787985ece68c7a964c9';

export default function Result() {
  const { keyword } = useLocalSearchParams();
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const { access_token } = await getAceessToken(clientId, clientSecret);
      setAccessToken(access_token);
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (accessToken) {
        try {
          const searchTrackData = await getSearch(accessToken, keyword);
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

  console.log(tracks);

  return (
    <SafeAreaView>
      <FlatList
        data={tracks}
        renderItem={({ item }) => <Track key={item.id} {...item.album} />}
      />
    </SafeAreaView>
  );
}
