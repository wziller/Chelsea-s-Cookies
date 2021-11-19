
const LOAD = "users/LOAD";
const LOAD_ONE = "users/LOAD_ONE"
const ADD_ONE = "users/ADD_ONE";

const load = (users) => ({
    type: LOAD,
    users,
});

const addOneUser = (payload) => ({
  type: ADD_ONE,
  payload,
});

export const getUsers = () => async (dispatch) => {
    const response = await fetch('/api/users/')
    if (response.ok) {
      const allReviewsList = await response.json();
      dispatch(load(allReviewsList));
    }
  }

export const getUserbyId = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`);
  if (response.ok) {
    const allUsersList = await response.json();

    dispatch(load(allUsersList));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/delete/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedUser = await response.json();
    return deletedUser;
  }
};

export const editUser = (updatedUser) => async (dispatch) => {

  const user_id = updatedUser.id;
  const response = await fetch(`/api/reviews/edit/${user_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  if (response.ok) {
    const newUser = await response.json();
    dispatch(addOneUser(newUser));
    return newUser
  }
};

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
       const users = action.users['users']
      return {...state, users }
    }
    case LOAD_ONE: {
    }
    default:
      return state;
  }
};
export default usersReducer;
