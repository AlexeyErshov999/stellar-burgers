import { TIngredient } from "@utils-types";

export interface IngredientsState {
    ingredients: TIngredient[];
    isIngredientsLoading: boolean;
    error: string | null;
  }
