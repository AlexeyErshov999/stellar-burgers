import { createSlice } from '@reduxjs/toolkit';

import { getIngredientsThunk } from './ingredients-actions';
import { IngredientsState } from './types';

const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    isIngredientsLoadingSelector: (state) => state.isIngredientsLoading
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // процесс загрузки ингредиентов
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      // загрузка отклонена
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message!;
      })
      // загрузка закончена
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { ingredientsSelector, isIngredientsLoadingSelector } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
