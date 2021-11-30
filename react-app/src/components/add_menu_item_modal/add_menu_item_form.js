import { useState } from "react";
import { createProduct, getProducts } from "../../store/product";
import { useDispatch, useSelector } from "react-redux";

const AddMenuItemForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState('1');
  const [imageUrl, setImageUrl] = useState("");
  const [itemOnMenu, setItemOnMenu] = useState('false')
  const [errors, setErrors] = useState([]);

  const updateItemName = (e) => {
    setItemName(e.target.value);
  };

  const updateItemDescription = (e) => {
    setItemDescription(e.target.value);
  };

  const updateItemPrice = (e) => {
    setItemPrice(e.target.value);
  };

  const updateCategory = (e) => {
    setItemCategory(e.target.value);
  };

  const updateImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const createMenuItem = (e) => {
    e.preventDefault();
    const newMenuItem = {
      name: itemName,
      description: itemDescription,
      price: itemPrice,
      category:itemCategory,
      image_link: imageUrl,
      on_menu:itemOnMenu
    };
    console.log(newMenuItem.category)
    dispatch(createProduct(newMenuItem));
    dispatch(getProducts());
  };

  return (
    <div>
      <form onSubmit={createMenuItem}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            placeholder="Item Name"
            type="text"
            name="Item Name"
            onChange={updateItemName}
            value={itemName}
          ></input>
        </div>
        <div>
          <input
            placeholder="Item Description"
            type="text"
            name="item description"
            onChange={updateItemDescription}
            value={itemDescription}
          ></input>
        </div>
        <div>
          <input
            placeholder="Item Price"
            type="text"
            name="item price"
            onChange={updateItemPrice}
            value={itemPrice}
          ></input>
        </div>
        <div>
          <select
            type="select"
            name="category_select"
            id="category_select"
            onChange={updateCategory}
          >
            {categories.map((category) => {
              return <option value={category.id} >{category.category_name}</option>;
            })}
          </select>
        </div>
        <div>
          <input
            placeholder="Image URL"
            type="text"
            name="state"
            onChange={updateImageUrl}
            value={imageUrl}
          ></input>
        </div>
        <button type="submit">Add Menu Item</button>
      </form>
    </div>
  );
};

export default AddMenuItemForm;
