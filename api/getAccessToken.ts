import { useTokenStore } from '@/store/authStore';
import { AccessToken } from '@/types/types';
import axios from 'axios';

async function getAccessToken(): Promise<AccessToken> {
  try {
    const response = await axios({
      url: `${process.env.EXPO_PUBLIC_SPOTIFY_AUTH_URL}/api/token`,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        grant_type: 'client_credentials',
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
      },
    });
    const { access_token } = response.data;
    useTokenStore.getState().setToken(access_token); // 저장소에 토큰 저장
    return access_token; // 토큰 반환
  } catch (error) {
    console.error(`액세스 토큰 요청 실패 : ${error}`);
    throw error;
  }
}
export default getAccessToken;
