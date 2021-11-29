import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Shopping_Cart from "../shopping_cart";
import LoginModal from "../auth/login_modal/index";
import SignUpModal from "../auth/signup_modal/index";
import LogoutButton from "../auth/LogoutButton";
import { HashLink as Link } from 'react-router-hash-link';
import "./NavBar.css";

const NavBar = ({cartStatus, setCartStatus, userStatus, setUserStatus}) => {


  const user = useSelector((state) => state.session.user);

  const cartOnClick = () => {
    setCartStatus(cartStatus === 'hidden' ? 'visible' : 'hidden')
  }

  const userOnClick = () => {
    setUserStatus(userStatus === 'hidden' ? 'visible' : 'hidden')
  }

  return (
    <nav>
      <ul>
        <li>
          {user && <i className="fas fa-user" onClick= {userOnClick}></i>}
        </li>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" exact={true} activeClassName="active">
            Menu
          </NavLink>
        </li>
        {!user && (
          <li>
            <LoginModal />
          </li>
        )}
        {console.log(user)}
        {!user && (
          <li>
            <SignUpModal />
          </li>
        )}
        {user?.administrator === true && (
          <li>
            <NavLink to="/administrator" exact={true} activeClassName="active">
              Administrator
            </NavLink>
          </li>
        )}
        <li><Link to="/#bio_container" activeClassName="active">
            About The Baker
          </Link></li>
        <li>Contact</li>
        <li>
          <i className="fas fa-shopping-cart" onClick={cartOnClick}></i>
          <div id="cart_count_background">
            <p id="cart_count">
              {
                Object.keys(JSON.parse(localStorage.getItem("currentCart")))
                  .length
              }
            </p>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
