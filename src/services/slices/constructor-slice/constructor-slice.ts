import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../../utils/types';
import { v4 as uuidv4 } from 'uuid'; // библиотека формирования рандомного айди
import { burgerConstructorState } from './types';

const initialState: burgerConstructorState = {
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  error: null
};

const ConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  selectors: {
    burgerConstructorSelector: (state) => state.burgerConstructor
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burgerConstructor.bun = action.payload;
        } else {
          state.burgerConstructor.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const array = state.burgerConstructor.ingredients;
      const index = action.payload;
      array.splice(index - 1, 0, array.splice(index, 1)[0]);
    },
    downIngredient: (state, action: PayloadAction<number>) => {
      const array = state.burgerConstructor.ingredients;
      const index = action.payload;
      array.splice(index + 1, 0, array.splice(index, 1)[0]);
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.burgerConstructor.ingredients =
        state.burgerConstructor.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    clearBurgerConstructor: (state) => {
      state.burgerConstructor.bun = null;
      state.burgerConstructor.ingredients = [];
    }
  }
});

export const { burgerConstructorSelector } = ConstructorSlice.selectors;
export const {
  addIngredient,
  upIngredient,
  downIngredient,
  removeIngredient,
  clearBurgerConstructor
} = ConstructorSlice.actions;
export default ConstructorSlice.reducer;
