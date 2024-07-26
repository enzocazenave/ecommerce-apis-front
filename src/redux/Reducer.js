import {
    ADD_PRODUCT_TO_CART,
    APPLY_DISCOUNTCOUPON,
    REMOVE_DISCOUNTCOUPON,
    LOG_IN,
    LOG_OUT,
    UPDATE_CART, REMOVE_PRODUCT_FROM_CART
} from "./Action-types.js";

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
            return {
                ...state,
                discountCoupon: {}
            }
        case UPDATE_CART:
            const productInCartIndex = [...state.cart].findIndex(product => product.id === action.payload.id)

            if (productInCartIndex !== -1) {
                const updatedCart = [...state.cart];
                updatedCart[productInCartIndex] = {
                    ...updatedCart[productInCartIndex],
                    units: action.payload.units
                };

                return {...state, cart: updatedCart};
            }

            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
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
                return {...state, cart: currentCart}
            }

            return {
                ...currentCart,
                cart: [...state.cart, action.payload]
            }
        case REMOVE_PRODUCT_FROM_CART:

            const updatedCart = [...state.cart];
            console.log("Carrito antes de la eliminación:", updatedCart);
            console.log("payload: ", action.payload)

            const productIndex = updatedCart.findIndex(cartProduct => cartProduct.id === action.payload.productId);

            if (productIndex !== -1) {
                updatedCart.splice(productIndex, 1);
                console.log("Carrito después de la eliminación:", updatedCart);
            }

            return { ...state, cart: updatedCart };

        default:
            return state
    }
}