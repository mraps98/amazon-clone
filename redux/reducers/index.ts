import cartReducer from './cart';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export type TRootReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;
