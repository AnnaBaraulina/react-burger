import style from "./user-order.module.css";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/socketAction";
import { checkUserAccess } from "../../services/actions/userAction";
import OrderFeedList from "../../components/OrderFeedList/OrderFeedList";
import { useEffect, FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { getSocketUrl } from "../../utils/variables";


 const UserOrder: FC = () => {
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
      Promise.resolve(dispatch(checkUserAccess()))
        .then(() => dispatch(wsConnectionStart(getSocketUrl())))
        .catch(() => dispatch(wsConnectionClose()));
    }
  }, [errorState]);

  return (
    orders && (
      <OrderFeedList
        orders={orders}
        isFeedList={true}
       
      />
    )
  );
}

export default UserOrder;
