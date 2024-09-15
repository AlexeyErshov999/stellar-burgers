import { createSlice } from '@reduxjs/toolkit';

import { getFeedsThunk, getOrderByNumberThunk } from './feed-actions';
import { FeedState } from './types';

export const initialState: FeedState = {
  orders: [],
  isFeedsLoading: false,
  order: null,
  isOrderLoading: false,
  total: 0,
  totalToday: 0,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    ordersSelector: (state) => state.orders,
    isFeedsLoadingSelector: (state) => state.isFeedsLoading,
    orderSelector: (state) => state.order,
    isOrderLoadingSelector: (state) => state.isOrderLoading,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // процесс загрузки всех заказов
      .addCase(getFeedsThunk.pending, (state) => {
        state.isFeedsLoading = true;
      })
      // загрузка заказов отклонена
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message!;
      })
      // загрузка закончена
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

      // процесс загрузки конкретного заказа
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isOrderLoading = true;
      })
      // загрузка отклонена
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.error = action.error.message!;
        state.isOrderLoading = false;
      })
      // загрузка закончена
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isOrderLoading = false;
      });
  }
});

export const {
  ordersSelector,
  isFeedsLoadingSelector,

  orderSelector,
  isOrderLoadingSelector,

  totalSelector,
  totalTodaySelector
} = feedSlice.selectors;
export default feedSlice.reducer;
