import style from './ingredients-page.module.css';
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { useSelector } from '../../services/hooks';
import { useParams, useLocation } from 'react-router-dom';
import HomePage from '../main/main';
import React, { FC } from 'react';



const IngredientsPage: FC = () => { //элемент бургера из конструктора, который открывается по прямому маршруту
    const ingredients = useSelector((store) => store.burgerIngredientsReducer.burgerIngredientsList);
    const { id } =  useParams();
    const location = useLocation();
    const currentIngredient = ingredients.find((item) => item._id === id);
    
    return location.state?.from === "/" ? (
        <HomePage />
      ) : (
        <React.Fragment>
       { currentIngredient && (
          <>
            
            <section className={style.section}>
              <div className={style.container}>
                <IngredientDetails
              
                  titleClassName={style.title}
                  subtitleClassName={style.subtitle}
                />
              </div>
            </section>
          </>
        )}
     </React.Fragment> );
        }

export default IngredientsPage;