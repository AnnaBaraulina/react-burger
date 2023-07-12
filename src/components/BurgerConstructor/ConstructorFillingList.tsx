import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import fillingListStyle from './ConstructorFillingList.module.css';
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT } from "../../services/constants";
import { Reorder } from 'framer-motion';
import { FC } from 'react';
import { IIngredient } from "../../services/types/data";


interface IConstructorFillingList {
  filling: IIngredient;
}

 const ConstructorFillingList: FC<IConstructorFillingList> = ({ filling }) => {
    const dispatch = useDispatch();

    return (
        <Reorder.Item whileDrag={{ scale: 0.8 }} value={filling} className={fillingListStyle.item}>
        
        <DragIcon type='primary'/>
        <ConstructorElement
        text={filling.name}
        price={filling.price}
        thumbnail={filling.image}
        handleClose={() =>
          dispatch({ type: DELETE_INGREDIENT, payload: filling })
        }
      />
      </Reorder.Item>
    )
}

export default ConstructorFillingList;