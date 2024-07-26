import {ADD_PRODUCT_TO_CART, APPLY_DISCOUNTCOUPON} from "./Action-types.js";
import backend from "../api/axios.js";

export const applyDiscountCoupon = (couponCode) => {
    return async (dispatch) => {
        console.log("action executed")
        try {
            const response = await backend.get(`${"/discount_coupons/code/"}${couponCode}`)
            console.log(response)
            const data = response.data
            return dispatch({
                type: APPLY_DISCOUNTCOUPON,
                payload: data,
            })
        } catch (error) {
            console.error("Error aplicando cupón:", error);

            alert(error.response.data)
        }
    }
}

export const addProductToCart = (product) => {
    return async (dispatch) => {
        return dispatch({
            type: ADD_PRODUCT_TO_CART,
            payload: product,
        })
    }
}