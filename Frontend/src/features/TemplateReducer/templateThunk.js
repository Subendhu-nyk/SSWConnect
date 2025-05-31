import { createAsyncThunk } from '@reduxjs/toolkit';

import createApiThunk from '../../services/apiThunkHelper';

export const addTemplateThunk = createAsyncThunk(
  'user/addTemplate',
  createApiThunk('POST', `http://localhost:3000/add-template`)
);

export const editTemplateThunk = createAsyncThunk(
  'user/editTemplate',
  createApiThunk('POST', `http://localhost:3000/edit-template`)
);

export const getTemplateThunk = createAsyncThunk(
  'user/getTemplate',
  createApiThunk('GET', `http://localhost:3000/get-template`)
);

export const deleteTemplateThunk = createAsyncThunk(
  'user/deleteTemplate',
  createApiThunk('POST', `http://localhost:3000/delete-template`)
);
