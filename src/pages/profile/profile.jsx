import { React, useState } from "react";
import { NavLink, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from './profile.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/cookie";
import { logoutUser, changeUserData } from "../../services/actions/userAction";
import AppHeader from "../../components/AppHeader/AppHeader";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((store) => store.userReducer);
    const [userData, setUserDate] = useState(user);
    const [input, setInput] = useState({name: false, email: false});
    const refreshToken = getCookie('refreshToken');
    const activeStyle = { color: "#f2f2f3",}

    function profileFormSubmit(e) {
      e.preventDefault();
      dispatch(changeUserData(userData));
    }

    function formOnReset() {
        setUserDate({ name: user.name, email: user.email});
    }

    function formOnChange(e) {
       setUserDate({ ...userData, [e.target.name]: e.target.value})
    }

    function checkButton() {
        return JSON.stringify(user) === JSON.stringify(userData);
    }

    return (
        <>
        <AppHeader/>
        <section className={style.section}>
            <div className={style.container}>
            <div className={style.column__nav}>
              <nav className={style.nav}>
                <NavLink
                 to='/profile'
                 className={`text text_type_main-medium text_color_inactive ${style.link}`}
                 style={({ isActive }) => (isActive ? activeStyle : undefined)}
                 end
                 >
                Профиль
                </NavLink>
                <NavLink
                 to='order-page'
                 className={`text text_type_main-medium text_color_inactive ${style.link}`}
                 style={({ isActive }) => (isActive ? activeStyle : undefined)}
                 state={{ order: true }}
                 end
                >
                История заказов
               </NavLink>
               <NavLink
                 onClick={() => dispatch(logoutUser(() => navigate('/login')))}  
                 className={`text text_type_main-medium text_color_inactive ${style.link}`}
               >
               Выход
               </NavLink>
              </nav>
              <p className={`text text_type_main-default ${style.text}`}>В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные
              данные</p>
              </div>
              {location.state ? (
                <Outlet/>
              ) : (
                <form className={style.column__form} onSubmit={profileFormSubmit}>
                <Input
                  icon='EditIcon'
                  placeholder="Имя"
                  name='name'
                  value={userData.name}
                  disabled={!input.name}
                  onChange={formOnChange}
                  onIconClick={() => setInput({ ...input, name: !input.name })}
                />
                <Input
                  icon="EditIcon"
                  name='email'
                  placeholder="Логин"
                  value={userData.email}
                  onChange={formOnChange}
                  disabled={!input.email}
                  onIconClick={() => setInput({...input, email: !input.email})}
                
                />
                <Input
                 icon='EditIcon'
                 placeholder="Пароль"
                 disabled
                 value='******'
                />
                <div className={style.container__buttons}>
                  <Button
                  type='secondary'
                  size='medium'
                  htmlType="button"
                  onClick={formOnReset}
                  disabled={checkButton() ? true : false}
                  >Отмена</Button>
                  <Button
                  type='primary'
                  size='medium'
                  htmlType="submit"
                  disabled={checkButton() ? true : false}
                  >Сохранить</Button>
                </div>
           
                </form>

              )}
            
            

            </div>
        </section>
        </>
    )
};