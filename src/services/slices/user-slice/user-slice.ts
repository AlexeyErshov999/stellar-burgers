import { createSlice } from '@reduxjs/toolkit';

import {
  getOrdersThunk,
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from './user-actions';

import { UserState } from './types';

const initialState: UserState = {
  isAuthenticated: false,
  loginUserRequest: false,
  user: null,
  orders: [],
  ordersRequest: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthenticated,
    loginUserRequestSelector: (state) => state.loginUserRequest,
    userNameSelector: (state) => state.user?.name || '',
    userEmailSelector: (state) => state.user?.email || '',
    userSelector: (state) => state.user,

    userOrdersSelector: (state) => state.orders,
    ordersRequestSelector: (state) => state.orders,

    errorSelector: (state) => state.error
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      // процесс авторизации
      .addCase(loginUserThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.error = null;
      })
      // авторизация отклонена
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      // авторизация завершена
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })

      // деавторизация пользователя
      .addCase(logoutUserThunk.pending, (state) => {
        state.user = null;
        state.loginUserRequest = false;
        state.isAuthenticated = false;
      })

      // процесс загрузки данных юзера
      .addCase(getUserThunk.pending, (state) => {
        state.loginUserRequest = true;
      })
      // загрузка отклонена
      .addCase(getUserThunk.rejected, (state, action) => {
        state.user = null;
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      // загрузка закончена
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })

      // процесс регистрирации пользователя на сервере
      .addCase(registerUserThunk.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserRequest = true;
      })
      // регистрация отклонена
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      // регистрация закончена
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })

      // процесс обновления данных пользователя
      .addCase(updateUserThunk.pending, (state) => {
        state.loginUserRequest = true;
      })
      // обновление отклонено
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      // обновление закончено
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })

      // загружаем историю заказов пользователя
      .addCase(getOrdersThunk.pending, (state) => {
        state.ordersRequest = true;
      })
      // загрузка заказов отклонена
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message!;
        state.ordersRequest = false;
      })
      // загрузка закончена
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersRequest = false;
      });
  }
});

export const { clearErrors } = userSlice.actions;
export const {
  isAuthCheckedSelector,
  userNameSelector,
  userEmailSelector,
  userSelector,
  loginUserRequestSelector,

  userOrdersSelector,
  ordersRequestSelector,

  errorSelector
} = userSlice.selectors;
export default userSlice.reducer;
