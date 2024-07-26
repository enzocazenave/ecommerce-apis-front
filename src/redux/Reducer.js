import {ADD_PRODUCT_TO_CART, APPLY_DISCOUNTCOUPON, REMOVE_DISCOUNTCOUPON, LOG_IN, LOG_OUT} from "./Action-types.js";

const initialState = {
    cart: [],
    discountCoupon: {},
    products: [],
    access: false
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPLY_DISCOUNTCOUPON:
            return {
                ...state,
                discountCoupon: action.payload,
            }
        case REMOVE_DISCOUNTCOUPON:
        case LOG_IN:
            return {...state, access: true}
        case LOG_OUT:
            return {...state, access: false}
        case ADD_PRODUCT_TO_CART:
            const currentCart = [...state.cart]
            const isProductInCart = currentCart.findIndex(product => product.id === action.payload.id)
            
            if (isProductInCart !== -1) {
                currentCart[isProductInCart] = {
                    ...currentCart[isProductInCart],
                    units: currentCart[isProductInCart].units + 1
                }
                return { ...state, cart: currentCart }
            }

            return {
                ...currentCart,
                cart: [...state.cart, action.payload]
            }
        default:
            return state
    }
}