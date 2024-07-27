import { Input } from "../components/Input.jsx";
import { useEffect, useState } from "react";
import backend from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const UpdateProductPage = () => {
  const { name } = useParams();
  const [stock, setStock] = useState("");
  const [nameProduct, setName] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [uRL, setconfirmarURL] = useState("");
  const [ProductOptions, setProductOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const navigate = useNavigate()

  const handleChangeStock = (event, index) => {
    setProductOptions((prev) => {
      const newData = [...prev];
      newData[index].stock = parseInt(event.target.value);
      return newData;
    });
  };

  useEffect(() => {
    backend.get("/categories").then((response) => {
      const categories = response.data.map((category, index) => ({
        value: index + 1,
        label: category.name,
      }));

      setCategoryOptions([
        { value: 0, label: "Selecciona una categoria", disabled: true },
        ...categories,
      ]);
    });
  }, []);

  useEffect(() => {
    backend
      .get(`/products/${name}/matching_sizes_by_name`)
      .then(async (response) => {
        setProductOptions(response.data);

        const imagesRes = await backend.get(
          `/products/images/${response.data[0].id}`
        );
        setImages(imagesRes.data);
      });
  }, [name]);

  const handleChange = (event) => {
    setSelectedCategory(parseInt(event.target.value));
  };

  const handleAddImage = () => {
    if (images.some(image => image.urlImage === uRL)) {
      setImages((prev) => [...prev, {  }]);
    } else {
      handleAddNewImage()
    }

    setconfirmarURL("");
  };

  const handleAddNewImage = () => {
    setNewImages((prev) => [...prev, uRL]);
    setconfirmarURL("");
  };

  const handleDeleteImage = (imageId) => {
    const newData = images.filter((image) => image.id !== imageId);
    setImages(newData);
  };

  const handleDeleteNewImage = (productIndex) => {
    const newData = images.filter((_, index) => index !== productIndex);
    setNewImages(newData);
  };

  const deleteProduct = async (productId) => {
    var result = confirm("Seguro que queres eliminar el producto?");
    if (result) {
      await backend.delete(`/products/images/${productId}/alls`);
      await backend.delete(`/products/${productId}`);

      setProductOptions((prev) =>
        prev.filter((product) => product.id !== productId)
      );
    }
  };

  const updateProduct = async(product) => {
    const result = confirm("Seguro que queres actualizar el producto?");

    if (result) {
      await backend.put(`/products/${product.id}`, {
        stock: product.stock
      })

      toast.success("Producto actualizado")
    }
  };

  const handleUpdateProduct = async(productId) => {
    let navigateWasChange
    const result = confirm("Seguro que queres actualizar el producto?");

    const data = {}

    if (nameProduct.length > 0) {
      data.name = nameProduct
      navigateWasChange = true
    }

    if (descripcion.length > 0) {
      data.description = descripcion
    }


    if (result) {
      
      const imagePromises = [];

      ProductOptions.forEach((result) => {
          const promise = backend.delete(
            `/products/images/${result.id}/alls`,
          );
          imagePromises.push(promise);
      });

      await Promise.all(imagePromises);

      const promises = [];

      ProductOptions.forEach((result) => {
        promises.push(backend.put(`/products/${result.id}`, data))

        images.forEach((image) => {
          const promise = backend.post(
            `/products/images/${result.id}`,
            {
              urlImage: image.urlImage 
            }
          );
          promises.push(promise);
        });

        newImages.forEach((image) => {
          const promise = backend.post(
            `/products/images/${result.id}`,
            {
              urlImage: image 
            }
          );
          promises.push(promise);
        });
      });

      await Promise.all(promises);
    } else {
      return
    }

    if (navigateWasChange) {
      navigate(`/products/update/${nameProduct}`)
    }

    toast.success("Producto actualizado")
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center">
          <Input
            type="text"
            label="Nombre"
            placeholder={ProductOptions[0]?.name}
            value={nameProduct}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            label="Descripcion"
            placeholder={ProductOptions[0]?.description}
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
            <button onClick={handleAddImage}>+</button>
          </div>

          {images.map((image) => (
            <div key={image.id} className="flex gap-2 border border-gray-300 bg-blue-50 shadow p-2 rounded-md">
              <span className="flex-1">{image.urlImage}</span>
              <button onClick={() => handleDeleteImage(image.id)} className="text-red-500">Eliminar</button>
            </div>
          ))}

          {newImages.map((image, index) => (
            <div key={index} className="flex gap-2 border border-gray-300 bg-blue-50 shadow p-2 rounded-md">
              <span className="flex-1">{image}</span>
              <button onClick={() => handleDeleteNewImage(index)} className="text-red-500">Eliminar</button>
            </div>
          ))}
          <button className="border" onClick={handleUpdateProduct}>
            Actualizar Producto
          </button>
        </div>
      </div>
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
            {ProductOptions.map((product, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {product.size}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <input className="w-full text-center border rounded" type="number" value={product.stock} onChange={(e) => handleChangeStock(e, index)} />
                </td>
                <td className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                  <button
                    className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    onClick={() => updateProduct(product)}
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
