import { Breadcrumbs, Typography, Link, Box, Grid } from '@mui/material';

import ReusableDataTable from '../../common/ReusableWidgets/ReusableDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { getAllAttendanceThunk } from '../../features/ManagementReducer/attendanceManagementThunk';

const columnsField = [
  { field: 'user_id', headerName: 'User ID',flex: 2, },
  { field: 'role', headerName: 'Role', flex: 2, },
  { field: 'department', headerName: 'Department',flex: 2, },
  { field: 'date', headerName: 'Date', flex: 2,},
  { field: 'status', headerName: 'Status', flex: 2, },
];

const ViewAttendance = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const attendanceData = useSelector(state => state?.attendanceManagement?.getAllAttendanceData);
  const totalCount = attendanceData.length;

  const paginatedRows = useMemo(() => {
    const start = pageNumber * pageSize;
    const end = start + pageSize;
    return attendanceData.slice(start, end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendanceData, pageNumber, pageSize]);
  useEffect(() => {
    dispatch(getAllAttendanceThunk({ payload: null }));
  }, [dispatch]);
  return (
    <Box sx={{ p: 2 }}>
      {/* Breadcrumbs Navigation */}
      <Typography variant='h4' sx={{ mb: 1 }}>
       All Attendance List
      </Typography>
      <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
        <Link underline='hover' color='inherit' href='/'>
          Dashboard
        </Link>
        <Link underline='hover' color='inherit' href='/report'>
          Report
        </Link>
        <Typography color='text.primary'>Student Attendance</Typography>
      </Breadcrumbs>
      {/* Main Content */}
       <Grid item xs={12} sm={6} >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Date Range Picker */}
          <ReusableDataTable
            rows={paginatedRows}
            columns={columnsField}
            showActions={true}
            onEdit={row => console.log('Edit', row)}
            onDelete={row => console.log('Delete', row)}
            pageCount={totalCount}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default ViewAttendance;
