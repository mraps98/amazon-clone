import { TRootReduxState } from '..';
import { ACTION_TYPE } from '../../actions/cart';
import { IProduct } from '../../../interfaces';

export interface ICartReducerCartItem {
  product: IProduct;
  count: number;
}

interface ICartReducerState {
  items: Array<ICartReducerCartItem>;
}

const INITIAL_STATE: ICartReducerState = {
  items: [],
};

const cartReducer = (state: ICartReducerState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TO_CART: {
      let shadowState: ICartReducerState = JSON.parse(JSON.stringify(state));
      console.log(shadowState);
      let currentlyExistingProduct = shadowState.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (!currentlyExistingProduct) {
        shadowState.items.push({ product: action.payload, count: 1 });
      } else {
        currentlyExistingProduct.count++;
      }
      console.log(shadowState);

      return shadowState;
    }
    case ACTION_TYPE.REMOVE_FROM_CART: {
      const shadowState: ICartReducerState = JSON.parse(JSON.stringify(state));

      const existingItem = shadowState.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (!!existingItem && existingItem.count > 0) {
        existingItem.count--;
      }

      return shadowState;
    }
    default:
      return state;
  }
};

export default cartReducer;

export const selectItems = (state: TRootReduxState) => state.cart.items;

export const selectNumberOfItems = (state: TRootReduxState) =>
  state.cart.items.reduce((sum, nextItem) => sum + nextItem.count, 0);

export const selectTotal = (state: TRootReduxState) =>
  state.cart.items.reduce(
    (sum, nextItem) => sum + nextItem.product.price * nextItem.count,
    0
  );
