import { createAsyncThunk } from '@reduxjs/toolkit';

import createApiThunk from '../../services/apiThunkHelper';

export const addDepartmentThunk = createAsyncThunk(
  'user/addDepartment',
  createApiThunk('POST', `http://localhost:3000/add-department`)
);

export const addDesignationThunk = createAsyncThunk(
    'user/addDesignation',
    createApiThunk('POST', `http://localhost:3000/add-designation`)
  );
