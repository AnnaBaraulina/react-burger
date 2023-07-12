import { getIngredients  } from "../../utils/api";
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST } from "../constants";
import { AppDispatch } from "../types";
import { IGetIngredientsRequest, IIngredient, IGetIngredientsSuccess, IGetIngredientsFailed } from "../types/data";


const getIngredientsRequest = (): IGetIngredientsRequest => {
   return {
      type: GET_INGREDIENTS_REQUEST,
   };
}

const getIngredientsSuccess = ( ingredients: Array<IIngredient>): IGetIngredientsSuccess => {
   return {
      type: GET_INGREDIENTS_SUCCESS,
      payload: ingredients,
   };
};

const getIngredientsFailed = ( text: string ): IGetIngredientsFailed => {
   return {
      type: GET_INGREDIENTS_FAILED,
      errorText: text,
   };
};

export function getIngredient() {
   return function (dispatch: AppDispatch) {
     dispatch(getIngredientsRequest());
     getIngredients()
       .then((res) => {
         dispatch(getIngredientsSuccess(res.data));
       })
       .catch((err) => {
         dispatch(getIngredientsFailed(err));
       });
   };
 }



