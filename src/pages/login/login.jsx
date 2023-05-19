import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { setLoginFormValue, loginUser } from '../../services/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';


export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginForm } = useSelector((store) => store.userReducer);
  
  
  function changeForm(e) {
    dispatch(setLoginFormValue(e.target.name, e.target.value));
    
  }


  function loginFormSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(loginForm, () => navigate('/')));

    
  }
    return (
      <>
     
      <section className={styles.section}>
        <div className={styles.container}>
            <p className='text text_type_main-medium mb-6'>Вход</p>
            <form className={styles.form} onSubmit={loginFormSubmit}>
              <EmailInput
                value={loginForm.email}
                name='email'
                onChange={changeForm}
                autoComplete='email'
              />
              <PasswordInput
                value={loginForm.password}
                name='password'
                onChange={changeForm}
                autoComplete='current-password'
              />
              <Button htmlType='submit' type='primary' size='medium'>Войти</Button>  
            </form>
            <div className={styles.links}>
                <p className='text text_type_main-default'>
                    Вы - новый пользователь?
                    <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
                </p>
                <p className='text text_type_main-default'>
                    Забыли пароль?
                    <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
                </p>
            </div>
        </div>

      </section>
      </>
    )
}