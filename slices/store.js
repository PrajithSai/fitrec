import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import appReducer from './index';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
