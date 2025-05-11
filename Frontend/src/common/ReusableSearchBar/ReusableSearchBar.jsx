import { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const ReusableSearchBar = ({ onSearch, placeholder = 'Search...' }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText.trim());
    }
  };

  const handleClear = () => {
    setSearchText('');
    onSearch(''); // Reset list
  };

  return (
    <Tooltip title='Search'>
      <Paper
        component='form'
        onSubmit={e => {
          e.preventDefault();
          handleSearch();
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 250,
          px: 1,
          height: 36,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: '#fff',
        }}
      >
        <SearchIcon sx={{ color: '#666' }} />
        <InputBase
          placeholder={placeholder}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
        />
        {searchText && (
          <IconButton size='small' onClick={handleClear}>
            <CloseIcon fontSize='small' />
          </IconButton>
        )}
      </Paper>
    </Tooltip>
  );
};

export default ReusableSearchBar;
