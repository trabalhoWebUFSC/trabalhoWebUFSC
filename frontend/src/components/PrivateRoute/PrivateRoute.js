import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // verifica se o token existe no local storage
  const token = localStorage.getItem('authToken');
  const location = useLocation();

  if (!token) {
    // se não houver um token redireciona para login
    return <Navigate to="/login" state={{ from: location }} replace />;
    // 'state={{ from: location }}' permite que o user vá para onde queria ir originalmente
  }

  // se estiver logado, mostra a página privada
  return children;
};

export default PrivateRoute;
