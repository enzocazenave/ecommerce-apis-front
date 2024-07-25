import {Input, ProductOnCart} from "../components";

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
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header>
                        <h1>Tu Carrito</h1>
                    </header>

                    <div className="mt-8">
                        <ul className="space-y-4">
                            {productsOnCart.map((product) => (
                                <ProductOnCart key={product.id} product={product}/>
                            ))}
                        </ul>
                    </div>

                    <h2>Datos de descuento</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Codigo de descuento" type="text" placeholder="Ingrese codigo de descuento"/>
                    </div>
                    <button>Aplicar descuento</button>

                    <div className="flex justify-between mt-10">
                        <p>Total: ${productsOnCart.reduce((total, product) => total + product.price, 0)}</p>
                        <button>Comprar carrito</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
