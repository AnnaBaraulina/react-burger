import styles from "./Main.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FC } from "react";

const Main: FC = () => {
  return (
    <div className={`${styles.App} custom-scroll`}>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
      </DndProvider>
    </div>
  );
}

export default Main;
