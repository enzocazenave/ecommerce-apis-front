export const LoginPage = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center">
          <h1>Iniciar sesión</h1>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Contraseña" />
          <button className="border">Iniciar sesión</button>
        </div>
      </div>
    </section>
  );
};
