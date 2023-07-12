import styleIngredients from "./IngredientsItem.module.css";
import { useMemo, FC } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../../services/types/data";
import { useDispatch, useSelector } from "../../../services/hooks";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


interface IIngredientsItem {
  ingredient: IIngredient
}

const IngredientsItem: FC<IIngredientsItem> = ({ ingredient }) => {
  //ингредиент из конструктора
 
  const location = useLocation();
  const dispatch = useDispatch();
  const constructorIngredients = useSelector(
    (store) => store.burgerConstructorReducer
  );
  const burgerIngredients = useSelector(
    (store) => store.burgerIngredientsReducer
  );

 {/* function openModal() {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: ingredient });
  }*/}

 

  interface ICounters {
    [counters: string]: number;
  }

  const [, dragRef, dragPreviewRef] = useDrag({
    type: "ingredients",
    item: ingredient,
  });

  const counter = useMemo(() => {
    const counters: ICounters = {};
    burgerIngredients.burgerIngredientsList.forEach((ingredient) => {
      counters[ingredient._id] =
        constructorIngredients.constructorFillingList.filter(
          (constructorItem) => constructorItem._id === ingredient._id
        ).length;
    });
    if (constructorIngredients.constructorBunElement) {
      counters[constructorIngredients.constructorBunElement._id] = 2;
    }
    return counters;
  }, [constructorIngredients, burgerIngredients]);

  const getIngredientCounter = (ingredientId: string) => counter[ingredientId];

  return (
    <li
      ref={dragRef}
      className={`${styleIngredients.item} mb-8`}
  
    >
      {getIngredientCounter(ingredient._id) !== 0 && (
        <Counter count={getIngredientCounter(ingredient._id)} size="default" />
      )}
      <Link
        to={`/ingredients/${ingredient._id}`}
        className={`text_color_primary ${styleIngredients.link}`}
        state={{ locationIngredient: location }} // background: location
      >
        <img
          ref={dragPreviewRef}
          className={styleIngredients.img}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${styleIngredients.price} mt-2`}>
          <p className="text text_type_digits-default mr-2">
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={`${styleIngredients.heading} text text_type_main-default mt-2`}
        >
          {ingredient.name}
        </p>
      </Link>
    </li>
  );
}


export default IngredientsItem;
