import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, { getIngredientsThunk } from './ingredientsSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsReducer
    }
  });

describe('экшены работы с ингредиентами', () => {
  describe('экшен получения ингредиентов', () => {
    test('ожидание ингредиентов', () => {
      const store = setupStore();
      store.dispatch({ type: getIngredientsThunk.pending.type });
      const state = store.getState();
      expect(state.ingredients.isLoading).toBeTruthy();
      expect(state.ingredients.error).toBeNull();
    });
    test('ошибка получения ингредиентов', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getIngredientsThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.ingredients.isLoading).toBeFalsy();
      expect(state.ingredients.error).toBe(error);
    });
    test('ингредиенты получены', () => {
      const mockedPayload = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      };
      const store = setupStore();
      store.dispatch({
        type: getIngredientsThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.ingredients.isLoading).toBeFalsy();
      expect(state.ingredients.error).toBeNull();
      expect(state.ingredients.ingredients).toEqual(mockedPayload);
    });
  });
});
