import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeCartProductById, updateCart } from "../redux/Actions.js";

export const ProductOnCart = ({ product }) => {
  const [unitOnCart, setUnitOnCart] = useState(product.units);
  const dispatch = useDispatch();

  const updateUnits = (newUnits) => {
    setUnitOnCart(newUnits);

    const updatedProduct = {
      ...product,
      units: newUnits,
    };

    dispatch(updateCart(updatedProduct));
  };

  const removeProductOnCart = (productId) => {
    dispatch(removeCartProductById(productId));
  };

  return (
    <li className="flex items-center gap-4 bg-gray-100 px-2 py-1 rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="size-16 rounded object-cover"
      />

      <div className="flex justify-between items-center flex-1">
        <div className="flex-1">
          <h3 className="text-sm text-gray-900">{product.name}</h3>
          <p>$ {product.price}</p>
        </div>

        <div className="mt-0.5 space-y-px">
          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 flex flex-col gap-1">
            <div>
              <p>Talle {product.size}</p>
            </div>

            <div>
              <p>Color {product.description}</p>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2">
              <input
                onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                type="number"
                value={product.units}
                min={1}
                max={product.stock}
                className="w-full"
                onChange={() => updateUnits(parseInt(event.target.value))}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-2 py-1 h-fit text-xs font-medium rounded-full"
              onClick={() => removeProductOnCart(product.id)}
            >
              Quitar de carrito{" "}
            </button>
          </dl>
        </div>
        <div></div>
      </div>
    </li>
  );
};
