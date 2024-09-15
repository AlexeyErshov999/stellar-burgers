import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import {
  isAuthCheckedSelector,
  loginUserRequestSelector
} from '../../services/slices/user-slice/user-slice';

import { ProtectedRouteProps } from './types';

export const ProtectedRoute = ({
  onlyUnauth,
  children
}: ProtectedRouteProps) => {
  // берем нужные поля из слайса юзера
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const loginUserRequest = useSelector(loginUserRequestSelector);
  const location = useLocation();

  // прелоадер
  if (!isAuthChecked && loginUserRequest) return <Preloader />;

  // случай, если неавторизованному юзеру нужно авторизоваться
  if (!onlyUnauth && !isAuthChecked)
    return <Navigate replace to='/login' state={{ from: location }} />;

  // пользователь авторизован, переводим на нужную страницу
  if (onlyUnauth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} state={location} />;
  }

  return children;
};
