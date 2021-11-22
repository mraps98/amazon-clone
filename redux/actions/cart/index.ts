import { IProduct } from '../../../interfaces';

export const ACTION_TYPE = {
  ADD_TO_CART: 'CART_ADD_TO_CART',
  REMOVE_FROM_CART: 'CART_REMOVE_FROM_CART',
};

export const addToCart = (newItem: IProduct) => ({
  type: ACTION_TYPE.ADD_TO_CART,
  payload: newItem,
});

export const removeFromCart = (itemToRemove: IProduct) => ({
  type: ACTION_TYPE.REMOVE_FROM_CART,
  payload: itemToRemove,
});
