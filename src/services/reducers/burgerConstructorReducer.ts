import { TConstructorAction, IConstructorInitialState } from "../types/data";
import { ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENTS, RESET_INGREDIENT } from "../constants/index";

const constructorInitialState: IConstructorInitialState  = {
    constructorBunElement: undefined,
    constructorFillingList: []
};

export default function burgerConstructorReducer(
  state = constructorInitialState,
  action: TConstructorAction
): IConstructorInitialState {
    switch (action.type) {
        case ADD_INGREDIENT:
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    constructorBunElement: action.payload,
                };
            }
            return {
                ...state,
                constructorFillingList: [
                ...state.constructorFillingList,
                { constructorItemId: action.constructorItemId, ...action.payload}
                    
                ],
            }; 

        case DELETE_INGREDIENT:
            return {
                ...state,
        constructorFillingList: state.constructorFillingList.filter(
          (item) => item.constructorItemId !== action.payload.constructorItemId
        ),
            };
        case SORT_INGREDIENTS: 
         return {
            ...state,
            constructorFillingList: action.payload,
         };
        case RESET_INGREDIENT:
            return {
             constructorBunElement: undefined,
             constructorFillingList: [],
            };
         default:{
          return state; }
    }
}