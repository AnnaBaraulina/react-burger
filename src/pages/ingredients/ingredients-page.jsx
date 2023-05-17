import style from './ingredients-page.module.css';
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import HomePage from '../main/main';

export default function IngredientsPage() { //элемент бургера из конструктора, который открывается по прямому маршруту
    const ingredients = useSelector((store) => store.burgerIngredientsReducer.burgerIngredientsList);
    const { id } =  useParams();
    const currentIngredient = ingredients.find((item) => item._id === id);
    const location = useLocation();
    
    return location.state?.from === "/" ? (
        <HomePage />
      ) : (
        currentIngredient && (
          <>
            
            <section className={style.section}>
              <div className={style.container}>
                <IngredientDetails
                  ingredient={currentIngredient}
                  titleClassName={style.title}
                  subtitleClassName={style.subtitle}
                />
              </div>
            </section>
          </>
        )
      );
        }