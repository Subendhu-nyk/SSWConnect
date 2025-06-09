import { createAsyncThunk } from '@reduxjs/toolkit';

import createApiThunk from '../../services/apiThunkHelper';

export const addUserThunk = createAsyncThunk(
  'user/addUser',
  createApiThunk('POST', `http://localhost:3000/add/User`)
);

export const addBulkUsersThunk = createAsyncThunk(
  'user/addBulkUsersThunk',
  createApiThunk('POST', `http://localhost:3000/add/User`)
);

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  createApiThunk('POST', `http://localhost:3000/user/by-filters`)
);