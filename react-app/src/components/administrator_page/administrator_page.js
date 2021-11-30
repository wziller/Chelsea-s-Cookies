import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserbyId, getUsers } from "../../store/user";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/product";

import AdminUsersDisplay from "../admin_users/index";
import AdminProductsDisplay from "../admin_products";
import "./administrator_page.css";
import AddMenuItemForm from "../add_menu_item_modal/add_menu_item_form";
import AddMenuItemModal from "../add_menu_item_modal";
import { getCategories } from "../../store/category";
import { getGalleryItems } from "../../store/gallery";
import AdminGalleryDisplay from "../admin_gallery";

const AdministratorPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [filteredUsersList, setFilteredUsersList] = useState(users);

  const menuClick = (e) => {
    e.target.className =
      e.target.className === "hidden_menu" ? "visible_menu" : "hidden_menu";
    // dispatch(getUsers());
  };
  useEffect(() => {}, [dispatch, getUsers, setFilteredUsersList]);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getGalleryItems())
  }, []);
  return (
    <div id="admin_categories">
      <div>
        <div
          id="user_menu_dropdown"
          className="hidden_menu"
          onClick={menuClick}
        >
          <h3>Users</h3>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div>
          <AdminUsersDisplay
            id="users"
            filteredUsersList={filteredUsersList}
            setFilteredUsersList={setFilteredUsersList}
            users={users}
          />
        </div>
      </div>
      {/* <div>
        <div id="orders_dropdown" className="hidden_menu" onClick={menuClick}>
          <h3>Orders</h3>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div></div>
      </div> */}
      <div>
        <div id="products_dropdown" className="hidden_menu" onClick={menuClick}>
          <h3>Products</h3>
          <AddMenuItemModal/>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div>
          <AdminProductsDisplay />
        </div>
      </div>
      <div>
        <div id="gallery_dropdown" className="hidden_menu" onClick={menuClick}>
          <h3>Gallery</h3>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div>
          <AdminGalleryDisplay />
        </div>
        <div></div>
      </div>
      {/* <div> */}
        {/* <div id="banner_dropdown" className="hidden_menu" onClick={menuClick}>
          <h3>Banner</h3>
          <i className="fas fa-chevron-right"></i>
        </div> */}
        {/* <div></div>
      </div> */}
      {/* <div>
        <div id="reviews_dropdown" className="hidden_menu" onClick={menuClick}>
          <h3>Reviews</h3>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div></div>
      </div> */}
    </div>
  );
};

export default AdministratorPage;
