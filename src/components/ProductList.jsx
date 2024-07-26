import { Product } from "./";

export const ProductList = ({ products, title, description = "", columns = 4 }) => {
  return (
    <div className="pb-8 sm:pb-12">
      <header>
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
        <p className="pt-4 max-w-4xl w-full text-gray-500">{description}</p>
      </header>

      <ul className={`mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-${columns}`}>
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
