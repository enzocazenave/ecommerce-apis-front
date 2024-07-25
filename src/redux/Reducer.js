import {APPLY_DISCOUNTCOUPON} from "./Action-types.js";

const initialState = {
    cart: [],
    discountCoupon: {},
    products: []
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPLY_DISCOUNTCOUPON:
            return state
        default:
            return state
    }
}