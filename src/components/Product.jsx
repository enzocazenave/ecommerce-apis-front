import { Link } from "react-router-dom";

export const Product = ({ product }) => {
  return (
    <li>
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.image}
          alt={product.name}
          className="h-[350px] w-full object-cover sm:h-[450px]"
        />
      </Link>

      <div className="pt-3 flex justify-between items-center">
        <div>
          <h3>{product.name}</h3>
          <p>
            <span>$ {product.price}</span>
          </p>
        </div>
        <button>
          + Carrito
        </button>
      </div>
    </li>
  );
};