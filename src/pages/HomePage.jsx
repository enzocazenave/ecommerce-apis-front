import {ProductList} from "../components";
import backend from "../api/axios.js";
import {useEffect, useState} from "react";
import { productResponseFormatter } from "../helpers/productResponseFormatter.js";

export const HomePage = () => {
    const [productsFirstCategory, setProductsFirstCategory] = useState([])
    const [productsSecondCategory, setProductsSecondCategory] = useState([])

    const [categories, setCategories] = useState([])

    useEffect(() => {
        backend.get('/categories')
            .then(response => {
                const categoriesData = response.data;
                setCategories(categoriesData);

                if (categoriesData.length > 0) {
                    backend.get(`/products/categories/${categoriesData[0]?.id}`)
                        .then(response => {
                            const productsData = productResponseFormatter(response.data, true);
                            setProductsFirstCategory(productsData);
                        })
                        .catch(error => console.error("Error fetching first category products:", error));
                }

                if (categoriesData.length > 1) {
                    backend.get(`/products/categories/${categoriesData[1]?.id}`)
                        .then(response => {
                            const productsData = productResponseFormatter(response.data, true);
                            setProductsSecondCategory(productsData);
                        })
                        .catch(error => console.error("Error fetching second category products:", error));
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);


    return (
        <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            {categories.length > 0 && (
                <ProductList
                    products={productsFirstCategory}
                    title={categories[0].name}
                />
            )}

            {categories.length > 1 && (
                <ProductList
                    products={productsSecondCategory}
                    title={categories[1].name}
                />)}

        </section>
    );
};
