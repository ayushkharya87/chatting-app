import { configureStore, combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import messageSlice from "./messageSlice.js";
import socketSlice from "./socketSlice.js";
// redux persist
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  };

  const rootReducer = combineReducers({
    user: userSlice,
    message: messageSlice,
    socket: socketSlice
 });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
