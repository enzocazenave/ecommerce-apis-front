import {Input, ProductOnCart} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {applyDiscountCoupon} from "../redux/Actions.js";
import {Form} from "react-router-dom";

const productsOnCart = [
    {
        id: 1,
        name: "Remera Básica",
        price: 16250,
        size: "XL",
        description: "Gris",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
        id: 2,
        name: "Remera Básica",
        price: 16250,
        size: "XL",
        description: "Gris",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    }
];

export const CartPage = () => {
    const discountCoupon = useSelector(state => state.discountCoupon);
    const dispatch = useDispatch();

    console.log(discountCoupon)
    const handlerDiscountCoupon = (event) => {

        event.preventDefault()
        const formData = new FormData(event.target)
        const form = Object.fromEntries(formData.entries())
        console.log(form.DiscountValue)
        dispatch(applyDiscountCoupon(form.DiscountValue))
    }

    const totalPrice = productsOnCart.reduce((total, product) => total + product.price, 0)
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
                            {productsOnCart.map((product) => (
                                <ProductOnCart key={product.id} product={product}/>
                            ))}
                        </ul>
                    </div>

                    <h2 className="text-lg font-bold text-gray-700">
                        Datos de descuento
                    </h2>

                    <form onSubmit={handlerDiscountCoupon} className="flex items-center space-x-4">
                        <div className="flex gap-4 items-end">
                            <Input label="Código de descuento" type="text" placeholder={discountCoupon.code}
                                   name="DiscountValue" disabled={discountCoupon && discountCoupon.percentage}/>
                            <button
                                className="bg-blue-500 text-white px-2 py-1 h-fit text-xs font-medium rounded-full" disabled={discountCoupon && discountCoupon.percentage}>Aplicar
                                descuento
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-between mt-10">
                        {discountCoupon && discountCoupon.percentage ? (
                            <div>
                                <p className="line-through">Total: ${totalPrice}</p>
                                <p>Total con descuento: ${totalPrice - (totalPrice * discountCoupon.percentage / 100)}</p>
                            </div>
                        ) : (
                            <p>Total: ${totalPrice}</p>
                        )}

                        <button
                            className="bg-blue-500 text-white px-3 py-2 h-fit text-sm font-medium rounded-full">Comprar
                            carrito
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
