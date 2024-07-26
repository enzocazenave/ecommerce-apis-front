import {useState} from "react";
import {useDispatch} from "react-redux";
import {removeCartProductById, updateCart} from "../redux/Actions.js";


export const ProductOnCart = ({product}) => {
    const [unitOnCart, setUnitOnCart] = useState(product.units);
    const dispatch = useDispatch();

    const updateUnits = (newUnits) => {
        setUnitOnCart(newUnits);

        const updatedProduct = {
            ...product,
            units: newUnits
        };

        dispatch(updateCart(updatedProduct));
    };

    const removeProductOnCart = (productId) => {
        console.log(productId)
        dispatch(removeCartProductById(productId));
    }

    return (

        <li className="flex items-center gap-4">

            <img
                src={product.image}
                alt={product.name}
                className="size-16 rounded object-cover"
            />

            <div>
                <h3 className="text-sm text-gray-900">{product.name}</h3>
                <p>$ {product.price}</p>

                <div className="mt-0.5 space-y-px">
                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">

                        <div>
                            <p>Talle {product.size}</p>
                        </div>

                        <div>
                            <p>Color {product.description}</p>
                        </div>
                    </dl>
                </div>
                <div className="flex flex-1 items-center justify-end gap-2">
                    <input type="number" value={product.units} min={1} max={product.stock} onChange={() => updateUnits(parseInt(event.target.value))}/>
                </div>
                <div>
                    <button className="bg-blue-500 text-white px-2 py-1 h-fit text-xs font-medium rounded-full" onClick={() => removeProductOnCart(product.id)}>Quitar de carrito </button>
                </div>
            </div>
        </li>
    );
};
