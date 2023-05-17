import { v4 as uuidv4 } from "uuid";
import style from "./OrderCounters.module.css";

export default function OrderCounters({
  total,
  totalToday,
  doneList,
  workList,
}) {
  return (
    <div className={style.container}>
      <div className={style.container_orders}>
        <div className={style.container_done}>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul className={style.orders}>
            {doneList.map((item) => {
              return (
                <li
                  key={uuidv4()}
                  className={`text text_type_digits-default ${style.order}`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={style.container_inwork}>
          <p className="text text_type_main-medium">В работе:</p>
          <ul className={style.orders}>
            {workList.map((item) => {
              return (
                <li key={uuidv4()} className={`text text_type_digits-default`}>
                  {item}
                </li>
              );
            })}
            
          </ul>
        </div>
      </div>
      <div className={style.container_digit}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`text text_type_digits-large ${style.digit}`}>{total}</p>
      </div>
      <div className={style.container_digit}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${style.digit}`}>
          {totalToday}
        </p>
      </div>
    </div>
  );
}