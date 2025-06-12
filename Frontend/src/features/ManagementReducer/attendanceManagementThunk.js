import { createAsyncThunk } from '@reduxjs/toolkit';

import createApiThunk from '../../services/apiThunkHelper';

export const addAttendanceThunk = createAsyncThunk(
  'user/addAttendance',
  createApiThunk('POST', `http://localhost:3000/add-attendance`)
);

export const getAttendanceThunk = createAsyncThunk(
  'attendance/get',
  createApiThunk('GET', 'http://localhost:3000/all-attendance')
);

export const getAttendanceSummaryThunk = createAsyncThunk(
  'attendance/summary',
  createApiThunk('GET', 'http://localhost:3000/attendance-summary')
);

export const updateAttendanceThunk = createAsyncThunk(
  'attendance/update',
  createApiThunk('POST', 'http://localhost:3000/update-attendance') 
);

export const deleteAttendanceThunk = createAsyncThunk(
  'attendance/delete',
  createApiThunk('DELETE', 'http://localhost:3000/delete-attendance') 
);

export const uploadAttendanceThunk = createAsyncThunk(
  'attendance/upload',
  createApiThunk('POST', 'http://localhost:3000/upload-attendance')
);

export const getAllAttendanceThunk = createAsyncThunk(
  'attendance/getAll',
  createApiThunk('GET', 'http://localhost:3000/getAll-attendance')
);

