import toast from "react-hot-toast";
import {
    ADD_PRODUCT_TO_CART,
    APPLY_DISCOUNTCOUPON,
    REMOVE_DISCOUNTCOUPON,
    UPDATE_CART, REMOVE_PRODUCT_FROM_CART, LOGINTOCHECKOUT, UPDATEISLOGGED, OVERRIDE_CART,UPDATEUSER
} from "./Action-types.js";

const initialState = {
    cart: [],
    discountCoupon: {},
    products: [],
    isLogged: false,
    loginToCheckout: false,
    user: {}
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPLY_DISCOUNTCOUPON:
            console.log(action.payload.availableQuantity)
            if (action.payload.availableQuantity <= 0) {
                toast.error("El cupón ya no está disponble.")
                return { ...state }
            }
            return {
                ...state,
                discountCoupon: action.payload,
            }
        case REMOVE_DISCOUNTCOUPON:
            return {
                ...state,
                discountCoupon: {}
            }
        case OVERRIDE_CART:
            return {
                ...state,
                cart: action.payload
            }
        case UPDATE_CART:
            const productInCartIndex = [...state.cart].findIndex(product => product.id === action.payload.id)

            if (productInCartIndex !== -1) {
                const updatedCart = [...state.cart]

                if (action.payload.units > action.payload.stock) {
                    toast.error("No hay stock de este producto");
                    return { ...state }
                }

                updatedCart[productInCartIndex] = {
                    ...updatedCart[productInCartIndex],
                    units: action.payload.units
                }

                return {...state, cart: updatedCart}
            }

            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case ADD_PRODUCT_TO_CART:
            const currentCart = [...state.cart]
            const isProductInCart = currentCart.findIndex(product => product.id === action.payload.id)

            if (isProductInCart !== -1) {
                const currentUnits = currentCart[isProductInCart].units

                if (currentUnits >= action.payload.stock) {
                    toast.error("No hay stock de este producto");
                    return { ...state }
                }

                toast.success("Producto agregado al carrito");

                currentCart[isProductInCart] = {
                    ...currentCart[isProductInCart],
                    units: currentCart[isProductInCart].units + 1
                }
                return {...state, cart: currentCart}
            }

            if (action.payload.stock <= 0) {
                toast.error("No hay stock de este producto");
                return { ...state }
            }

            toast.success("Producto agregado al carrito");

            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case REMOVE_PRODUCT_FROM_CART:
            const updatedCart = [...state.cart]
            const productIndex = updatedCart.findIndex(cartProduct => cartProduct.id === action.payload)

            if (productIndex !== -1) {
                updatedCart.splice(productIndex, 1)
            }

            return {...state, cart: updatedCart}
        case LOGINTOCHECKOUT:
            return {...state, loginToCheckout: action.payload}
        case UPDATEISLOGGED:
            return {...state, isLogged: action.payload}
        case UPDATEUSER:
            return {...state, user: action.payload}
        default:
            return state
    }
}