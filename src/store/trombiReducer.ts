import { PictureState, TrombiState } from './interfaces/trombiState';

const initialState: TrombiState = {
  files: [],
  loading: false,
  loaded: false,
};
  
type TrombiAction = { type: 'SET_TROMBI'; payload: PictureState[] } | { type: 'LOADED_TROMBI'; payload: PictureState[] } | { type: 'LOADING_TROMBI' };
  
const trombiReducer = (state: TrombiState = initialState, action: TrombiAction): TrombiState => {
  switch (action.type) {
  case 'SET_TROMBI':
    return {
      ...state,
      files: action.payload,
      loading: false,
    };
  case 'LOADING_TROMBI':
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  case 'LOADED_TROMBI':
    return {
      ...state,
      files: action.payload,
      loading: false,
      loaded: true,
    };
  default:
    return state;
  }
};
  
export default trombiReducer;