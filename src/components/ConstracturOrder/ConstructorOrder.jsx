import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch} from 'react-redux';

import orderStyles from './ConstructorOrder.module.css';
import Modal  from '../Modal/Modal';
import icon from '../../images/Subtract.svg';
import OrderDetails
 from '../OrderDetails/OrderDetails';
 import { RESET_ORDER } from '../../services/actions/currentOrderAction';
 import { makeOrder } from '../../services/actions/currentOrderAction';
import { useNavigate } from 'react-router-dom';



export default function ConstructorOrder({ price }) {



   const order = useSelector((store) => store.currentOrderReducer.order);
   const dispatch = useDispatch();
   const ingredients = useSelector((store) => store.burgerConstructorReducer);
   const isAuth = useSelector((store) => store.userReducer.isAuth);
   const navigate = useNavigate();


    
   function closeModal() {
    dispatch({ type: RESET_ORDER });
   }

  function sendOrder() {
    
    isAuth ? dispatch(makeOrder(ingredients)) : navigate('/login');
    
   }
 

   return (
        <div className={orderStyles.order}>
      <div className={orderStyles.price}>
        <p className="text text_type_digits-medium">
        {price}
        </p>
        <img src={icon} alt="Знак валюты" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={sendOrder} disabled={!ingredients.constructorBunElement}>
        Оформить заказ
      </Button>
      {order && (
        <Modal onCloseModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
    )
}
