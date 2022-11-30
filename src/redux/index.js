import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import cartReducer from './cart/CartReducer';

const rootReducer = combineReducers({
    cart: cartReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;