import axios from 'axios';

async function getSearch(accessToken: string, query: string) {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return null;
  }
  try {
    const data = await axios({
      url: `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data.tracks.items;
  } catch (error) {
    console.error(`트랙 요청이 실패했습니다. ${error}`);
  }
}

export default getSearch;
