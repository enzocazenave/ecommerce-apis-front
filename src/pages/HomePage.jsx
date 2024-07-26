import React, { useState, useEffect } from 'react';
import { ProductList } from '../components/ProductList';
import backend from '../api/axios'; // Asegúrate de que `backend` esté configurado para hacer solicitudes

export const HomePage = () => {
  // Estado para almacenar productos de las dos categorías
  const [productsFirstCategory, setProductsFirstCategory] = useState([]);
  const [productsSecondCategory, setProductsSecondCategory] = useState([]);

  // Estado para almacenar las categorías
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Obtener todas las categorías
    backend.get('/categories')
      .then(response => {
        const categoriesData = response.data; // Obtener datos de las categorías
        setCategories(categoriesData); // Guardar categorías en el estado

        // Verificar que hay al menos una categoría antes de hacer la solicitud
        if (categoriesData.length > 0) {
          backend.get(`/products/categories/${categoriesData[0]?.id}`)
            .then(console.log(response.data))
            .then(response => setProductsFirstCategory(response.data))
            .catch(error => console.error("Error fetching first category products:", error));
        }

        // Verificar que hay al menos dos categorías antes de hacer la solicitud
        if (categoriesData.length > 1) {
          backend.get(`/products/categories/${categoriesData[1]?.id}`)
            .then(response => setProductsSecondCategory(response.data))
            .catch(error => console.error("Error fetching second category products:", error));
        }
      })
      .catch(error => {
        console.error("Error fetching categories:", error); // Manejo de errores
      });
  }, []);

  // Obtener las categorías si están disponibles
  const firstCategory = categories[0];
  const secondCategory = categories[1];

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {}
      {firstCategory && productsFirstCategory.length > 0 && (
        <ProductList products={productsFirstCategory} title={firstCategory.name} />
      )}
      {secondCategory && productsSecondCategory.length > 0 && (
        <ProductList products={productsSecondCategory} title={secondCategory.name} />
      )}
    </section>
  );
};


