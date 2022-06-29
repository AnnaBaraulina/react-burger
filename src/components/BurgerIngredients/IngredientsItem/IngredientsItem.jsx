import styleIngredients from './IngredientsItem.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsItem(props) {
    return (
        <li className={`${styleIngredients.item} mb-8`}>
            <img src={props.item.image} alt={props.item.name}/>
            <div className={`${styleIngredients.price} mt-2`}>
                <p className='text text_type_digits-default mr-2'>{props.item.price}</p>
                <CurrencyIcon type='primery'/>
            </div>
            <p className={`${styleIngredients.heading} text text_type_main-default mt-2`}>{props.item.name}</p>
            <Counter count={1} size='default'/>

        </li>
    )
}
IngredientsItem.propTypes = {
    item: PropTypes.object.isRequired
}


export default IngredientsItem;
