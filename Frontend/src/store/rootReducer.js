// combineReducers from Redux: Helps combine multiple reducers into one main reducer.
import { combineReducers } from 'redux';
// persistReducer and storage from Redux-Persist: Helps save part of the Redux store in localStorage, so data is not lost when the page refreshes.
import { persistReducer } from 'redux-persist'; // Import persistReducer
import storage from 'redux-persist/lib/storage'; // LocalStorage as the storage mechanism

// Import individual reducers (from slices)
import ThemeReducer from '../features/ThemeReducer/themeSlice.js';
// import DashboardReducer from '../features/DashboardSlice/DashboardSlice';
// import TokenReducer from '../features/SystemConfigurationReducers/TokenReducer/tokenSlice';

// Redux Persist Configurations for individual reducers
// Specifies how Redux state should be stored persistently.
// key: 'root' → The key under which the persisted state will be stored.
// storage → Uses localStorage to save data.
// whitelist: ['theme', 'systemId'] → Only theme and systemId state will be saved.
const persistConfig = {
  key: 'root', // Key for the persisted data
  storage, // This tells redux-persist to use localStorage
  whitelist: ['theme', 'systemId'], // Only persist 'auth' and 'user' reducers
};

// Combine multiple reducers 
const rootReducer = combineReducers({
  theme: ThemeReducer,
//   dashboard: DashboardReducer,
//   token: TokenReducer,

});

//It ensures the selected data remains stored even after a page refresh.
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
