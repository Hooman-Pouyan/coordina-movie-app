import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { MovieState, FetchMoviesParams } from '../../models/movie.models';

const initialState: MovieState = {
  loading: false,
  movies: [],
  error: null,
  totalPages: 0,
  currentPage: 1,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params: FetchMoviesParams) => {
    const {
      query = '',
      genreId,
      sortBy = 'popularity.desc',
      page = 1,
    } = params;

    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

    const endpoint = query ? '/search/movie' : '/discover/movie';

    const requestParams: any = {
      page,
      'release_date.gte': lastMonthDate.toISOString().split('T')[0],
      'release_date.lte': currentDate.toISOString().split('T')[0],
    };

    if (query) {
      requestParams.query = query;
    } else {
      requestParams.sort_by = sortBy;
    }

    if (genreId) {
      requestParams.with_genres = genreId;
    }

    const response = await api.get(endpoint, {
      params: requestParams,
    });

    return response.data;
  },
);

const movieState = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export default movieState.reducer;
