import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the theme
const initialState = {
  darkMode: false, // Default theme mode
};

// Create a slice of the state
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.darkMode = !state.darkMode;
    },
  },
});

// Export actions to be used in components
export const { toggleTheme } = themeSlice.actions;

// Export the reducer to be used in the store
export default themeSlice.reducer;
