import { AlbumData } from '@/types/types';
import axios from 'axios';

async function getSearchAlbum(
  accessToken: string,
  query: string
): Promise<AlbumData[] | []> {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return [];
  }
  try {
    const data = await axios({
      url: `${process.env.EXPO_PUBLIC_SPOTIFY_BASE_URL}/search?q=${query}&type=album&limit=20`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data.albums.items;
  } catch (error) {
    console.error(`트랙 요청이 실패했습니다. ${error}`);
    return [];
  }
}

export default getSearchAlbum;
