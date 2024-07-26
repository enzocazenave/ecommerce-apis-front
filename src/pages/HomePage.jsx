/* import {ProductList} from "../components";

const products = [
    {
        id: 1,
        name: "Remera Básica",
        price: 16250,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
        id: 2,
        name: "Remera Básica",
        price: 16250,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
        id: 3,
        name: "Remera Básica",
        price: 16250,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
        id: 4,
        name: "Remera Básica",
        price: 16250,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
];

export const HomePage = () => {
    return (
        <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <ProductList
                products={products}
                title="Remeras"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, illo! Facilis quia eius dignissimos, recusandae nostrum sit quisquam enim molestiae culpa, alias error non omnis, dolore repellat esse quidem. Eius."
            />

            <ProductList
                products={products}
                title="Camperas"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, illo! Facilis quia eius dignissimos, recusandae nostrum sit quisquam enim molestiae culpa, alias error non omnis, dolore repellat esse quidem. Eius."
            />

        </section>
    );
};
 */
/*
*
*
*
*
*
*/

/* import React, { useState, useEffect } from 'react';
import { ProductList } from '../components/ProductList';
import backend from '../api/axios';

export const HomePage = () => {
  const [productsFirstCategory, setProductsFirstCategory] = useState([]);
  const [productsSecondCategory, setProductsSecondCategory] = useState([]);

  const [categories, setCategories] = useState([])

  useEffect(() => {
    // Obtener todas las categorías
    backend.get('/categories')
      .then(response => {
        setCategories(response.data);
        const firstCategory = response.data[0];
        const secondCategory = response.data[1];

        if (firstCategory) {
          // Obtener productos de la primera categoría
          backend.get(`/products/categories/${firstCategory.name}`)
            .then(response => setProductsFirstCategory(response.data));
        }

        if (secondCategory) {
          // Obtener productos de la segunda categoría
          backend.get(`/products/categories/${secondCategory.name}`)
            .then(response => setProductsSecondCategory(response.data));
        }
      })
      .catch(error => {
        console.error("Error loading categories or products:", error);
      });
  }, []);

  const firstCategory = categories[0];
  const secondCategory = categories[1];

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ProductList products={productsFirstCategory} title={firstCategory.name} />
      <ProductList products={productsSecondCategory} title={secondCategory.name} />

    </section>
  );
};

 */

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


