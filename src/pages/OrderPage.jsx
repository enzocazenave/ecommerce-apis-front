import { useParams } from "react-router-dom";
import { ProductOnCart } from "../components";
import { ProductOnCartOut } from "../components/ProductOnCartOut";

const productsOnCart = [
  {
    id: 1,
    name: "Remera Básica",
    price: 16250,
    size: "XL",
    description: "Gris",
    image:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 2,
    name: "Remera Básica",
    price: 16250,
    size: "XL",
    description: "Gris",
    image:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  }
];

export const OrderPage = () => {
  const { id } = useParams();
  
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header>
            <h1>Tu Order fue pagada con éxito</h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {productsOnCart.map((product) => (
                <ProductOnCartOut key={product.id} product={product} />
              ))}
            </ul>
          </div>

          <div className="flex justify-between mt-10">
            <p>Total: ${productsOnCart.reduce((total, product) => total + product.price, 0)}</p>
          </div>

          <p>Gracias por comprar en nuestra tienda! Estarás recibiendo un correo con el tracking de tu pedido.</p>
        </div>
      </div>
    </section>
  );
};