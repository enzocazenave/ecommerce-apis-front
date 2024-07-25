import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="block">
          Logo
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav className="hidden md:block">
            <ul className="flex ">
              <li>
                <Link to="/products">Productos</Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-8">
              <Link to="/cart">Carrito</Link>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/register">Crear cuenta</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
