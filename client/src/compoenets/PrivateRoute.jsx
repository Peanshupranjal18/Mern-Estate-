import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    // current user
    const { currentUser } = useSelector((state) => state.user);
    // current userh h to outlet otherwise to the sign in page
    return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}