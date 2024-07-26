import { Link } from "react-router-dom";

export const Product = ({ product }) => {
  return (
    <li className="overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.image}
          alt={product.name}
          className="h-[350px] w-full object-cover sm:h-[450px] rounded-md hover:opacity-90 transition-opacity"
        />
      </Link>

      <div className="pt-3 flex justify-between items-center">
        <div>
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">{product.name}</h3>
          <p className="mt-2">
            <span>$ {product.price}</span>
          </p>
        </div>
        <button className="bg-blue-500 text-white px-3 py-2 h-fit text-sm font-medium rounded-full">
          + Carrito
        </button>
      </div>
    </li>
  );
};