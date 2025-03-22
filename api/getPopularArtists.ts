import axios from 'axios';

async function getPopularArtists(accessToken: string) {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return null;
  }
  try {
    const data = await axios({
      url: 'https://api.spotify.com/v1/search?q=genre:k-pop&type=artist&limit=10',
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data.artists.items;
  } catch (error) {
    console.error(`인기 아티스트 요청이 실패했습니다. ${error}`);
  }
}

export default getPopularArtists;
