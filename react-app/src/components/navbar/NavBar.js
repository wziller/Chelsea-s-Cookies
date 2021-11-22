import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Shopping_Cart from "../shopping_cart";
import LoginModal from "../auth/login_modal/index";
import SignUpModal from "../auth/signup_modal/index";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav>
      <ul>
        <li>
          <i className="fas fa-user"></i>
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
        {!user && (
          <li>
            <SignUpModal />
          </li>
        )}
        <li>About the Baker</li>
        <li>Contact</li>
        <li>
          <LogoutButton />
        </li>
        <li>
          <i className="fas fa-shopping-cart"></i>
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
