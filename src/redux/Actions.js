import {APPLY_DISCOUNTCOUPON} from "./Action-types.js";


export const applyDiscountCoupon = (couponCode) => {
    return {
        type: APPLY_DISCOUNTCOUPON,
        payload: couponCode
    }
}