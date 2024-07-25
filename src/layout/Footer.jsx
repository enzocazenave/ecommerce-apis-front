import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <p className="mx-aut max-w-md text-center leading-relaxed lg:text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              consequuntur amet culpa cum itaque neque.
            </p>
          </div>

          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <Link
                to="/products"
              >
                Productos
              </Link>
            </li>
          </ul>
        </div>

        <p>
          Copyright &copy; 2024. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
