import React, { useEffect, useCallback } from 'react';
import { Grid, Container, Pagination, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../shared/hooks/hooks';
import { fetchMovies } from '../store/states/movieState';
import SearchBar from '../../shared/components/SearchBar';
import FilterBar from '../../shared/components/FilterBar';
import SortMenu from '../../shared/components/SortMenu';
import MovieList from '../../shared/components/MovieList';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalPages, currentPage } = useAppSelector((state) => state.movies);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState<number | null>(null);
  const [sortBy, setSortBy] = React.useState('popularity.desc');
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedGenre, sortBy]);

  useEffect(() => {
    dispatch(
      fetchMovies({
        query: searchQuery,
        genreId: selectedGenre || undefined,
        sortBy,
        page,
      }),
    );
  }, [dispatch, searchQuery, selectedGenre, sortBy, page]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((genreId: number | null) => {
    setSelectedGenre(genreId);
  }, []);

  const handleSortChange = useCallback((sortOption: string) => {
    setSortBy(sortOption);
  }, []);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      console.log(event);
      setPage(value);
    },
    [],
  );

  const handleReset = () => {
    setSearchQuery('');
    setSelectedGenre(0);
    setSortBy('popularity.desc');
    setPage(1);
  };

  return (
    <Container>
      <Grid container spacing={3} style={{ marginTop: '2rem' }}>
        <Grid item xs={12}>
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FilterBar onFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SortMenu onSortChange={handleSortChange} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleReset}
            sx={{ marginTop: '1rem' }}
          >
            Reset Filters
          </Button>
        </Grid>

        <Grid item xs={12}>
          <MovieList />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
