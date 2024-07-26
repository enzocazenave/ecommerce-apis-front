import React from 'react'
import { useState } from "react";

export const UpdateProductPage = () => {
    //Variables http://127.0.0.1:3000/products
    const [nombre, setNombre] = useState("");
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [uRL, setconfirmarURL] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [tallesDisponibles, setTallesDisponibles] = useState([]);
    const options = [
      { value: 0, label: "Selecciona una Categoria", disabled: true },
      { value: 1, label: "Remeras" },
      { value: 2, label: "Pantalones" },
      { value: 3, label: "Buzos" },
    ];
    const [data, setData] = useState([]);
    
    // funciones
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
  
      console.log(options.find((option) => option.value === selectedCategory));
      const newProduct = {
        Nombre: nombre,
        Descripcion: descripcion,
        caterogia: options.find((option) => option.value === selectedCategory)
          .label,
        URL: uRL,
        Talle: "",
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
            <Input
              type="text"
              label="URL"
              placeholder="URL"
              value={uRL}
              onChange={(e) => setconfirmarURL(e.target.value)}
            />
            <select
              className="px-2 py-1 mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
              value={selectedCategory}
              onChange={handleChange}
            >
              {options.map((option, index) => (
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
              <select onChange={(e) => {}}>
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
                  URL
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
                    {product.URL}
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
                  onClick={null}
                    >
                    Cargar Productos
                    </button>
          </table>
        </div>
      </section>
    );
  }
