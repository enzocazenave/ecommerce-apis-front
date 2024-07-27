export const ProductOnCartOut = ({ product }) => {
  return (
    <li className="flex items-center gap-4 w-full">
      <img
        src={product.image}
        alt={product.name}
        className="size-16 object-cover"
      />

      <div className="flex justify-between items-center flex-1">
        <div>
        <h3 className="text-sm text-gray-900">{product.name}</h3> 
        <p>$ {product.price}</p>
        </div>

        <div className="mt-0.5 space-y-px">
          <div>
            <p className="text-xs">Talle {product.size}</p>
          </div>

            <p className="text-xs">
              {product.units} unidades
            </p>
        </div>
      </div>
    </li>
  );
};
