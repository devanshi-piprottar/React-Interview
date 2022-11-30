import { CART_ACTIONS } from './CartActions';

const initialState = {
    cartItems: [],
};

export default function cartReducer(state = initialState, action) {
    const { cartItems } = state;
    const { id, quantity } = action?.payload || {};
    const index = cartItems?.findIndex(p => p.id === id);
    const newCartItems = [...cartItems];
    switch (action.type) {
        case CART_ACTIONS.ADD_TO_CART:
            if (index > -1) {
                newCartItems[index].quantity += quantity;
            } else {
                newCartItems.push(action.payload);
            }
            return {
                cartItems: newCartItems
            }
        case CART_ACTIONS.UPDATE_CART:
            if (index > -1) {
                newCartItems[index].quantity = quantity;
            }
            return {
                cartItems: newCartItems
            }
        case CART_ACTIONS.DELETE_FROM_CART:
            if (index > -1) {
                newCartItems.splice(index, 1);
            }
            return {
                cartItems: newCartItems
            }
        default:
            return state;
    }
}
