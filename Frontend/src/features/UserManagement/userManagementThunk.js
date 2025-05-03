import { createAsyncThunk } from '@reduxjs/toolkit';

import createApiThunk from '../../services/apiThunkHelper';

export const addUserThunk = createAsyncThunk(
  'user/addStaff',
  createApiThunk('POST', `http://localhost:3000/add/staff`)
);
