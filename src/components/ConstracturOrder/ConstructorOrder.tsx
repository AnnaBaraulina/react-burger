import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import { FC } from 'react';
import orderStyles from './ConstructorOrder.module.css';
import Modal  from '../Modal/Modal';
import icon from '../../images/Subtract.svg';
import OrderDetails
 from '../OrderDetails/OrderDetails';
import { resetOrder } from '../../services/actions/currentOrderAction';
 import { makeOrder } from '../../services/actions/currentOrderAction';
import { useNavigate } from 'react-router-dom';
import { resetIngredient } from '../../services/actions/burgerConstructorAction';
import { RootState } from '../../services/types';



interface IBurgerConstructorOrder {
  price: number;
}


const ConstructorOrder: FC<IBurgerConstructorOrder> = ({ price }) => {

   const order = useSelector((store: RootState) => store.currentOrderReducer.order);
   const dispatch = useDispatch();
   const ingredients = useSelector((store: RootState) => store.burgerConstructorReducer);
   const isAuth = useSelector((store: RootState) => store.userReducer.isAuth);
   const navigate = useNavigate();

   const arrayId = ingredients.constructorBunElement
   ? [
       ingredients.constructorBunElement._id,
       ...ingredients.constructorFillingList.map((item) => item._id),
       ingredients.constructorBunElement._id,
     ]
   : [];
    
   function closeModal() {
    dispatch(resetOrder());
    dispatch(resetIngredient());
   }

  function sendOrder() {
    
    isAuth ? dispatch(makeOrder(arrayId)) : navigate('/login');
    
   }
 

   return (
    <>
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
    </>
    )
}

export default ConstructorOrder;
