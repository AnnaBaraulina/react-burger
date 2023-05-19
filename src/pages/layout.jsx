import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader/AppHeader';

export default function Layout() {
    return (
        <>
         <AppHeader/>
         <Outlet/>
        </>
    )
}