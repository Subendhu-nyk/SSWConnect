// This function is used to create a Redux store. It simplifies setting up Redux by automatically configuring good default settings, including: redux-thunk middleware for async operations.Enables Redux DevTools (in development mode). Applies best practices for reducers and middleware.
import { configureStore } from '@reduxjs/toolkit';
//persistStore- is used to persist (save) the Redux store’s state in local storage (or another storage like session storage).Without persistStore, Redux loses all its state when the page refreshes.
import { persistStore } from 'redux-persist'; 
//This import brings in the root reducer that has already been configured for persistence.It is not a simple reducer; it is wrapped with persistReducer, which enables Redux Persist.
import persistedReducer from './rootReducer'; 


const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  // Add additional middleware if necessary
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore PERSIST action
        ignoredPaths: ['register'], // Ignore the 'register' path in state
      },
    }),
});

// Create the persistor instance
const persistor = persistStore(store);

export { store, persistor }; // Export both store and persistor
