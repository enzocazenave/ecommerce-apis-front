import { Input } from "../components/Input.jsx";
import { useEffect, useState } from "react";
import backend from "../api/axios";

export const CreateProductPage = () => {
  //Variables http://127.0.0.1:3000/products
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [uRL, setconfirmarURL] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [tallesDisponibles, setTallesDisponibles] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([])
  const [images, setImages] = useState([])
  const [talleSeleccionado, setTalleSeleccionado] = useState(0)

  const [data, setData] = useState([
    
  ]);
  
  //Conexiones a la db

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
  
  // funciones
  const creactProduct = async () => {
    const promises = []

    data.forEach((product) => {
      const promise = backend.post("/products", {
        name: product.Nombre,
        description: product.Descripcion,
        idCategory: 1,
        price: 100,
        stock: parseInt(product.Stock),
        size: product.Talle
      })

      promises.push(promise)
    })

    await Promise.all(promises)
      .then(async (results) => {
        const imagePromises = []

        results.forEach(result => {
          const responseResult = result.data
          images.forEach(image => {
            const promise = backend.post(`/products/images/${responseResult.id}`, {
              urlImage: image
            })
            imagePromises.push(promise)
          })
        })

        await Promise.all(imagePromises)
      })
  }

  // Validaciones
  const validateNombre = (nombre) => {
    if (nombre.trim() === "") {
      return "El nombre del producto es obligatorio.";
    }
    // Add more validation rules as needed (e.g., minimum length)
    return null; // Return null if validation passes
  };

  const validateStock = (stock) => {
    if (stock.trim() === ""|| isNaN(stock) || parseInt(stock, 10) <= 0) {
      return "El stock debe ser un número positivo.";
    }
    return null; // Return null if validation passes
  };

  const deleteProduct = (productId) => {
    console.log(productId)
    const newData = data.filter((_, index) => index !== productId);
    setData(newData);
  };

  //Eventos
  const handleChange = (event) => {
    setSelectedCategory(parseInt(event.target.value));

    // Filtrar talles según la categoría
    let nuevosTalles;
    switch (event.target.value) {
      case "1": // Remeras
        nuevosTalles = ["S", "M", "L", "XL"];
        break;
      case "2": // Pantalones
        nuevosTalles = ["30", "32", "34", "36"];
        break;
      case "3": // Buzos
        nuevosTalles = ["S", "M", "L", "XL"];
        break;
      default:
        nuevosTalles = []; // No hay talles disponibles para otras categorías
    }
    setTallesDisponibles(nuevosTalles);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    const nombreError = validateNombre(nombre);
    const stockError = validateStock(stock);

    if (nombreError || stockError) {
      console.error("Errores de validación:", nombreError, stockError);
      return;
    }

    const newProduct = {
      Nombre: nombre,
      Descripcion: descripcion,
      caterogia: categoryOptions.find((option) => option.value === selectedCategory)
        .label,
      Talle: talleSeleccionado,
      Stock: parseInt(stock, 10),
    };
    setData([...data, newProduct]);
    setStock("");
  };

  //me queda validar los valores. Esto lo deberia hacer con funciones pero nose como aplicarlas cuando utilizo el componente

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center">
          <h1>Crear producto</h1>
          <Input
            type="text"
            label="Nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
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
          { images.map((image, index) => (
            <div key={index} className="flex gap-2"> 
              <span>{image}</span>
              <button onClick={() => handleDeleteImage(index)}>Eliminar</button>
            </div>
          )) }
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
          {selectedCategory !== 0 ? (
            <select onChange={(e) => { setTalleSeleccionado(e.target.value) }}>
              {tallesDisponibles.map((talle, index) => (
                <option key={index} value={talle}>
                  {talle}
                </option>
              ))}
            </select>
          ) : null}
          <Input
            type="number"
            label="Stock"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button className="border" onClick={handleAddProduct}>
            Agregar
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h1>Lista de productos a agregar</h1>
      </div>
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
            {data.map((product, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {product.Nombre}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {product.Descripcion}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {product.caterogia}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {product.Talle}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {product.Stock}
                </td>
                <td className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                  <button
                    className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    onClick={() => deleteProduct(index)}
                  >
                    {" "}
                    Eliminar{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                onClick={creactProduct}
                  >
                  Cargar Productos
                  </button>
        </table>
      </div>
    </section>
  );
};
