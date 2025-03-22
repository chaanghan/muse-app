import axios from 'axios';

async function getNewAddedAlbums(accessToken: string) {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return null;
  }
  try {
    const data = await axios({
      url: 'https://api.spotify.com/v1/search?q=tag:new&type=album&limit=5',
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

export default getNewAddedAlbums;
