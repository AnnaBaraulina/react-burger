import style from './OrderFeedList.module.css';
import cn from 'classnames';
import OrderFeedItem from '../OrderFeedItem/OrderFeedItem';
import { v4 as uuidv4 } from 'uuid';

export default function OrderFeedList({ listClassName, isFeedList, orders}) {
    return (
        <ul className={cn(style.list, listClassName)}>
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