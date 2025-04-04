import axios from 'axios';

async function getKpopTracks(accessToken: string) {
  if (!accessToken) {
    console.log('access token이 존재하지 않습니다.');
    return null;
  }
  try {
    const data = await axios({
      url: `${process.env.EXPO_PUBLIC_SPOTIFY_BASE_URL}/search?q=genre:k-pop&type=track&limit=30`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data.tracks.items;
  } catch (error) {
    console.error(`K POP 트랙의 요청이 실패했습니다. ${error}`);
  }
}

export default getKpopTracks;
