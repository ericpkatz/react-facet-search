import axios from 'axios';
const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';

const loadUsersSuccess = (users)=> ({
  type: LOAD_USERS_SUCCESS,
  users: users
});

const loadUsers = ()=> {
  return (dispatch)=> {
    return axios.get('/api/users')
      .then(response => dispatch(loadUsersSuccess(response.data)));
  };
};

const destroyUser = (user)=> {
  return (dispatch)=> {
    return axios.delete(`/api/users/${user.id}`)
      .then(response => dispatch(loadUsers()));
  };
};

const createUser = (user)=> {
  return (dispatch)=> {
    return axios.post(`/api/users`, user)
      .then(response => dispatch(loadUsers()));
  };
};

export {
  loadUsers,
  destroyUser,
  createUser
};

const usersReducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_USERS_SUCCESS:
      state = action.users;
      break;
  }
  return state;
};

export default usersReducer;
