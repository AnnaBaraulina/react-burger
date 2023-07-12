import { store } from "./store";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TConstructorAction, TUserActions, TIngredientsAction, TCurrentOrderAction, TSocketAction, TCurrentIngredientAction } from './data';


type TApplicationActions =
  | TConstructorAction
  | TIngredientsAction
  | TCurrentIngredientAction
  | TCurrentOrderAction
  | TSocketAction
  | TUserActions;


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;