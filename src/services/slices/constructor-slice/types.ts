import { TConstructorIngredient } from "@utils-types";

export interface burgerConstructorState {
    burgerConstructor: {
      bun: TConstructorIngredient | null;
      ingredients: TConstructorIngredient[];
    };
    error: string | null;
  }
