
import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginModal from '../auth/login_modal/index'
import SignUpModal from '../auth/signup_modal/index'
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/menu' exact={true} activeClassName='active'>
            Menu
          </NavLink>
        </li>
        <li>
          <LoginModal/>
        </li>
        <li>
          <SignUpModal/>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
