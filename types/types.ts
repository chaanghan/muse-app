type AccessToken = string;

interface PlaylistData {
  id: number;
  title: string;
  imageUrl: string;
  contents?: string[];
}

interface Image {
  width: number;
  height: number;
  url: string;
}
interface Followers {
  total: number;
}
type AvailableMarket = string[];

// 아티스트
interface Artist {
  href?: string;
  id: string;
  name: string;
  type: string;
  uri?: string;
}
interface ArtistData extends Artist {
  followers: Followers;
  genres: string[];
  images: Image[];
  popularity: number;
}

// 앨범
interface AlbumData {
  album_type: string;
  artists: Artist[];
  available_markets: AvailableMarket;
  href?: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

// 트랙
interface TrackData {
  album: AlbumData;
  artists: Artist[];
  available_markets: AvailableMarket;
  disc_number: number;
  duration_ms: number;
  id: string;
  is_playable?: boolean;
  name: string;
  popularity: number;
  track_number: number;
  type: string;
  uri: string;
}
type TrackOfAlbum = Omit<TrackData, 'album'>;

export type {
  Image,
  AccessToken,
  TrackData,
  AlbumData,
  ArtistData,
  TrackOfAlbum,
};
