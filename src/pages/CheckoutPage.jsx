import { ProductOnCart } from "../components";

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

export const CheckoutPage = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header>
            <h1>Confirma tu pedido</h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {productsOnCart.map((product) => (
                <ProductOnCart key={product.id} product={product} />
              ))}
            </ul>
          </div>
          
          <form className="mt-8">
            <p>Datos personales</p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="flex flex-col">
                <label>Email</label>
                <input type="text" placeholder="Ingrese email" />
              </div>

              <div className="flex flex-col">
                <label>Dirección</label>
                <input type="text" placeholder="Ingrese dirección" />
              </div>
              <div className="flex flex-col">
                <label>Teléfono</label>
                <input type="text" placeholder="Ingrese teléfono" />
              </div>
            </div>
 
            <p>Datos de pago</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label>Numero de tarjeta</label>
                <input type="number" placeholder="Ingrese numero de tarjeta" />
              </div>

              <div className="flex flex-col">
                <label>Codigo de seguridad</label>
                <input type="number" placeholder="Ingrese codigo de seguridad" />
              </div>

              <div className="flex flex-col">
                <label>Nombre del titular</label>
                <input type="text" placeholder="Ingrese nombre del titular" />
              </div>

              <div className="flex flex-col">
                <label>Fecha vencimiento</label>
                <input type="date" placeholder="Ingrese codigo de seguridad" />
              </div>
            </div>
          </form>

          <div className="flex justify-between mt-10">
            <p>Total: ${productsOnCart.reduce((total, product) => total + product.price, 0)}</p>
            <button>Confirmar pedido</button>
          </div>
        </div>
      </div>
    </section>
  )
}