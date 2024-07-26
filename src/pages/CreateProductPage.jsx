import {Input} from "../components/Input.jsx";
import { useState } from 'react';

export const CreateProductPage = () => {

    const [nombre, setNombre] = useState('');
    const [stock, setStock] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripción, setDescripción] = useState('');
    const [talle, setconfirmarTalle] = useState('');
    const [uRL, setconfirmarURL] = useState('');
    //const [error, setError] = useState(null); 

        // Envío de datos al servidor (adapta a tu backend)
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



return (<section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="flex flex-col items-center">
                    <h1>Crear producto</h1>
                    <Input type="text" label="Nombre"  placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                    <Input type="text" label="Stock"  placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)}/>
                    <Input type="text" label="Precio"  placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
                    <Input type="text" label="Descripción"  placeholder="Descripción" value={descripción} onChange={(e) => setDescripción(e.target.value)}/>
                    <Input type="text" label="Talle"  placeholder="Talle" value={talle} onChange={(e) => setconfirmarTalle(e.target.value)}/>
                    <Input type="text" label="URL"  placeholder="URL" value={uRL} onChange={(e) => setconfirmarURL(e.target.value)}/>
                    <select value={0}>
                        <option value={0} disabled>
                            Selecciona una caterogia...
                        </option>
                    </select>
                    <button className="border">Crear</button>
                </div>
            </div>
    </section>);
};
