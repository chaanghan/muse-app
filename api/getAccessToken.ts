import { RequestToken } from '@/types/types';
import axios from 'axios';

async function getAceessToken(
  clientId: string,
  clientSecret: string
): Promise<RequestToken> {
  try {
    const response = await axios({
      url: `https://accounts.spotify.com/api/token`,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export default getAceessToken;
