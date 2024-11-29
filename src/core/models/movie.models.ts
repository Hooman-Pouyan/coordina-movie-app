export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieState {
  loading: boolean;
  movies: Movie[];
  error: string | null;
  totalPages: number;
  currentPage: number;
}


export interface FetchMoviesParams {
  query?: string;
  genreId?: number;
  sortBy?: string;
  page?: number;
}