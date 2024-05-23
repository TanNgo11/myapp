import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../models/Role';
import { useShoppingCart } from '../context/ShoppingCartContext';

interface RoleBasedRouteProps {
    children: JSX.Element;
    requiredRole: Role;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ children, requiredRole }) => {
    const { user, role, loading } = useAuth();
    const { cartItems } = useShoppingCart();
    const location = useLocation();



    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    if (role?.includes(requiredRole)) {
        console.log('role ne ba', role?.includes(requiredRole));
        return children;
    } else {
        return <Navigate to="/not-found" replace />;
    }






};

export default RoleBasedRoute;
