import { Product } from "./";

export const ProductList = ({ products, title, description = "" }) => {
  console.log(products)
  return (
    <div className="py-8 sm:py-12">
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
