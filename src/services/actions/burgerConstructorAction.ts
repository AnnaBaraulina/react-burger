import {
    IIngredient,
    IAddIngredient,
    IDeleteIngredient,
    ISortIngredients,
    IResetIngredient
} from '../types/data';

import { ADD_INGREDIENT,
         DELETE_INGREDIENT,
         RESET_INGREDIENT,
         SORT_INGREDIENTS
} from '../constants/index';

export const addIngredient = (
    ingredientId: string,
    ingredient: IIngredient
  ): IAddIngredient => {
    return {
      type: ADD_INGREDIENT,
      constructorItemId: ingredientId,
      payload: ingredient,
    };
  };

  export const deleteIngredient = (
    ingredient: IIngredient
  ): IDeleteIngredient => {
    return {
      type: DELETE_INGREDIENT,
      payload: ingredient,
    };
  };

  export const sortIngredients = (
    ingredients: Array<IIngredient>
  ): ISortIngredients => {
    return {
      type: SORT_INGREDIENTS,
      payload: ingredients,
    };
  };

  export const resetIngredient = (): IResetIngredient => {
    return {
      type: RESET_INGREDIENT,
    }
  }