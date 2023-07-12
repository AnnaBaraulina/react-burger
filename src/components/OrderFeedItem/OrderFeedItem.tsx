import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./OrderFeedItem.module.css";
import { Link, useLocation } from "react-router-dom";
import OrderIngredientsList from "../OrderIngredientsList/OrderIngredientsList";
import useOrder from "../../hooks/useOrder";
import cn from "classnames";
import { FC } from "react";
import { IOrder } from "../../services/types/data";


interface IOrderFeedElement {
  isFeedList: boolean;
  order: IOrder;
}

const OrderFeedItem: FC<IOrderFeedElement> = ({ isFeedList, order }) => { //то, что должно открыться по нажатию на один из заказов в списке заказов во вкладке "заказы" в профиле
  const { orderIngredientsList, orderPrice, orderStatus } = useOrder(order);
  const location = useLocation();

  const curOffset = new Date().getTimezoneOffset() / 60;
  const GMT = "i-GTM" + (curOffset > 0 ? "-" + curOffset : "+" + -curOffset);

  return (
    <li className={cn(style.container)}>
      <Link
        className={`text_color_primary ${style.link}`}
        to={isFeedList ? `/profile/orders/${order._id}` : `/feed/${order._id}`}
        state={
          isFeedList
            ? { locationProfile: location }
            : { locationFeed: location }
        }
      >
        
        <div className={style.container__order}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} /> {`${GMT}`}
          </p>
        </div>
        <div className={style.container_burger}>
          <p className="text text_type_main-medium">{order.name}</p>
          {isFeedList && (
            <p
              className={`text text_type_main-default ${
                order.status === "done" ? style.status : undefined
              }`}
            >
              {orderStatus}
            </p>
          )}
        </div>
        <div className={style.container_ingredients}>
          <OrderIngredientsList ingredients={orderIngredientsList} />
          <div className={style.price}>
            <CurrencyIcon type="primary" />
            <p className="text text_type_digits-default">{orderPrice}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default OrderFeedItem;
