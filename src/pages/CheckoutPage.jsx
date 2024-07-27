import { ProductOnCartOut } from "../components/ProductOnCartOut";
import { Input } from "../components";
import {useDispatch, useSelector} from "react-redux";
import backend from "../api/axios";
import {overrideCart} from "../redux/Actions.js";

export const CheckoutPage = () => {
  const discountCoupon = useSelector((state) => state.discountCoupon);
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.reduce((total, product) => total + product.price * product.units, 0);
  const totalDiscount = totalPrice - (totalPrice * discountCoupon?.percentage) / 100;
  const dispatch = useDispatch()

  const handleConfirmOrder = async () => {
    const data = {
        userId: 1,
        purchasedProductRequests: cart.map((product) => {
            return {
                productId: product.id,
                units: product.units
            }
        }),
    }

    if (discountCoupon && discountCoupon?.percentage) {
        data.discountCode = discountCoupon.code
    }

    backend.post("/purchase_orders", data).then((response) => {
        console.log(response)
    });

    dispatch(overrideCart([]))
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header>
            <h1>Confirma tu pedido</h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart.map((product) => (
                <ProductOnCartOut key={product.id} product={product} />
              ))}
            </ul>
          </div>

          <form className="mt-8">
            <h2 className="mb-4 font-semibold">Datos personales</h2>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <Input label="Email" type="text" placeholder="Ingrese email" />
              <Input
                label="Dirección"
                type="text"
                placeholder="Ingrese dirección"
              />
              <Input
                label="Teléfono"
                type="text"
                placeholder="Ingrese teléfono"
              />
            </div>

            <h2 className="mb-2 font-semibold">Datos de pago</h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Numero de tarjeta"
                type="number"
                placeholder="Ingrese numero de tarjeta"
              />
              <Input
                label="Codigo de seguridad"
                type="number"
                placeholder="Ingrese codigo de seguridad"
              />
              <Input
                label="Nombre del titular"
                type="text"
                placeholder="Ingrese nombre del titular"
              />
              <Input
                label="Fecha vencimiento"
                type="date"
                placeholder="Ingrese codigo de seguridad"
              />
            </div>
          </form>

          <div className="flex justify-between mt-10">
            {discountCoupon && discountCoupon?.percentage ? (
              <div>
                <p className="line-through">Total: ${totalPrice}</p>
                <p>
                  Total con descuento: $
                  {totalDiscount}
                </p>
              </div>
            ) : (
              <p>Total: ${totalPrice}</p>
            )}

            <button
                onClick={handleConfirmOrder}
                className="bg-blue-500 text-white px-3 py-2 h-fit text-sm font-medium rounded-full"
            >
              Confirmar pedido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
