import React from 'react';
import stylesIngredients from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import categories from '../../utils/categories';
import IngredientsList from './IngredientsList/IngredientsList';
import PropTypes from 'prop-types';



function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');
    return (
        <section className={stylesIngredients.section}>
          <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
          <div className={stylesIngredients.menu}>  
            <Tab value='one' active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value='two' active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value='three' active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
          </div>
          <ul className={`${stylesIngredients.list} custom-scroll`}>
            {categories.map(category => (
              <IngredientsList key={category.type} category={category}/>
            ))}
          </ul>
        </section>
    )
}
BurgerIngredients.propTypes = {
  category: PropTypes.objectOf(PropTypes.arrayOf(categories.isRequired))
}


export default BurgerIngredients;