import stylesIngredinentDetails from "./IngredientDetails.module.css";
import { useSelector } from "../../services/hooks";
import cn from "classnames";
import { useParams } from "react-router-dom";
import React, { FC } from "react";


interface IIngredientDetails {
  titleClassName?: string;
  subtitleClassName?: string;
}

const IngredientDetails: FC<IIngredientDetails> = ({ titleClassName, subtitleClassName }) => {
  //детали бургера 
  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.burgerIngredientsList
  );

  const { id } = useParams();

  const ingredient = ingredients.find((item) => item._id === id);

  return (
    <React.Fragment>
    { ingredient && (
      <>
        <p
          className={`${cn(
            stylesIngredinentDetails.title,
            titleClassName
          )} text text_type_main-large`}
        >
          Детали ингредиента
        </p>
        <img
          className={stylesIngredinentDetails.image}
          src={ingredient?.image_large}
          alt={ingredient?.name}
        />
        <p
          className={`${cn(
            stylesIngredinentDetails.paragraph,
            subtitleClassName
          )} text text_type_main-medium`}
        >
          {ingredient?.name}
        </p>
        <ul className={stylesIngredinentDetails.container}>
          <li className={stylesIngredinentDetails.item}>
            <p className="text text_type_main-default">Калории, ккал</p>
            <p className="text text_type_digits-default mt-2">
              {ingredient?.calories}
            </p>
          </li>
          <li className={stylesIngredinentDetails.item}>
            <p className="text text_type_main-default">Белки, г</p>
            <p className="text text_type_digits-default mt-2">
              {ingredient?.proteins}
            </p>
          </li>
          <li className={stylesIngredinentDetails.item}>
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_digits-default mt-2">
              {ingredient?.fat}
            </p>
          </li>
          <li className={stylesIngredinentDetails.item}>
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default mt-2">
              {ingredient?.carbohydrates}
            </p>
          </li>
        </ul>
      </>
    )
           } </React.Fragment>);
}

export default IngredientDetails;

