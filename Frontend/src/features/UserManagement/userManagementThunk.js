import { createAsyncThunk } from '@reduxjs/toolkit';

import createApiThunk from '../../services/apiThunkHelper';

export const addStaffThunk = createAsyncThunk(
  'user/addStaff',
  createApiThunk('POST', `http://localhost:3000/add/staff`)
);
