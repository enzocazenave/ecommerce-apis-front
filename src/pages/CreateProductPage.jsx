import {Input} from "../components/Input.jsx";
import { useState } from 'react';

export const CreateProductPage = () => {

    const [nombre, setNombre] = useState('');
    const [stock, setStock] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripción, setDescripción] = useState('');
    const [talle, setconfirmarTalle] = useState('');
    const [uRL, setconfirmarURL] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [tallesDisponibles, setTallesDisponibles] = useState([]);
    const options = [
      { value: 0, label: 'Selecciona una Categoria', disabled: true },
      { value: 1, label: 'Remeras' },
      { value: 2, label: 'Pantalones'},
      { value: 2, label: 'Buzos'},
    ];

    //const [error, setError] = useState(null); 

        fetch('/api/Crear¨Producto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre,
            stock,
            precio,
            descripción,
            talle,
            uRL
          })
        })
  
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al registrar el usuario');
          }
          return response.json();
        })
        .then(data => {
          console.log('Usuario registrado:', data);
          // Redirigir a otra página o mostrar un mensaje de éxito
        })

        const handleChange = (event) => {
          setSelectedCategory(event.target.value);
        
          // Filtrar talles según la categoría
          let nuevosTalles;
          switch (event.target.value) {
            case "1": // Remeras
              nuevosTalles = ["S", "M", "L", "XL"];
              break;
            case "2": // Pantalones
              nuevosTalles = ["30", "32", "34", "36"];
              break;
            case "3": // Buzos (asumiendo que tiene talles distintos)
              nuevosTalles = ["S", "M", "L", "XL"];
              break;
            default:
              nuevosTalles = []; // No hay talles disponibles para otras categorías
          }
          setTallesDisponibles(nuevosTalles);
        };


//me queda validar los valores. Esto lo deberia hacer con funciones pero nose como aplicarlas cuando utilizo el componente

return (<section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="flex flex-col items-center">
                    <h1>Crear producto</h1>
                    <Input type="text" label="Nombre"  placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                    <Input type="number" label="Stock"  placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)}/>
                    <Input type="number" label="Precio"  placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
                    <Input type="text" label="Descripción"  placeholder="Descripción" value={descripción} onChange={(e) => setDescripción(e.target.value)}/>
                    <Input type="text" label="URL"  placeholder="URL" value={uRL} onChange={(e) => setconfirmarURL(e.target.value)}/>
                    <select value={selectedCategory} onChange={handleChange}>
                      {options.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <select value="" onChange={(e) => {}}>  {/* Elimina la llave extra */}
                    {tallesDisponibles.map((talle) => (
                      <option key={talle} value={talle}>
                        {talle}
                      </option>
                    ))}
                  </select>
                    <button className="border">Agregar</button>
                </div>
            </div>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <h1>Lista de productos a agregar</h1>
            </div>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <table border="1">
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>caterogia</th>
                  <th>URL</th>
                  <th>Talle</th>
                  <th>Stock</th>
                </tr>
                <tr>
                  <td>Remera 1</td>
                  <td>Producto AAAAA</td>
                  <td>Remeras</td>
                  <td>http://ejemplo.com.ar</td>
                  <td>30</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Remera 1</td>
                  <td>Producto BBBBB</td>
                  <td>Barcelona</td>
                  <td>http://ejemplo.com.ar</td>
                  <td>30</td>
                  <td>10</td>
                </tr>
              </table>


            </div>
    </section>);
};
