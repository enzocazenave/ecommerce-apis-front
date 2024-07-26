import {useState} from "react";
import {useDispatch} from "react-redux";
import { updateCart} from "../redux/Actions.js";


export const ProductOnCart = ({product}) => {
    const [productOnCart, setProductOnCart] = useState(product);
    const dispatch = useDispatch();

    const updateUnits = (newUnits) => {
        setProductOnCart(productOnCart => {
            const updatedProduct = {
                ...productOnCart,
                units: newUnits
            };

            dispatch(updateCart(updatedProduct));
            return updatedProduct;
        });
    }

    return (

        <li className="flex items-center gap-4">

            <img
                src={productOnCart.image}
                alt={productOnCart.name}
                className="size-16 rounded object-cover"
            />

            <div>
                <h3 className="text-sm text-gray-900">{productOnCart.name}</h3>
                <p>$ {productOnCart.price}</p>

                <div className="mt-0.5 space-y-px">
                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">

                        <div>
                            <p>Talle {productOnCart.size}</p>
                        </div>

                        <div>
                            <p>Color {productOnCart.description}</p>
                        </div>
                    </dl>
                </div>
                <div className="flex flex-1 items-center justify-end gap-2">
                    <input type="number" value={productOnCart.units} min={1} max={productOnCart.stock} onChange={() => updateUnits(parseInt(event.target.value))}/>
                </div>
            </div>
        </li>
    );
};
