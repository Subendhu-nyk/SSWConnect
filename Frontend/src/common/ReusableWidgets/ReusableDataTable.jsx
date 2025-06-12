import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, IconButton, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ReusableDataTable = ({
  title = '',
  rows = [],
  columns = [],
  onEdit,
  onDelete,
  getRowId = row => row.id,
  isLoading = false,
  pageSize = 10,
  pageNumber = 0,
  setPageSize = () => {},
  setPageNumber = () => {},
  pageCount = 0,
  isPagination = true,
  showActions = false,
  rowsPerPageOptions = [10, 25, 50],
}) => {
  // Actions column definition
  const finalColumns = React.useMemo(() => {
    if (!showActions) return columns;

    const actionColumn = {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: params => (
        <>
          {onEdit && (
            <IconButton onClick={() => onEdit(params.row)} size="small" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={() => onDelete(params.row)} size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </>
      ),
    };

    return [...columns, actionColumn];
  }, [columns, showActions, onEdit, onDelete]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  // Handle page size change
  const handleChangeRowsPerPage = event => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <DataGrid
        autoHeight
        loading={isLoading}
        rows={rows}
        columns={finalColumns}
        getRowId={getRowId}
        disableSelectionOnClick
        // paginationMode='server'        
        pageSize={pageSize}
        rowCount={pageCount}
        hideFooter={true}
        hideFooterPagination={true}
        rowsPerPageOptions={rowsPerPageOptions ?? [10, 25, 50]}
         onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />
 {isPagination && (
      <TablePagination
        component="div"
        count={pageCount}
        page={pageNumber}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
 )}
    </Box>
  );
};

export default ReusableDataTable;
