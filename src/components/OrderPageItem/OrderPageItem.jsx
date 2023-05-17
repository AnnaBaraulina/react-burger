import style from "./OrderPageItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderPageItem({ingredient, counter}) {
  return (
    <li className={style.container}>
      <div className={style.container_item}>
        <div className={style.container_image}>
          <img
            className={style.image}
            src={ingredient.image_mobile}
            alt={ingredient.name}
          />
        </div>
        <p className={`text text_type_main-default ${style.text}`}>
          {ingredient.name}
        </p>
      </div>
      <div className={style.container_counter}>
        <p className="text text_type_digits-default">{`${counter} x ${ingredient.price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  );
}
