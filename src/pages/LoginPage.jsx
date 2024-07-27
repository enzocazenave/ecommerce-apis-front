import {Input} from "../components";
import {useDispatch, useSelector} from "react-redux";
import backend from "../api/axios.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {updateIsLogged, updateUser} from "../redux/Actions.js";
import {Link} from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const loginToCheckout = useSelector((state) => state.loginToCheckout);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchLogin = async (e) => {
      e.preventDefault()
        try {
            const response = await backend.post("/users/login", {email, password});
            if (response.status === 200) {
                dispatch(updateIsLogged(true));
                dispatch(updateUser(response.data));
                if (loginToCheckout) {
                    navigate("/cart/checkout");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert("Email o contraseña incorrectos.");
            } else {
                alert("Hubo un error. Inténtalo de nuevo más tarde.");
            }
            console.log(error.response);
        }
    };

    return (
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Iniciar sesión</h1>

                    <p className="mt-4 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
                        nulla eaque error neque ipsa culpa autem, at itaque nostrum!
                    </p>
                </div>

        <form onSubmit={fetchLogin} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

                        <div className="relative">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Ingresá tu email"
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">
                            Contraseña
                        </label>

                        <div className="relative">
                            <input
                                type="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Ingresá tu contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            No tienes cuenta?
                            <Link className="underline ms-1" to="/register">
                                Creá una
                            </Link>
                        </p>

                        <button
                            onClick={fetchLogin}
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>

            <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </section>
    );
};
