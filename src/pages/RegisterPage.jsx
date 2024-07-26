import { useState } from 'react';

export const RegisterPage = () => {
 
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setconfirmarContrasena] = useState('');
  const [error, setError] = useState(null); 

  const handleSubmit = (event) => { event.preventDefault();

      // Validaciones básicas
      if (!nombre || !apellido || !email || !contrasena || !confirmarContrasena) {
        setError('Por favor, completa todos los campos.');
        return;
      }

      if (contrasena !== confirmarContrasena) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      // Validación de email (simplificada, puedes usar una librería más robusta)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Por favor, ingresa un email válido.');
        return;
      }

      // Envío de datos al servidor (adapta a tu backend)
      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          contrasena
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
      .catch(error => {
        setError('Error al registrar el usuario. Por favor, intenta más tarde.');
        console.error('Error:', error);
      });
    };


  return (

    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col items-center">
        <h1>Crear cuenta</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          {error && <div className="error">{error}</div>}
            <input
            label="Nombre"
            placeholder="Nombre" 
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            label="Apellido"
            placeholder="Apellido"
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <input
            label="Email"
            placeholder="Email"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            label="Contraseña"
            placeholder="Contraseña" 
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <input
            label="Confirmar contraseña"
            placeholder="Contraseña" 
            type="password" 
            id="contrasena"
            value={confirmarContrasena}
            onChange={(e) => setconfirmarContrasena(e.target.value)}
          />
          <button className="submit">Crear cuenta</button>
        </form>

      </div>
    </section>
  );
};
