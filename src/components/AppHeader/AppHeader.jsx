import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import stylesHeader from './AppHeader.module.css';

function AppHeader() {
    return (
        <header className={stylesHeader.header}>
            <nav className={`${stylesHeader.nav} pt-4 pb-4`}>
                <ul className={stylesHeader.headerList}>
                    <li className={stylesHeader.headerItem}>
                        <a className={stylesHeader.headerLink} href='#constructor'>
                            <BurgerIcon type='primery'/>
                            <p className='text text_type_main-default pl-2'>Конструктор</p>
                        </a>
                    </li>
                    <li className={stylesHeader.headerItem}>
                        <a className={stylesHeader.headerLink} href='#orders'>
                            <ListIcon type='secondary'/>
                            <p className='text text_type_main_default text_color_inactive pl-2'>Лента заказов</p>
                        </a>
                    </li>
                    <li className={stylesHeader.headerItem}>
                        <Logo/>
                    </li>
                    <li className={`${stylesHeader.headerItem} pr-5`}>
                        <a className={stylesHeader.headerLink} href='#account'>
                            <ProfileIcon type='secondary'/>
                            <p className='text text_type_main_default text_color_inactive pl-2'>Личный кабинет</p>
                        </a>
                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default AppHeader;