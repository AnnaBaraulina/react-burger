import style from './OrderIngredientsItem.module.css';
import cn from 'classnames';
import { IIngredient } from '../../services/types/data';
import { FC } from "react";


interface IOrderIngredientsElement {
  ingredient: IIngredient;
  index: number;
  length: number;
  showCounter: boolean;
}

const OrderIngredientsItem: FC<IOrderIngredientsElement> = ({
    ingredient,
    index,
    length,
    showCounter,
}) => {
    return (
     <li className={`${style.item} ${showCounter && style.opacity}`}
     style={{ zIndex: 15 - index }}>
      <img
        className={style.image}
        src={ingredient.image_mobile}
        alt={ingredient.name}
      />
      {showCounter && (
        <p className={`text text_type_main-default ${style.text}`}>{`+${
            length - 6
          }`}</p>
      )}
     </li>
    )
}

export default OrderIngredientsItem;