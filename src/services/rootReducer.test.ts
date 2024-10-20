import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './store';
import {
    userInitialState
} from './slices/userSlice/userSlice';
import { orderInitialState } from './slices/orderSlice/orderSlice';
import { ingredientsInitialState } from './slices/ingredientsSlice/ingredientsSlice';
import { feedInitialState } from './slices/feedSlice/feedSlice';
import { constructorInitialState } from './slices/constructorSlice/constructorSlice';

describe('rootReducer инициализируется правильно', () => {
  const initialState = {
    user: { ...userInitialState },
    feed: { ...feedInitialState },
    order: { ...orderInitialState },
    ingredients: { ...ingredientsInitialState },
    constructorbg: { ...constructorInitialState }
  };
  test('Тест инициализации корневого редьюсера', () => {
    const action = { type: 'ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});
