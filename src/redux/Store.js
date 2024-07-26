import {applyMiddleware, combineReducers, createStore} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import {cartReducer} from "./Reducer.js";

const rootReducer = combineReducers({
    discountCoupon: cartReducer
})
const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

export default Store