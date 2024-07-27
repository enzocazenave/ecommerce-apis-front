import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../redux/Actions";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export const ProductPage = () => {
  const state = useSelector((state) => state.cart);
  const { id } = useParams();
  const { products } = useProducts({ id });
  const dispatch = useDispatch()
  
  const currentProduct = products[0];
  const [size, setSize] = useState(null);

  useEffect(() => {
    setSize(currentProduct?.sizes[0]);
  }, [products])

  const handleAddProductToCart = () => {
    dispatch(addProductToCart({ 
      id: size.id,
      name: currentProduct.name, 
      price: currentProduct.price, 
      image: currentProduct.image[0].urlImage, 
      description: currentProduct.description, 
      size: size.size, 
      stock: size.stock,
      units: 1 
    }))
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col gap-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-gray-600">
            <li>
              <Link to="/" className="block transition hover:text-gray-700">
                <span className="sr-only"> Inicio </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </li>

            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li>
              <Link
                to="/products"
                className="block transition hover:text-gray-700"
              >
                {" "}
                Productos{" "}
              </Link>
            </li>

            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li>
              <Link
                to={`/products/${currentProduct?.id}`}
                className="block transition hover:text-gray-700"
              >
                {" "}
                {currentProduct?.name}{" "}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="flex gap-6">
          <div>
            {currentProduct?.image?.map((image) => (
              <img
                key={image.id}
                src={image.urlImage}
                alt=""
                className="h-[350px] w-full object-cover sm:h-[450px] rounded-md hover:opacity-90 transition-opacity"
              />
            ))}
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                {currentProduct?.name} {size?.stock === 0 ? <b className="text-red-600">(Agotado)</b> : ""}
              </h2>

              <p className="mt-4 text-gray-500">
                {currentProduct?.description}
              </p>
            </header>

            <div className={`flex rounded-lg border border-gray-100 bg-gray-100 p-1 w-fit`}>
              {currentProduct?.sizes.map((variant) => (
                <button
                  key={variant?.id}
                  className={`${size?.id === variant.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"} rounded-md flex-1 px-2 py-1 text-xs`}
                  onClick={() => setSize(variant)}
                >
                  {variant?.size}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-2xl">$ {currentProduct?.price}</p>
              <button disabled={size?.stock === 0} onClick={handleAddProductToCart} className="bg-blue-500 text-white px-3 py-2 h-fit text-sm font-medium rounded-full">
                + Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
