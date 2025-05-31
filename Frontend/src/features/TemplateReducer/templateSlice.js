import { createSlice } from '@reduxjs/toolkit';
import { addTemplateThunk, editTemplateThunk, getTemplateThunk } from './templateThunk';

const initialState = {
  addTemplateData: [],
  getTemplateData: [],
  editTemplateData: [],
  error: null,
  loading: {
    addTemplateLoading: false,
    getTemplateLoading: false,
    editTemplateLoading: false,
  },
};
const templateSlice = createSlice({
  name: 'hrmManagement',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(addTemplateThunk.pending, state => {
        state.loading.addTemplateLoading = true;
        state.error = null;
      })
      .addCase(addTemplateThunk.fulfilled, (state, action) => {
        state.loading.addTemplateLoading = false;
        state.addTemplateData = action.payload.data;
      })
      .addCase(addTemplateThunk.rejected, (state, action) => {
        state.loading.addTemplateLoading = false;
        state.error = action.payload;
      })
      .addCase(getTemplateThunk.pending, state => {
        state.loading.getTemplateLoading = true;
        state.error = null;
      })
      .addCase(getTemplateThunk.fulfilled, (state, action) => {
        state.loading.getTemplateLoading = false;
        state.getTemplateData = action.payload.data;
      })
      .addCase(getTemplateThunk.rejected, (state, action) => {
        state.loading.getTemplateLoading = false;
        state.error = action.payload;
      })
      .addCase(editTemplateThunk.pending, state => {
        state.loading.editTemplateLoading = true;
        state.error = null;
      })
      .addCase(editTemplateThunk.fulfilled, (state, action) => {
        state.loading.editTemplateLoading = false;
        state.editTemplateData = action.payload.data;
      })
      .addCase(editTemplateThunk.rejected, (state, action) => {
        state.loading.editTemplateLoading = false;
        state.error = action.payload;
      });
  },
});

export default templateSlice.reducer;
