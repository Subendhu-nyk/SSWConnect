import { createSlice } from '@reduxjs/toolkit';
import {
  addAttendanceThunk,
  getAttendanceThunk,
  updateAttendanceThunk,
  deleteAttendanceThunk,
  uploadAttendanceThunk,
  getAttendanceSummaryThunk,
  getAllAttendanceThunk,
} from './attendanceManagementThunk';

const initialState = {
  addAttendanceData: [],
   getAttendanceData: [],
    getAllAttendanceData: [],
  attendanceSummaryData: [],
  uploadResponse: null,
  updatedAttendance: null,
  deletedAttendance: null,
  error: null,
  loading: {
    addAttendanceLoading: false,
    getAllAttendanceLoading:false,
    getAttendanceLoading: false,
    updateAttendanceLoading: false,
    deleteAttendanceLoading: false,
    uploadAttendanceLoading: false,
    getAttendanceSummaryLoading: false,
  },
};
const attendanceManagementSlice = createSlice({
  name: 'attendanceManagement',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(addAttendanceThunk.pending, state => {
        state.loading.addAttendanceLoading = true;
        state.error = null;
      })
      .addCase(addAttendanceThunk.fulfilled, (state, action) => {
        state.loading.addAttendanceLoading = false;
        state.addAttendanceData = action.payload.data;
      })
      .addCase(addAttendanceThunk.rejected, (state, action) => {
        state.loading.addAttendanceLoading = false;
        state.error = action.payload;
      })

      // GET
      .addCase(getAttendanceThunk.pending, state => {
        state.loading.getAttendanceLoading = true;
        state.error = null;
      })
      .addCase(getAttendanceThunk.fulfilled, (state, action) => {
        state.loading.getAttendanceLoading = false;
        state.getAttendanceData = action.payload.data;
      })
      .addCase(getAttendanceThunk.rejected, (state, action) => {
        state.loading.getAttendanceLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllAttendanceThunk.pending, state => {
        state.loading.getAllAttendanceLoading = true;
        state.error = null;
      })
      .addCase(getAllAttendanceThunk.fulfilled, (state, action) => {
        state.loading.getAllAttendanceLoading = false;
        state.getAllAttendanceData = action.payload.data;
      })
      .addCase(getAllAttendanceThunk.rejected, (state, action) => {
        state.loading.getAllAttendanceLoading = false;
        state.error = action.payload;
      })

      // SUMMARY
      .addCase(getAttendanceSummaryThunk.pending, state => {
        state.loading.getAttendanceSummaryLoading = true;
        state.error = null;
      })
      .addCase(getAttendanceSummaryThunk.fulfilled, (state, action) => {
        state.loading.getAttendanceSummaryLoading = false;
        state.attendanceSummaryData = action.payload.data;
      })
      .addCase(getAttendanceSummaryThunk.rejected, (state, action) => {
        state.loading.getAttendanceSummaryLoading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateAttendanceThunk.pending, state => {
        state.loading.updateAttendanceLoading = true;
        state.error = null;
      })
      .addCase(updateAttendanceThunk.fulfilled, (state, action) => {
        state.loading.updateAttendanceLoading = false;
        state.updatedAttendance = action.payload.data;
      })
      .addCase(updateAttendanceThunk.rejected, (state, action) => {
        state.loading.updateAttendanceLoading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteAttendanceThunk.pending, state => {
        state.loading.deleteAttendanceLoading = true;
        state.error = null;
      })
      .addCase(deleteAttendanceThunk.fulfilled, (state, action) => {
        state.loading.deleteAttendanceLoading = false;
        state.deletedAttendance = action.payload.data;
      })
      .addCase(deleteAttendanceThunk.rejected, (state, action) => {
        state.loading.deleteAttendanceLoading = false;
        state.error = action.payload;
      })

      // UPLOAD
      .addCase(uploadAttendanceThunk.pending, state => {
        state.loading.uploadAttendanceLoading = true;
        state.error = null;
      })
      .addCase(uploadAttendanceThunk.fulfilled, (state, action) => {
        state.loading.uploadAttendanceLoading = false;
        state.uploadResponse = action.payload.data;
      })
      .addCase(uploadAttendanceThunk.rejected, (state, action) => {
        state.loading.uploadAttendanceLoading = false;
        state.error = action.payload;
      });
  },
});

export default attendanceManagementSlice.reducer;
