import { useState } from "react";
import { useEffect } from "react";
import backend from "../api/axios";
import { productResponseFormatter } from "../helpers";

export const useProducts = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {  
    handleGetProducts(id);
  }, [])

  const handleGetProducts = (id) => {
    const url = id ? `/products/${id}/matching_sizes` : `/products`;

    backend.get(url)
      .then((response) => {
        setProducts(productResponseFormatter(response.data, true))
      }).catch((error) => {
        console.log(error)
      })
  }

  const handleFilter = ({ name, from, to }) => {
    if (name.length === 0 && from.length === 0 && to.length === 0) {
      return;
    }

    const url = name.length > 0 ? `/products/search/${name}` : `/products/productsByPrice?priceMin=${from}&priceMax=${to}`;
    
    backend.get(url)
      .then((response) => {
        setProducts(productResponseFormatter(response.data, true));
        setFiltered(true)
      }).catch((error) => {
        console.log(error)
      })
  }

  const resetFilters = () => {
    handleGetProducts();
    setFiltered(false);
  }

  return {
    products,
    filtered,
    handleFilter,
    resetFilters
  }
}
