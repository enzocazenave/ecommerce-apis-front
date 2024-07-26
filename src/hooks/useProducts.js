import { useState } from "react";
import { useEffect } from "react";
import backend from "../api/axios";
import { productResponseFormatter } from "../helpers";

export const useProducts = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    handleGetProducts(id)
  }, [])

  const handleGetProducts = () => {
    backend.get(id ? `/products/${id}/matching_sizes` : "/products")
      .then((response) => {
        setProducts(
          productResponseFormatter(
            response.data,
            !!id
          )
        );
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

/*export const useProducts = ({ id = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    backend.get(`/products${id ? `/${id}/matching_sizes` : ""}`)
      .then((response) => {
        setProducts(
          productResponseFormatter(
            response.data, 
            !!id
          )
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    products,
    loading,
  };
};
*/