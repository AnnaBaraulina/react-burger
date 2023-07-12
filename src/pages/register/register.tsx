import style from './register.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { setRegisterFormValue,  registerUser } from '../../services/actions/userAction';
import { ChangeEvent, FormEvent, FC } from "react";


 const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerForm } = useSelector((store) => store.userReducer);

  function onChangeForm(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setRegisterFormValue(e.target.name, e.target.value));
  }

  function registerFormSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(registerUser(registerForm, () => navigate('/login')));
  }

  return (
    <>
     
      <section className={style.main}>
         <div className={style.container}>
           <p className='text text_type_main-medium mb-6'>Регистрация</p>
           <form className={style.form} onSubmit={registerFormSubmit}>
             <Input
               placeholder='Имя'
               type='text'
               name='name'
               value={registerForm.name}
               onChange={onChangeForm}
               />
             <EmailInput
               value={registerForm.email}
               name='email'
               onChange={onChangeForm}
             />
             <PasswordInput
               value={registerForm.password}
               name='password'
               onChange={onChangeForm}
             />
             <Button
              htmlType='submit' type='primary' size='medium'
            >Зарегистрироваться</Button>
            
            </form>
            <p className='text text_type_main-default'>
              Уже зарегистрированы?
              <Link to='/login' className={style.link}>Войти</Link>  
                </p>   
         </div> 

      </section>
    </>
  );

}

export default RegisterPage;