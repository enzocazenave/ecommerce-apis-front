export const RegisterPage = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col items-center">
        <h1>Crear cuenta</h1>
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Apellido" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        <button className="border">Crear cuenta</button>
      </div>
    </section>
  );
};
