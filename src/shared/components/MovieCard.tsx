import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Movie } from '../../core/models/movie.models';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = React.memo(({ movie }) => (
  <Card sx={{ maxWidth: 345, height: 800 }}>
    <CardMedia
      component="img"
      alt={movie.title}
      height="500"
      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      title={movie.title}
    />
    <CardContent>
      <Typography variant="h6">{movie.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {movie.overview}
      </Typography>
    </CardContent>
  </Card>
));

export default MovieCard;
