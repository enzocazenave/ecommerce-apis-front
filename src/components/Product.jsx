import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Product = ({ product }) => {
  const user = useSelector(state => state.user)
  return (
    <li className="overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.image[0].urlImage ?? ""}
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
          {user?.admin ? (
            <Link to={`/products/update/${product.name}`} className="text-gray-500 transition hover:text-gray-500/75">
              Editar
            </Link>
          ) : null}
        </div>
      </div>
    </li>
  );
};