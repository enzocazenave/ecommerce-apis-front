import { Input } from "../components/Input.jsx";
import { useEffect, useState } from "react";
import backend from "../api/axios";
import { useParams } from "react-router-dom";

export const  UpdateProductPage = () => {
  const { name } = useParams()
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [uRL, setconfirmarURL] = useState("");
  const [ProductOptions, setProductOptions] = useState([])
  const [images, setImages] = useState([])
  
  
  useEffect(() => {
    backend.get(`/products/${name}/matching_sizes_by_name`)
      .then(async(response) => {
        setProductOptions(response.data)
        
        const promises = []

        response.data.forEach((product) => {
          const promise = backend.get(`/products/images/${product.id}`)
          promises.push(promise)
        })

        await Promise.all(promises).then((results) => setImages(results))
      })
  }, [])

  const deleteProduct = async(productId) => {
    var result = confirm("Seguro que queres eliminar el producto?");
      if (result) {
        await backend.delete(`/products/images/${productId}/all`)
        await backend.delete(`/products/${productId}`)
      }
  };

  
  const updateProduct = (productId) => {
    console.log(productId);
  };

  const handleUpdateProduct = (productId) => {
    var result = confirm("Seguro que queres actualizar el producto?");
    if (result) {
      console.log(productId);
    }
  };
  
  const handleAddImage = () => {
    setImages(prev => [
      ...prev,
      uRL
    ])
    setconfirmarURL("")
  }

  const handleDeleteImage = (index) => {
    const newData = images.filter((_, imageIndex) => imageIndex !== index);
    setImages(newData);
  }

  return (
    <section>
    <div className="overflow-x-auto">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Nombre
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Descripcion
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            caterogia
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Talle
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Stock
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {ProductOptions.map((product,index) => (
          <tr key={index}>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {product.name}
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {product.description}
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {product.category.name}
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {product.size}
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {product.stock}
            </td>
            <td className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
              <button
                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                onClick={() => updateProduct(index)}
              >
                {" "}
                Actualizar{" "}
              </button>
            </td>
            <td className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
              <button
                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                onClick={() => deleteProduct(product.id)}
              >
                {" "}
                Eliminar{" "}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center">
          <Input
            type="number"
            label="Precio"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <Input
            type="text"
            label="Descripcion"
            placeholder="Descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="text"
              label="URL"
              placeholder="URL"
              value={uRL}
              onChange={(e) => setconfirmarURL(e.target.value)}
            />
            <button onClick={handleAddImage}>
              +
            </button>
          </div>
          {/* images.map((image, index) => (
            <div key={index} className="flex gap-2"> 
              <span>{image}</span>
              <button onClick={() => handleDeleteImage(index)}>Eliminar</button>
            </div>
          )) */}
          <Input
            type="number"
            label="Stock"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button className="border" onClick={handleUpdateProduct}>
            Actaulizar Producto
          </button>
        </div>
      </div>





    </section>
  );
  };
