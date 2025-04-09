interface RequestToken {
  access_token: string;
}

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
interface SearchKpopArtistData {
  followers: Followers;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
interface SearchNewAlbumData {
  album_type: string;
  artists: Artist[];
  total_tracks: number;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
}
interface NewReleaseAlbumData extends SearchNewAlbumData {}

interface Artist {
  id: string;
  name: string;
  type: string;
}
interface SearchKeywordTrackData {
  album: SearchNewAlbumData;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  id: string;
  name: string;
  popularity: number;
  track_number: number;
  type: string;
  uri: string;
}

interface SearchGenreTrackData extends SearchKeywordTrackData {}

export type {
  Image,
  RequestToken,
  SearchKeywordTrackData,
  SearchKpopArtistData,
  SearchNewAlbumData,
  NewReleaseAlbumData,
  SearchGenreTrackData,
  PlaylistData,
};
