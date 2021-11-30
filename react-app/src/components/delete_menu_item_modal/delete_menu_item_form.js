import "./delete_menu_item_form.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "../../store/product";
import { deleteGalleryItem } from "../../store/gallery";


const DeleteMenuItemForm = ({ product, setShowModal }) => {
  const dispatch = useDispatch();
  
  const deleteCurrentMenuItem = async () => {
    dispatch(deleteProduct(product.id));
    dispatch(getProducts());
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  useEffect(() => {}, []);
  return (
    <div>
      <h2>Are you sure you wish to cancel?</h2>
      <p>
        Deleting menu items is permanent are you sure you want to delete this
        Menu Item?
      </p>
      <div id="button_container">
        <button id="delete_button" onClick={deleteCurrentMenuItem}>
          Delete Menu Item
        </button>
        <button id="cancel_button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteMenuItemForm;
