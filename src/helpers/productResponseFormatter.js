export const productResponseFormatter = (productsResponse, isSearchById = false) => {
  const productsIndexLocation = {};
  const newProducts = [];

  const products = isSearchById ? productsResponse : productsResponse.content;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (!productsIndexLocation.hasOwnProperty(product.name)) {
      productsIndexLocation[product.name] = newProducts.length;

      newProducts.push({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product?.images ?? [],
        sizes: [
          { id: product.id, size: product.size, stock: product.stock },
        ]
      });

      continue;
    }

    
    newProducts[productsIndexLocation[product.name]].sizes.push({
      id: product.id,
      size: product.size,
      stock: product.stock,
    })
  }

  return isSearchById 
    ? newProducts 
    : {
      ...productsResponse,
      content: newProducts,
    };
};
