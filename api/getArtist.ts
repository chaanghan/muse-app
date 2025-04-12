import { ArtistData } from '@/types/types';
import axios from 'axios';

async function getArtist(
  accessToken: string,
  artistId: string
): Promise<ArtistData | null> {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return null;
  }
  try {
    const data = await axios({
      url: `${process.env.EXPO_PUBLIC_SPOTIFY_BASE_URL}/artists/${artistId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`get atritst 요청이 실패했습니다. ${error}`);
    return null;
  }
}
export default getArtist;
