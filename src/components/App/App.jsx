import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';


function App() {
  return (
    <div className={`${styles.App} custom-scroll`}>
      <AppHeader/>
      <main className={styles.content}>
        <BurgerIngredients/>
        <BurgerConstractor/>
      </main>
     
    </div>

  );
}

export default App;
