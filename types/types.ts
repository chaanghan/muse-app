interface RequestToken {
  access_token: string;
}

interface Image {
  width: number;
  height: number;
  url: string;
}
interface Followers {
  total: number;
}
interface ArtistData {
  id: string;
  name: string;
  type: string;
  uri?: string;
  followers: Followers;
  popularity: number;
  images: Image[];
}
interface AlbumData {
  id: string;
  name: string;
  images: Image[];
  artists: ArtistData[];
  release_date: string;
  total_tracks?: number;
  album_type?: string;
  available_markets?: Market;
  external_urls?: ExternalUrls;
  href?: string;
  release_date_precision?: string;
  type?: string;
  uri?: string;
}

interface ExternalUrls {
  spotify: string;
}
interface Market {
  available_markets: string[];
}
export type { Image, ArtistData, AlbumData, RequestToken };
