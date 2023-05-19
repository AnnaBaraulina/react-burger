import stylesIngredinentDetails from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";
import cn from "classnames";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';

function IngredientDetails({ titleClassName, subtitleClassName }) {
  //детали бургера 
  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.burgerIngredientsList
  );

  const { id } = useParams();

  const ingredient = ingredients.find((item) => item._id === id);

  return (
    ingredient && (
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
          src={ingredient.image_large}
          alt={ingredient.name}
        />
        <p
          className={`${cn(
            stylesIngredinentDetails.paragraph,
            subtitleClassName
          )} text text_type_main-medium`}
        >
          {ingredient.name}
        </p>
        <ul className={stylesIngredinentDetails.container}>
          <li className={stylesIngredinentDetails.item}>
            <p className="text text_type_main-default">Калории, ккал</p>
            <p className="text text_type_digits-default mt-2">
              {ingredient.calories}
            </p>
          </li>
          <li className={stylesIngredinentDetails.item}>
            <p className="text text_type_main-default">Белки, г</p>
            <p className="text text_type_digits-default mt-2">
              {ingredient.proteins}
            </p>
          </li>
          <li className={stylesIngredinentDetails.item}>
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_digits-default mt-2">
              {ingredient.fat}
            </p>
          </li>
          <li className={stylesIngredinentDetails.item}>
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default mt-2">
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </>
    )
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  titleClassName: PropTypes.string,
  subtitleClassName: PropTypes.string,
};
