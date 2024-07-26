import {Input} from "../components";
import {useDispatch, useSelector} from "react-redux";
import backend from "../api/axios.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {loginToCheckout, updateIsLogged} from "../redux/Actions.js";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginToCheckout = useSelector(state => state.loginToCheckout);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const fetchLogin = async () => {
        try {
            const response = await backend.post('/users/login', {email, password})
            if (response.status === 200) {
                dispatch(updateIsLogged(true)) //TODO
                if (loginToCheckout) {
                    navigate('/cart/checkout')
                } else {
                    navigate('/')
                }
            } else {
                return alert("Ingrese email o contraseña validos.")
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="flex flex-col items-center">
                    <h1>Iniciar sesión</h1>

                    <Input label="Email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <Input label="Contraseña" type="password" placeholder="Contraseña"
                           onChange={(e) => setPassword(e.target.value)}/>

                    <button className="border" onClick={() => fetchLogin(email, password)}>Iniciar sesión</button>
                </div>
            </div>
        </section>
    );
};
