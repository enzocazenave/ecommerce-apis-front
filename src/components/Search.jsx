import {Input} from "./Input.jsx";

export const Search = () => {
    return (
        <div>
            <h2>Filtros</h2>
            <Input type="text" placeholder="Nombre" label="Nombre"/>
            <Input type="text" placeholder="Desde" label="Precio"/>
            <Input type="text" placeholder="Hasta"/>
            <button>Buscar</button>
        </div>
    );
};
