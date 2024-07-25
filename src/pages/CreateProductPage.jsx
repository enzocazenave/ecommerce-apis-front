export const CreateProductPage = () => {
    return (<section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="flex flex-col items-center">
                    <h1>Crear producto</h1>
                    <input type="text" placeholder="Nombre"/>
                    <input type="text" placeholder="Stock"/>
                    <input type="text" placeholder="Precio"/>
                    <input type="text" placeholder="Descripción"/>
                    <input type="text" placeholder="Talle"/>
                    <input type="text" placeholder="URL"/>
                    <select value="Selecciona una caterogia">
                        <option value="Selecciona una caterogia" disabled>
                        </option>
                    </select>
                    <button className="border">Crear</button>
                </div>
            </div>
    </section>);
};
