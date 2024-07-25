import {Input} from "../components/Input.jsx";

export const CreateProductPage = () => {
    return (<section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="flex flex-col items-center">
                    <h1>Crear producto</h1>
                    <Input type="text" label="Nombre"/>
                    <Input type="text" label="Stock"/>
                    <Input type="text" label="Precio"/>
                    <Input type="text" label="Descripción"/>
                    <Input type="text" label="Talle"/>
                    <Input type="text" label="URL"/>
                    <select value={0}>
                        <option value={0} disabled>
                            Selecciona una caterogia...
                        </option>
                    </select>
                    <button className="border">Crear</button>
                </div>
            </div>
    </section>);
};
