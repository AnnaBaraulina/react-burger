import OrderFeedList from "../../components/OrderFeedList/OrderFeedList";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/socketAction";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import OrderCounters from "../../components/OrderCounters/OrderCounters";
import { WS_URL_ALL } from "../../utils/variables";


export default function FeedPage() {
  
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(
    (store) => store.socketReducer
  ) || { orders: [], total: 0, totalToday: 0 };

  const { doneList, workList } = useMemo(() => {
    if (!orders.length) {
      return { doneList: [], workList: [] };
    }
    return orders.reduce(
      (count, item) => {
        // eslint-disable-next-line default-case
        switch (item.status) {
          case "done":
            count.doneList.push(item.number);
            break;
          case "pending":
            count.workList.push(item.number);
            break;
        }
        return count;
      },
      { doneList: [], workList: [] }
    );
  }, [orders]);

 

  useEffect(() => {
    dispatch(wsConnectionStart(WS_URL_ALL));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  return (
    
      orders && (
        <>
      
      <div className={styles.pageContainer}>
        <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
        <div className={styles.container}>
          <OrderFeedList orders={orders} isFeedList={false}/>
          <OrderCounters doneList={doneList} workList={workList} total={total} totalToday={totalToday}/>
        </div>
      </div>
      </>
      )
   
  );
}
