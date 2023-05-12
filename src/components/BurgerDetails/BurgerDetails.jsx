import style from "./BurgerDetails.module.css";
import useOrder from "../../hooks/useOrder";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderPageList from "../OrderPageList/OrderPageList";

export default function BurgerDetails({ titleClassName }) {
  const orders = useSelector((store) => store.socketReducer.orders);
  const { id } = useParams();
  const order = orders.find((item) => item.id === id);
  

  const { orderIngredienstList, orderPrice, orderStatus, orderDate } =
    useOrder(order);

  return (
    <div
      className={`${style.container} ${
        titleClassName ? undefined : style.container_position_modal
      }`}
    >
      <div className={style.container_title}>
        <p
          className={`text text_type_digits-default mb-10 ${titleClassName}`}
        >{`#${order.number}`}</p>
        <p className="text text_type_main-medium mb-2">{`${order.name}`}</p>
        <p
          className={`text text_type_main-default ${style.color}`}
        >{`${orderStatus}`}</p>
      </div>
      <OrderPageList ingredients={orderIngredienstList} />
      <div className={style.container_date}>
        <p className="text text_type_main-default text_color_inactive">
          {orderDate}
        </p>
        <div className={style.price}>
          <CurrencyIcon type="primary" />
          <p className="text text_type_digits-default">{orderPrice}</p>
        </div>
      </div>
    </div>
  );
}
