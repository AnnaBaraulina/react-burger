import stylesOrder from './OrderDetails.module.css';
import complited from '../../images/done.svg';
import { BurgerConstructorContext } from '../../utils/burger-constructor-context';
import { useContext } from 'react';

function OrderDetails({orderNumber}) {
  

   return (
        <>
        <p className={`${stylesOrder.order} text text_type_digits-large mt-30`}>{orderNumber}</p>
        <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
        <img className='mt-15 mb-15' src={complited} alt='иконка подтверждения заказа'/>
        <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
        <p className={`${stylesOrder.text} text text_type_main-default mb-30`}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails;