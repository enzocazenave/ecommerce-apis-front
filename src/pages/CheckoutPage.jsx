import {ProductOnCartOut} from "../components/ProductOnCartOut";
import {ProductOnCart, Input} from "../components";

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
                                <ProductOnCartOut key={product.id} product={product}/>
                            ))}
                        </ul>
                    </div>

                    <form className="mt-8">
                        <h2>Datos personales</h2>

                        <div className="grid grid-cols-2 gap-2 mb-6">
                            <Input label="Email" type="text" placeholder="Ingrese email"/>
                            <Input label="Dirección" type="text" placeholder="Ingrese dirección"/>
                            <Input label="Teléfono" type="text" placeholder="Ingrese teléfono"/>
                        </div>

                        <h2>Datos de pago</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Numero de tarjeta" type="number" placeholder="Ingrese numero de tarjeta"/>
                            <Input label="Codigo de seguridad" type="number" placeholder="Ingrese codigo de seguridad"/>
                            <Input label="Nombre del titular" type="text" placeholder="Ingrese nombre del titular"/>
                            <Input label="Fecha vencimiento" type="date" placeholder="Ingrese codigo de seguridad"/>
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