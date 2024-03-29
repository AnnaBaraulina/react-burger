import style from "./OrderPageList.module.css";
import OrderPageItem from "../OrderPageItem/OrderPageItem";
import { v4 as uuidv4 } from "uuid";
import { FC } from "react";
import { IIngredient } from "../../services/types/data";

interface IOrderPageList {
  ingredients: Array<IIngredient>;
}

const OrderPageList: FC<IOrderPageList> = ({ ingredients }) => {
  function counter(ingredient: IIngredient) {
    let counter = 0;
    ingredients.forEach((item) => {
      if (item._id === ingredient._id) {
        counter += 1;
      }
    });
    return counter;
  }

  const filteredList = Array.from(new Set(ingredients));

  return (
    <div className={style.container}>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={style.list}>
        {filteredList.map((item) => {
          console.log(filteredList)
          return (
            <OrderPageItem
              key={uuidv4()}
              counter={counter(item)}
              ingredient={item}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default OrderPageList;
