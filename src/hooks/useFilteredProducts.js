import backend from "../api/axios";
import { useState } from "react";
import { productResponseFormatter } from "../helpers";

export const useFilteredProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchFilteredProducts = async ({ name, from, to }) => {
    try {
        const response = await backend.get(
            name === ""
              ? `/products/productsByPrice?priceMin=${from}&priceMax=${to}`
              : `/products/search/${name}`
        );
        
        if (response.data.length === 0) {
            return setMessage("La busqueda o filtrado no tuvo resultados"); 
        } 

        setMessage("Resultados");
        setFilteredProducts(productResponseFormatter(response.data, true));

    } catch(error) {
        console.log(error);
    }
  };

  const resetFilters = () => {
    setFilteredProducts([]);
    setMessage("");
  };

  return { filteredProducts, fetchFilteredProducts, message, resetFilters };
};
