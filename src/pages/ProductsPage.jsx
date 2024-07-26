import { useState } from "react";
import { ProductList } from "../components";
import { Search } from "../components/Search.jsx";
import { useProducts, useFilteredProducts } from "../hooks";

export const ProductsPage = () => {
  const { products, loading } = useProducts({});
  const { filteredProducts, fetchFilteredProducts, message: filterMessage, resetFilters } = useFilteredProducts();

  const handleSubmit = (e, { name, from, to }) => {
    e.preventDefault();
    fetchFilteredProducts({ name, from, to });
  };

  return (
    <section>
      <div className="grid grid-cols-[1fr_5fr] gap-16 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Search 
          handleSubmit={handleSubmit} 
          filteredProducts={filteredProducts} 
          message={filterMessage} 
          resetFilters={resetFilters}
        />
        <div>
          <ProductList
            title={filterMessage.length > 0 ? filterMessage : "Productos"}
            products={(filteredProducts.length > 0 || filterMessage.length > 0) ? filteredProducts : products.content}
            columns={3}
          />
        </div>
      </div>
    </section>
  );
};
