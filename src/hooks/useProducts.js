import { useState } from "react";
import { useEffect } from "react";
import backend from "../api/axios";
import { productResponseFormatter } from "../helpers";

export const useProducts = ({ id = null }) => {
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
