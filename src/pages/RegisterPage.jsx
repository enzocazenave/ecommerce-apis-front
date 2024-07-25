import { Input } from "../components";

export const RegisterPage = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col items-center">
        <h1>Crear cuenta</h1>
        
        <Input label="Nombre" type="text" placeholder="Nombre" />
        <Input label="Apellido" type="text" placeholder="Apellido" />
        <Input label="Email" type="text" placeholder="Email" />
        <Input label="Contraseña" type="password" placeholder="Contraseña" />
        <Input label="Confirmar contraseña" type="password" placeholder="Contraseña" />

        <button className="border">Crear cuenta</button>
      </div>
    </section>
  );
};
