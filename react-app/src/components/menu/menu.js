import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrentMenu, getProducts } from "../../store/product";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getProducts());
    await dispatch(getCurrentMenu());
  }, []);

  useEffect(() => {}, [getProducts]);

  const currentMenu = useSelector((state) => {
    return state.products.current_menu;
  });

  const divStyle = (src) => ({
    backgroundImage: "url(" + src + ")",
  });
  return currentMenu ? (
    <div className="products_container">
      {currentMenu.map((product) => (
        <NavLink to={`/individualproduct/${product.id}`}>
          <div className="card">
            <div className="card_content">
              <div className="card_front" style={divStyle(product.image_link)}>
                <p className="card_title">{product.name}</p>
                <p className="card_subtitle"></p>
              </div>
              <div className="card_back">
                <p className="card_body">{product.description}</p>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  ) : (
    <p>Menu is loading....</p>
  );
};

export default Menu;
