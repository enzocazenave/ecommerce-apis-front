import {Input, ProductOnCart} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {applyDiscountCoupon, updateLoginToCheckout, removeDiscountCoupon} from "../redux/Actions.js";
import {useNavigate} from "react-router-dom";

export const CartPage = () => {

    const discountCoupon = useSelector(state => state.discountCoupon);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isLogged = useSelector(state => state.isLogged);

    const handlerDiscountCoupon = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const form = Object.fromEntries(formData.entries())
        dispatch(applyDiscountCoupon(form.DiscountValue))
    }

    const cleanUpDiscountCoupon = () => {
        event.preventDefault()
        dispatch(removeDiscountCoupon())
    }

    const BuyLogic = () => {
        if (isLogged) {
            navigate('/cart/checkout')
        } else {
            dispatch(updateLoginToCheckout(true))
            navigate('/login')
        }
    }

    const totalPrice = cart.reduce((total, product) => total + (product.price * product.units), 0)
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header>
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                            Tu Carrito
                        </h1>
                    </header>

                    <div className="mt-8">
                        <ul className="space-y-4">
                            {cart.map((product) => (
                                <ProductOnCart key={product.id} product={product}/>
                            ))}
                        </ul>
                    </div>

                    <h2 className="text-lg font-bold text-gray-700">
                        Datos de descuento
                    </h2>

                    <form onSubmit={handlerDiscountCoupon} className="flex items-center space-x-4">
                        <div className="flex gap-4 items-end">
                            <Input label="Código de descuento" type="text"
                                   placeholder={discountCoupon ? discountCoupon.code : ""}
                                   name="DiscountValue" disabled={discountCoupon && discountCoupon.percentage}/>

                            {discountCoupon && discountCoupon.code ? (
                                <>
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 h-fit text-xs font-medium rounded-full"
                                        onClick={cleanUpDiscountCoupon}>Quitar cupón
                                    </button>
                                    <p>
                                        -{discountCoupon.percentage}%
                                    </p>
                                </>
                            ) : (
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 h-fit text-xs font-medium rounded-full">Aplicar
                                    descuento
                                </button>

                            )}

                        </div>
                    </form>

                    <div className="flex justify-between mt-10">
                        {discountCoupon && discountCoupon.percentage ? (
                            <div>
                                <p className="line-through">Total: ${totalPrice}</p>
                                <p>Total con descuento:
                                    ${totalPrice - (totalPrice * discountCoupon.percentage / 100)}</p>
                            </div>
                        ) : (
                            <p>Total: ${totalPrice}</p>
                        )}

                        <button
                            className="bg-blue-500 text-white px-3 py-2 h-fit text-sm font-medium rounded-full"
                            disabled={cart.length === 0}
                            onClick={() => BuyLogic()}>Comprar
                            carrito
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
