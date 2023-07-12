import React from 'react';
import IngredientsItem from '../IngredientsItem/IngredientsItem';
import styleIngredientList from './IngredientsList.module.css';
import { IIngredient } from '../../../services/types/data';
import { forwardRef } from "react";

interface IBurgerIngredientsList {
  title: string;
  id: string;
  type: string;
  ingredients: Array<IIngredient>;
}
type ref = HTMLParagraphElement;

const IngredientsList = forwardRef<ref, IBurgerIngredientsList> (
  (props, ref ) =>
{    return (
      <>
      <p ref={ref} id={props.id} className='text text_type_main-medium mt-10 mb-6'>
        {props.title}
      </p>
      <ul className={styleIngredientList.list}>
        {props.ingredients.map((item) => {
            return <IngredientsItem key={item._id} ingredient={item}/> 
        })}
      </ul>
      
      </>


    )}
)




export default IngredientsList;