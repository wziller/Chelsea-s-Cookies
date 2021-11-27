import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserbyId, getUsers } from "../../store/user";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/product";
import AutoComplete from "../Autocomplete/AutoComplete";
import "./admin_users_menu.css";

const ordersClick = (e) => {
  e.target.className =
    e.target.className === "orders_hidden" ? "orders_visible" : "orders_hidden";
};

const AdminUsersMenu = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);
  const [searchedUser, setSearchedUser] = useState(users);
  const [filteredUsersList, setFilteredUsersList] = useState(users)
  const user_names = [];
  users?.forEach((user) => {
    user_names.push(`${user.firstName} ${user.lastName}`);
  });

  console.log(user_names);

  const updateFilteredUsers = (suggestionsList) => {
    if(suggestionsList === []) setFilteredUsersList(users)
    const newList = []
    users.forEach((user)=>{
        if(suggestionsList.includes(`${user.firstName} ${user.lastName}`)) newList.push(user)
        setFilteredUsersList(newList)
    })
  }

  const updateSearchedUser = (acInput) => {
    setSearchedUser(acInput);
  };
  useEffect(() => {}, []);

  useEffect(() => {getUsers()}, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [searchedUser]);

  useEffect(async () => {
    const user = await users?.find(
      (user) => `${user.firstName} ${user.lastName}` === searchedUser
    );
    console.log(user)
    user && dispatch(getUserbyId(user.id));
  }, [searchedUser]);

  return (
    <div id="admin_user_display">
      <AutoComplete
        suggestions={user_names}
        placeholder={"Search Users"}
        setFilteredList={updateFilteredUsers}
        changeStateFunc={updateSearchedUser}
      />
      <div>
        {filteredUsersList?.map((user) => (
          <div key={user.id} id="user_card">
            <div className="user_button_box">
              <button>Edit</button>
              <button>Remove User</button>
            </div>
            <p>User #{user.id}</p>
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <hr></hr>
            <div
              id="orders_dropdown"
              className="orders_hidden"
              onClick={ordersClick}
            >
              <p>Orders:</p>
              <i className="fas fa-chevron-right"></i>
            </div>
            <div>
              {user.orders?.map((order) => (
                <div key={order.id} is="orders_card">
                  <p>Delivery Date: {order.delivery__date}</p>
                  <p>Delivery Address: {order.delivery_address}</p>
                  <p>Status: {order.status}</p>
                  <p>Products Requested: </p>
                  <div>
                    {products &&
                      order.details_id.map((detail, index) => {
                        const product = products?.find(
                          (product) => product.id === detail.product_id
                        );
                        return (
                          <p key={index + "," + product.name}>
                            Order {detail.id}: {product?.name} Quantity:
                            {detail.quantity} Price: ${product?.price} Total: $
                            {detail.quantity * product?.price}
                          </p>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersMenu;
