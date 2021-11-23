import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({userStatus, setUserStatus}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    setUserStatus('hidden')
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
