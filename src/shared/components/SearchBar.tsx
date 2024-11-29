import React, { useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const debouncedSearchTerm = useDebounce(input, 500);

  React.useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <TextField
      label="Search Movies"
      variant="outlined"
      fullWidth
      onChange={handleChange}
    />
  );
};

export default SearchBar;
