import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {  useMemo, FC } from 'react';
import { useDrop } from 'react-dnd';
import stylesConstructor from './BurgerConstractor.module.css';
import ConstructorFillingList from './ConstructorFillingList';
import { useSelector, useDispatch } from '../../services/hooks';
import ConstructorOrder from '../ConstracturOrder/ConstructorOrder';
import { ADD_INGREDIENT, SORT_INGREDIENTS } from '../../services/constants';
import loader from '../../images/loader.svg';
import { Reorder } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '../../services/types/data';


const BurgerConstructor: FC = () => { 
  
 const dispatch = useDispatch();

 const { bun, fillingList } = useSelector((store) => ({
  bun: store.burgerConstructorReducer.constructorBunElement,
  fillingList: store.burgerConstructorReducer.constructorFillingList,
 }))
  


 function dropHandler(ingredient: IIngredient) {
  dispatch({ type: ADD_INGREDIENT, constructorItemId: uuidv4(), payload: ingredient});
 }

 const [{ isHover }, dropTarget] = useDrop({
  accept: 'ingredients',
  drop(ingredient: IIngredient) {
    dropHandler(ingredient);
  },
  collect: (monitor) => ({
    isHover: monitor.isOver(),
  }),
 });

 const bunPrice = useMemo(() => {
  return bun === undefined ? 0 : bun.price * 2;
 }, [bun]);

 const fillingPrice = useMemo(() => {
  return fillingList.reduce((sum, item) => sum + item.price, 0);
 }, [fillingList]);

 const totalPrice = useMemo(() => {
  return bun === undefined ? fillingPrice : bunPrice + fillingPrice;
 }, [bunPrice, bun, fillingPrice])


 return (
    <section className={`${stylesConstructor.section} ml-10 mt-20`}>
      
      <ul
        ref={dropTarget}
        className={isHover ? stylesConstructor.list_hover : stylesConstructor.list}
      >
      <ConstructorElement
        type="top"
        isLocked={true}
        text={bun === undefined ? "Выберите булку" : `${bun.name} (верх)`}
        price={bun === undefined ? 0 : bun.price}
        extraClass="ml-8"
        thumbnail={bun === undefined ? loader : bun.image}
    />
    <Reorder.Group
      axis="y"
      values={fillingList}
      className={stylesConstructor.container}
      onReorder={(sortFillingList) =>
        dispatch({ type: SORT_INGREDIENTS, payload: sortFillingList })
      }
    >
      {fillingList.map((item) => {
        return (
          <ConstructorFillingList
            key={item.constructorItemId}
            filling={item}
            
          /> 
        );
      })}
    </Reorder.Group>
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={bun === undefined ? "Выберите булку" : `${bun.name} (низ)`}
      price={bun === undefined ? 0 : bun.price}
      extraClass="ml-8"
      thumbnail={bun === undefined ? loader : bun.image}
    />
  </ul>
        
   

    
      <ConstructorOrder price={totalPrice}/>

    </section>
  )
}


export default BurgerConstructor;