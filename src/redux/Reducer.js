import {APPLY_DISCOUNTCOUPON, LOG_IN, LOG_OUT} from "./Action-types.js";

const initialState = {
    cart: [],
    discountCoupon: {},
    products: [],
    access: false
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPLY_DISCOUNTCOUPON:
            console.log(action)
            return {
                ...state,
                discountCoupon: action.payload,
            }
        case LOG_IN:
            return {...state, access: true}
        case LOG_OUT:
            return {...state, access: false}
        default:
            return state
    }
}