import { User, UserState } from './interfaces/userState';

const initialState: UserState = {
  data: null,
  isLoggedIn: false
};
  
type UserAction = { type: 'SET_USER'; payload: User } | { type: 'LOGOUT' };
  
const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
  case 'SET_USER':
    return {
      ...state,
      data: action.payload,
      isLoggedIn: true,
    };
  case 'LOGOUT':
    return {
      ...state,
      data: null,
      isLoggedIn: false,
    };
  default:
    return state;
  }
};
  
export default userReducer;