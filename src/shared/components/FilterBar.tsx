import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { genres } from '../../core/utils/genres';

interface FilterBarProps {
  onFilterChange: (genreId: number | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [selectedGenre, setSelectedGenre] = React.useState<number | ''>('');

  const handleChange = (event: SelectChangeEvent<number>) => {
    const genreId =
      event.target.value === '' ? null : (event.target.value as number);
    setSelectedGenre(event.target.value as number | '');
    onFilterChange(genreId);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Genre</InputLabel>
      <Select value={selectedGenre} onChange={handleChange} label="Genre">
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {genres.map((genre) => (
          <MenuItem value={genre.id} key={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterBar;
