import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import stylesHeader from './AppHeader.module.css';
import { NavLink, useLocation } from 'react-router-dom';

function AppHeader() {
    const activeStyle = {
        color: "#f2f2f3",
    }
    const { pathname } = useLocation();

    const toggleStyleIcon = useCallback(
        (url) => {
            if(pathname === '/' && url === '/') {
                return 'primary';
            } else {
                return 'secondary';
            }
        },
    [pathname]
    );

    return (
        <header className={stylesHeader.header}>
            <nav className={`${stylesHeader.nav} pt-4 pb-4`}>
             <div className={stylesHeader.container}>   
             <NavLink 
               to='/'
               style={({ isActive }) => (isActive ? activeStyle : undefined)}
               className={`text text_type_main-default ${stylesHeader.button}`}>
               <BurgerIcon type={toggleStyleIcon('/')}/>
               Конструктор
               </NavLink>
               <NavLink
               to='/feed'
               style={({ isActive }) => (isActive ? activeStyle : undefined)}
               className={`text text_type_main-default ${stylesHeader.button}`}
               >
               <ListIcon type={toggleStyleIcon('/order_list')}/>
               Лента заказов
               </NavLink>
               </div>
               <div className={stylesHeader.logo}>
                <Logo/>
               </div>
               <NavLink
               to='/profile'
               style={({ isActive }) => (isActive ? activeStyle : undefined)}
               className={`text text_type_main-default ${stylesHeader.button} ${stylesHeader.profile_button} `}>
               <ProfileIcon type={toggleStyleIcon('/profile')}/>
               Личный кабинет
               </NavLink>
            </nav>

        </header>
    )
}

export default AppHeader;