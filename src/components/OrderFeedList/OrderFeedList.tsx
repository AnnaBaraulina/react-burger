import style from './OrderFeedList.module.css';
import cn from 'classnames';
import OrderFeedItem from '../OrderFeedItem/OrderFeedItem';
import { v4 as uuidv4 } from 'uuid';
import { FC } from "react";
import { IOrder } from '../../services/types/data';

interface IOrderFeedList {
    isFeedList: boolean;
    orders: Array<IOrder>;
  }

const OrderFeedList: FC<IOrderFeedList> = ({ isFeedList, orders}) => {
    return (
        <ul className={`${style.list} ${isFeedList && style.feed}`}>
         {orders.map((order) => {
            return (
                <OrderFeedItem
                key={uuidv4()}
                isFeedList={isFeedList}
                order={order}
                />
            )
         })}
        </ul>
    )
}

export default OrderFeedList;