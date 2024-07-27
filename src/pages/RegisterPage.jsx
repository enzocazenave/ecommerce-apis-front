import {useState} from 'react';
import backend from "../api/axios.js";
import {updateIsLogged} from "../redux/Actions.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export const RegisterPage = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarContrasena, setconfirmarContrasena] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !surname || !email || !password || !confirmarContrasena) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        if (password !== confirmarContrasena) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, ingresa un email válido.');
            return;
        }

        fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al registrar el usuario');
                }
                dispatch(updateIsLogged(true))
                navigate('/')
                return response.json();
            })
            .then(data => {
                console.log('Usuario registrado:', data);

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

                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                    {error && <div className="error">{error}</div>}
                    <input
                        label="Nombre"
                        placeholder="Nombre"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        label="Apellido"
                        placeholder="Apellido"
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <input
                        label="Email"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        label="Contraseña"
                        placeholder="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        label="Confirmar contraseña"
                        placeholder="Contraseña"
                        type="password"
                        value={confirmarContrasena}
                        onChange={(e) => setconfirmarContrasena(e.target.value)}
                    />
                    <button className="submit">Crear cuenta</button>
                </form>

            </div>
        </section>
    );
};
