import {useState} from "react";


export const ProductOnCart = ({product}) => {
    const [unit, setUni] = useState(1)
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
                        <input type="number" value={unit} min={1} onChange={(event) => setUni(event.target.value)}/>
                    </div>
                </div>
            </li>
    );
};
