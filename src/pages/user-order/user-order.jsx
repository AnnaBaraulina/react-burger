import style from "./user-order.module.css";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/socketAction";
import { checkUserAccess } from "../../services/actions/userAction";
import OrderFeedList from "../../components/OrderFeedList/OrderFeedList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocketUrl } from "../../utils/variables";

export default function UserOrder() { //список всех заказов при переходе на вкладку заказы внутри страницы профиля
  const dispatch = useDispatch();
  const { orders, errorState } = useSelector((store) => store.socketReducer);

  useEffect(() => {
    dispatch(wsConnectionStart(getSocketUrl()));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, []);

  useEffect(() => {
    if (errorState) {
      dispatch(wsConnectionClose());
      dispatch(checkUserAccess())
        .then(() => dispatch(wsConnectionStart(getSocketUrl())))
        .catch(() => dispatch(wsConnectionClose()));
    }
  }, [errorState]);

  return (
    orders && (
      <OrderFeedList
        orders={orders}
        isFeedList={true}
        listClassName={style.list}
      />
    )
  );
}
