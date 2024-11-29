import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SortMenuProps {
  onSortChange: (sortBy: string) => void;
}

const SortMenu: React.FC<SortMenuProps> = ({ onSortChange }) => {
  const [sortBy, setSortBy] = React.useState('');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const sortOption = event.target.value as string;
    setSortBy(sortOption);
    onSortChange(sortOption);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Sort By</InputLabel>
      <Select value={sortBy} onChange={handleChange} label="Sort By">
        <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
        <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
        <MenuItem value="release_date.desc">Release Date Descending</MenuItem>
        <MenuItem value="release_date.asc">Release Date Ascending</MenuItem>
        <MenuItem value="vote_average.desc">Rating Descending</MenuItem>
        <MenuItem value="vote_average.asc">Rating Ascending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortMenu;
