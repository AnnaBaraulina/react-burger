import { useParams } from "react-router-dom";
import style from "./order-page.module.css";
import { useEffect, FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { getIngredient } from "../../services/actions/burgerIngredientsAction";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/socketAction";
import BurgerDetails from "../../components/BurgerDetails/BurgerDetails";
import { WS_URL_ALL } from "../../utils/variables";
import { getSocketUrl } from "../../utils/variables";

interface IOrderPage {
  isAuth: boolean;
}

 const OrderPage: FC<IOrderPage> = ({ isAuth }) => { // то, что открывается напрямую по роуту, не модальное окно
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredient());
    if (isAuth) {
      dispatch(wsConnectionStart(getSocketUrl()));
    } else {
      dispatch(wsConnectionStart(WS_URL_ALL));
    }
    return () => {
      dispatch(wsConnectionClose());
    };
  }, []);

  const orders = useSelector((store) => store.socketReducer.orders);

  const { id } = useParams();
  const order = orders.find((item) => item._id === id);

  return (
  <> { order && (
      <section className={style.main}>
        <BurgerDetails titleClassName={style.title} />
      </section>
    )} </>
  );
}

export default OrderPage;
