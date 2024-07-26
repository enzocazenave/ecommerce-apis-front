import { useState } from "react";
import { ProductList } from "../components";
import { Search } from "../components/Search.jsx";
import { useProducts, useFilteredProducts } from "../hooks";

export const ProductsPage = () => {
  const { products, filtered, handleFilter, resetFilters } = useProducts({});

  const handleSubmit = (e, { name, from, to }) => {
    e.preventDefault();
    handleFilter({ name, from, to });
  };

  return (
    <section>
      <div className="grid grid-cols-[1fr_5fr] gap-16 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Search 
          handleSubmit={handleSubmit} 
          filtered={filtered} 
          resetFilters={resetFilters}
        />
        <div>
          <ProductList
            title={filtered ? "Resultados" : "Productos"}
            products={filtered ? products : products.content}
            columns={3}
          />
        </div>
      </div>
    </section>
  );
};
