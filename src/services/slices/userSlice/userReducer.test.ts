import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
    loginUserThunk,
    registerUserThunk,
    logoutUserThunk,
    updateUserThunk,
    forgotPasswordThunk,
    resetPasswordThunk,
    getUserThunk
} from './userSlice';

import { accessToken, refreshToken } from '../../../../cypress/support/constants/tokens';
import { user } from '../../../../cypress/support/constants/user';

const setupStore = () =>
  configureStore({
    reducer: {
      user: userReducer
    }
  });

describe('клиентские экшены', () => {

  describe('запрос логина', () => {
    test('ожидание логина', () => {
      const store = setupStore();
      store.dispatch({ type: loginUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('ошибка запроса логина', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: loginUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('логин получен', () => {
      const mockedPayload = {
        accessToken:
          accessToken,
        refreshToken:
          refreshToken,
        user: user
      };
      const store = setupStore();
      store.dispatch({
        type: loginUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('экшен регистрации', () => {
    test('ожидание результата регистрации', () => {
      const store = setupStore();
      store.dispatch({ type: registerUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('ошибка регистрации', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: registerUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('успешная регисрация', () => {
      const mockedPayload = {
        accessToken:
          accessToken,
        refreshToken:
          refreshToken,
        user: user
      };
      const store = setupStore();
      store.dispatch({
        type: registerUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('экшен выхода из профиля', () => {
    test('ожидание запроса на выход', () => {
      const store = setupStore();
      store.dispatch({ type: logoutUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('ошибка выхода', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: logoutUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('успешный выход', () => {
      const mockedPayload = {
        message: 'Successful logout'
      };
      const store = setupStore();
      store.dispatch({
        type: logoutUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('экшен изменения данных клиента', () => {
    test('ожидание при отправке запроса на изменение данных клиента', () => {
      const store = setupStore();
      store.dispatch({ type: updateUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('ошибка запроса на изменение данных клиента', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: updateUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('успешное изменение данных клиента', () => {
      const mockedPayload = {
        user: user
      };
      const store = setupStore();
      store.dispatch({
        type: updateUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('экшен восстановления пароля', () => {
    test('ожидание после запроса восстановления пароля', () => {
      const store = setupStore();
      store.dispatch({ type: forgotPasswordThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('ошибка после запроса восстановления пароля', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: forgotPasswordThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('успех запроса восстановления пароля', () => {
      const mockedPayload = {
        message: 'Reset email sent'
      };
      const store = setupStore();
      store.dispatch({
        type: forgotPasswordThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('экшен изменения пароля', () => {
    test('ожидание после запроса изменения пароля', () => {
      const store = setupStore();
      store.dispatch({ type: resetPasswordThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('ошибка после запроса изменения пароля', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: resetPasswordThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('успех после запроса изменения пароля', () => {
      const mockedPayload = {
        message: 'Password successfully reset'
      };
      const store = setupStore();
      store.dispatch({
        type: resetPasswordThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('экшен запроса данных юзера', () => {
    test('ожидание после запроса данных юзера', () => {
      const store = setupStore();
      store.dispatch({ type: getUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('ошибка после запроса данных юзера', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('успех после запроса данных юзера', () => {
      const mockedPayload = {
        user: user
      };
      const store = setupStore();
      store.dispatch({
        type: getUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });
});
