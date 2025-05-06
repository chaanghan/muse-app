import { PlaylistData } from '@/types/types';
import axios from 'axios';

async function getPlaylist(
  accessToken: string,
  query: string
): Promise<PlaylistData[] | []> {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return [];
  }
  try {
    const data = await axios({
      url: `${process.env.EXPO_PUBLIC_SPOTIFY_BASE_URL}/search?q=${query}&type=playlist&limit=20`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data.playlists.items
      .filter((item: any) => item !== null)
      .filter((item: any) => item.description !== '');
  } catch (error) {
    console.error(`트랙 요청이 실패했습니다. ${error}`);
    return [];
  }
}

export default getPlaylist;
