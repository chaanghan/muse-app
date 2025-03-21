import axios from 'axios';

async function getNewReleasedAlbums(accessToken: string) {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return null;
  }
  try {
    const data = await axios({
      url: 'https://api.spotify.com/v1/browse/new-releases?limit=10',
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data.albums.items;
  } catch (error) {
    console.error(`새로운 앨범 요청이 실패했습니다. ${error}`);
  }
}

export default getNewReleasedAlbums;
