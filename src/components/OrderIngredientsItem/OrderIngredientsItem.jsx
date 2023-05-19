import style from './OrderIngredientsItem.module.css';
import cn from 'classnames';

export default function OrderIngredientsItem({
    ingredient,
    index,
    length,
    extraClass,
    showCounter
}) {
    return (
     <li className={cn(style.item, extraClass)} style={{ zIndex: 15 - index}}>
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