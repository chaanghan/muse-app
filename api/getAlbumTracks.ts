import { TracksOfAlbum } from '@/types/types';
import axios from 'axios';

async function getAlbumTracks(
  accessToken: string,
  albumId: string
): Promise<TracksOfAlbum | []> {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return [];
  }
  try {
    const data = await axios({
      url: `${process.env.EXPO_PUBLIC_SPOTIFY_BASE_URL}/albums/${albumId}/tracks`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data.items;
  } catch (error) {
    console.error(`get atritst 요청이 실패했습니다. ${error}`);
    return [];
  }
}
export default getAlbumTracks;
