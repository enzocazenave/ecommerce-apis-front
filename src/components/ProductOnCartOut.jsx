export const ProductOnCartOut = ({ product }) => {
  return (
    <li>
      <img
        src={product.image}
        alt={product.name}
        className="size-16 object-cover"
      />

      <div>
        <h3>{product.name}</h3> 
        <p>$ {product.price}</p>

        <div className="mt-0.5 space-y-px">
          <div>
            <p>Talle {product.size}</p>
          </div>

          <div>
            <p>Color {product.description}</p>
          </div>
        </div>

        <p>
          {product.units} unidades
        </p>

      </div>
    </li>
  );
};
