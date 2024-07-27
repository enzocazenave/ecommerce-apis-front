import { Input } from "../components/Input.jsx";
import { useEffect, useState } from "react";
import backend from "../api/axios";
import { useParams } from "react-router-dom";

export const  UpdateProductPage = () => {
  const { name } = useParams()
  const [stock, setStock] = useState("");
  const [nameProduct, setName] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [uRL, setconfirmarURL] = useState("");
  const [ProductOptions, setProductOptions] = useState([])
  const [images, setImages] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(0);
  useEffect(() => {
    backend.get("/categories")
      .then((response) => {
        const categories = response.data.map((category, index) => ({
          value: index + 1,
          label: category.name,
        }))

        setCategoryOptions([
          { value: 0, label: "Selecciona una categoria", disabled: true },
          ...categories
        ])
      })
  }, [])

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

  const handleChange = (event) => {
    setSelectedCategory(parseInt(event.target.value));
  };

  const handleAddImage = () => {
    setImages(prev => [
      ...prev,
      uRL
    ])
    setconfirmarURL("")
  }

  const deleteProduct = async(productId) => {
    var result = confirm("Seguro que queres eliminar el producto?");
      if (result) {
        await backend.delete(`/products/images/${productId}/alls`)
        await backend.delete(`/products/${productId}`)

        setProductOptions(prev => prev.filter(product => product.id !== productId))
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
  return (
    <section>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center">
         <Input
            type="text"
            label="Nombre"
            placeholder="Nombre"//{ProductOptions[0].name}
            value={nameProduct}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            label="Descripcion"
            placeholder="Descripcion"//{ProductOptions[0].description}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <select
            className="px-2 py-1 mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            value={selectedCategory}
            onChange={handleChange}
          >
            {categoryOptions.map((option, index) => (
              <option
                key={index}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
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
         <button className="border" onClick={handleUpdateProduct}>
            Actualizar Producto
          </button> 
        </div>
      </div>
    -------------------------------
    <div className="overflow-x-auto">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
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
    </section>
  );
  };
