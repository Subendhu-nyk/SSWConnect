import { useState } from 'react';
import { Box, Typography, Paper, InputBase, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PrintIcon from '@mui/icons-material/Print';

const CommonFilter = ({
  title = 'Dashboard Title',
  subtitle = '',
  onSearch,
  onAdd,
  onImport,
  onExport,
  onDownloadTemplate,
  onRefresh,
  onRecycleBin,
  onPrint,
  showAdd = false,
  showImport = false,
  showExport = false,
  showDownloadTemplate = false,
  showRefresh = false,
  showRecycleBin = false,
  showPrint = false,
  showSearch = false,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText.trim());
    }
  };

  const handleClear = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* Title + Subtitle */}
      <Box sx={{ mb: 1 }}>
        <Typography variant='h5' fontWeight='bold'>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant='body2' sx={{ color: '#666' }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Search + Action Buttons */}
      <Box
        sx={{
          backgroundColor: '#e3e9f7',
          borderRadius: 2,
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {/* Search Box */}
        <Box sx={{ flex: 1 }}>
          {showSearch && (
            <Paper
              component='form'
              onSubmit={e => {
                e.preventDefault();
                handleSearch();
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 36,
                px: 1,
                borderRadius: 2,
                backgroundColor: '#fff',
                width: 250,
              }}
            >
              <SearchIcon sx={{ color: '#888' }} />
              <InputBase
                placeholder='Search...'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
              />
              {searchText && (
                <IconButton onClick={handleClear} size='small'>
                  <CloseIcon fontSize='small' />
                </IconButton>
              )}
            </Paper>
          )}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {showAdd && (
            <Tooltip title='Add'>
              <IconButton onClick={onAdd} color='success'>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          )}
          {showImport && (
            <Tooltip title='Import'>
              <IconButton onClick={onImport} color='primary'>
                <UploadFileIcon />
              </IconButton>
            </Tooltip>
          )}
          {showExport && (
            <Tooltip title='Export'>
              <IconButton onClick={onExport} color='info'>
                <PictureAsPdfIcon />
              </IconButton>
            </Tooltip>
          )}
          {showDownloadTemplate && (
            <Tooltip title='Download Template'>
              <IconButton onClick={onDownloadTemplate} color='secondary'>
                <FileDownloadDoneIcon />
              </IconButton>
            </Tooltip>
          )}
          {showRefresh && (
            <Tooltip title='Refresh'>
              <IconButton onClick={onRefresh}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
          {showRecycleBin && (
            <Tooltip title='Recycle Bin'>
              <IconButton onClick={onRecycleBin} color='error'>
                <DeleteSweepIcon />
              </IconButton>
            </Tooltip>
          )}
          {showPrint && (
            <Tooltip title='Print'>
              <IconButton onClick={onPrint}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CommonFilter;
