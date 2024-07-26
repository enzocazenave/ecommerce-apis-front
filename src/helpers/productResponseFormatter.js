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
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
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
