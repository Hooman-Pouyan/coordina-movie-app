import React from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { useAppSelector } from '../hooks/hooks';
import MovieCard from './MovieCard';

const MovieList: React.FC = () => {
  const { movies, loading, error } = useAppSelector((state) => state.movies);

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );

  if (movies.length === 0)
    return (
      <Typography variant="h6">
        No movies found for the selected criteria.
      </Typography>
    );

  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
