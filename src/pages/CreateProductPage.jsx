import {Input} from "../components/Input.jsx";

export const CreateProductPage = () => {
    return (<section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="flex flex-col items-center">
                    <h1>Crear producto</h1>
                    <Input type="text" title="Nombre"/>
                    <Input type="text" tile="Stock"/>
                    <Input type="text" tile="Precio"/>
                    <Input type="text" tile="Descripción"/>
                    <Input type="text" tile="Talle"/>
                    <Input type="text" tile="URL"/>
                    <select value="Selecciona una caterogia">
                        <option value="Selecciona una caterogia" disabled>
                        </option>
                    </select>
                    <button className="border">Crear</button>
                </div>
            </div>
    </section>);
};
