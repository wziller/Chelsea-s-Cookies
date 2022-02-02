import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserbyId, getUsers } from "../../store/user";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/product";
import { getOrders } from "../../store/order";

import { useHistory } from "react-router-dom";

import AdminUsersDisplay from "../admin_users/index";
import AdminProductsDisplay from "../admin_products";
import "./administrator_page.css";
import AddMenuItemForm from "../add_menu_item_modal/add_menu_item_form";
import AddMenuItemModal from "../add_menu_item_modal";
import { getCategories } from "../../store/category";
import { getGalleryItems } from "../../store/gallery";
import AdminGalleryDisplay from "../admin_gallery";
import AdminOrdersDisplay from "../admin_orders";

const AdministratorPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const user = useSelector((state) => state.session.user);
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [filteredUsersList, setFilteredUsersList] = useState(users);
  const [currentView, setCurrentView] = useState("");
  const history = useHistory();
  if (!user.administrator) history.push("/");

  const menuClick = (e) => {

    setCurrentView(e.currentTarget.getAttribute("category"));

  };

  useEffect(() => {}, [dispatch, getUsers, setFilteredUsersList,setCurrentView]);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getGalleryItems());
    dispatch(getOrders());
  }, []);

  const renderSwitch = (view) =>{
    {switch (view){
      case 'users':
        return(
          <AdminUsersDisplay
          id="users"
          filteredUsersList={filteredUsersList}
          setFilteredUsersList={setFilteredUsersList}
          users={users}
        />
        )
      case 'orders':
        return(
          <AdminOrdersDisplay />
        )
      case 'products':
        return(
          <AdminProductsDisplay />
        )
      case 'products':
      return(
        <AdminProductsDisplay />
      )
      case 'gallery':
        return(
          <AdminGalleryDisplay />
        )
      default:
        return(
          <div></div>
        )
    }}
  }
  return (
    <div id="admin_view">
      <div id="admin_categories">
        <div>
          <div
            id="user_menu_dropdown"
            className="hidden_menu"
            onClick={menuClick}
            category="users"
          >
            <h3>Users</h3>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div>
          </div>
        </div>
        <div>
          <div id="orders_dropdown" className="hidden_menu" category='orders' onClick={menuClick}>
            <h3>Orders</h3>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div>
          </div>
        </div>
        <div>
          <div
            id="products_dropdown"
            className="hidden_menu"
            onClick={menuClick}
            category='products'
          >
            <h3>Products</h3>
            <AddMenuItemModal />
            <i className="fas fa-chevron-right"></i>
          </div>
          <div>
          </div>
        </div>
        <div>
          <div
            id="gallery_dropdown"
            className="hidden_menu"
            category="gallery"
            onClick={menuClick}
          >
            <h3>Gallery</h3>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div>
          </div>
          <div></div>
        </div>
        <div>
          <div id="banner_dropdown" className="hidden_menu" onClick={menuClick}>
            <h3>Banner</h3>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div></div>
        </div>
        <div>
          <div
            id="reviews_dropdown"
            className="hidden_menu"
            onClick={menuClick}
            category="reviews"
          >
            <h3>Reviews</h3>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div></div>
        </div>
      </div>
      <div>
        {renderSwitch(currentView)}
      </div>
    </div>
  );
};

export default AdministratorPage;
