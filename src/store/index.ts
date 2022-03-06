import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { meta } from './reducers';

export const reduxStore = configureStore({
  reducer: combineReducers({
    meta,
  }),
  devTools: process.env.NODE_ENV === 'development',
});
