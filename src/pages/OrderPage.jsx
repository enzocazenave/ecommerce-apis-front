import {useParams} from "react-router-dom";
import {ProductOnCartOut} from "../components/ProductOnCartOut";
import {useEffect, useState} from "react";
import backend from "../api/axios.js";
import {useSelector} from "react-redux";

export const OrderPage = () => {
    const discountCoupon = useSelector(state => state.discountCoupon);

    const {id} = useParams();
    const [productByOrder, setProductByOrder] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const purchaseResponse = await backend.get(`purchase_products/purchases_orders/${id}`)
                const purchasedProducts = purchaseResponse.data;

                const productDetailsPromises = purchasedProducts.map(async (purchasedProduct) => {
                    const productDetailsResponse = await backend.get(`/products/${purchasedProduct.productId}`)
                    const productImageResponse = await backend.get(`/products/images/${purchasedProduct.productId}`)
                    return {
                        productDetails: productDetailsResponse.data,
                        productImage: productImageResponse.data.length > 0 ? productImageResponse.data[0].urlImage : null
                    }
                })

                const productDetailsResults = await Promise.all(productDetailsPromises)

                const formattedProducts = purchasedProducts.map((purchasedProduct, index) => {
                    const {productDetails, productImage} = productDetailsResults[index]

                    return {
                        id: productDetails.id,
                        name: productDetails.name,
                        price: purchasedProduct?.price * (100-purchasedProduct.purchaseOrder?.discountCoupon?.percentage)/100,
                        size: productDetails.size,
                        description: productDetails.description,
                        units: purchasedProduct.unit,
                        image: productImage,
                        percentage: purchasedProduct.purchaseOrder?.discountCoupon?.percentage,
                    };
                });
                console.log(formattedProducts)
                setProductByOrder(formattedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [id]);
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header>
                        <h1>Tu Order fue pagada con éxito</h1>
                    </header>

                    <div className="mt-8">
                        <ul className="space-y-4">
                            {productByOrder.map((product) => (
                                <ProductOnCartOut key={product.id} product={product}/>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-between mt-10">
                        <p>Total: ${productByOrder.reduce((total, product) => total + (product.price*product.units), 0)}</p>
                    </div>

                    <p>Gracias por comprar en nuestra tienda! Estarás recibiendo un correo con el tracking de tu
                        pedido.</p>
                </div>
            </div>
        </section>
    );
};