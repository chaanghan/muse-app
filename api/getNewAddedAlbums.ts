import axios from 'axios';

async function getNewAddedAlbums(accessToken: string) {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return null;
  }
  try {
    const data = await axios({
      url: `${process.env.EXPO_PUBLIC_SPOTIFY_BASE_URL}/search?q=tag:new&type=album&limit=5`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data.albums.items;
  } catch (error) {
    console.error(`새로 추가된 앨범 요청이 실패했습니다. ${error}`);
  }
}

export default getNewAddedAlbums;
