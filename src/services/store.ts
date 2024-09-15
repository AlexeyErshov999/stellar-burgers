import { combineReducers, configureStore } from '@reduxjs/toolkit';

// импорты всех редьюсеров
import constructor from './slices/constructor-slice/constructor-slice';
import feed from './slices/feed-slice/feed-slice';
import ingredients from './slices/ingredients-slice/ingredients-slice';
import order from './slices/order-slice/order-slice';
import user from './slices/user-slice/user-slice';

export const rootReducer = combineReducers({
  constructor,
  order,
  user,
  feed,
  ingredients
});

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
