import { ArtistData } from '@/types/types';
import axios from 'axios';

async function getPopularArtists(
  accessToken: string
): Promise<ArtistData[] | []> {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return [];
  }
  try {
    const data = await axios({
      url: `${process.env.EXPO_PUBLIC_SPOTIFY_BASE_URL}/search?q=genre:k-pop&type=artist&limit=10`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data.artists.items;
  } catch (error) {
    console.error(`인기 아티스트 요청이 실패했습니다. ${error}`);
    return [];
  }
}

export default getPopularArtists;
