import { useState } from "react";
import { Input } from "./Input.jsx";

export const Search = ({ handleSubmit, filtered, resetFilters }) => {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  
  const isDisabled = name === "" && from === "" && to === "";

  const handleReset = () => {
    setName("");
    setFrom("");
    setTo("");
    resetFilters()
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      setFrom("");
      setTo("");
    }
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
    if (event.target.value !== "") {
      setName("");
    }
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
    if (event.target.value !== "") {
      setName("");
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => handleSubmit(e, { name, from, to })}
    >
      <h2 className="text-lg font-bold text-gray-900">Filtrado</h2>

      <Input
        name="name"
        type="text"
        placeholder="Nombre"
        label="Nombre"
        value={name}
        onChange={handleNameChange}
        disabled={from !== "" || to !== ""}
      />
      <Input
        name="from"
        type="text"
        placeholder="Desde"
        label="Precio"
        value={from}
        onChange={handleFromChange}
        disabled={name !== ""}
      />
      <Input
        name="to"
        type="text"
        placeholder="Hasta"
        label="Precio"
        value={to}
        onChange={handleToChange}
        disabled={name !== ""}
      />

      <button
        disabled={isDisabled}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs ${isDisabled ? 'opacity-80' : ''}`}>
        Aplicar filtro
      </button>

      {filtered
        ? <button className="text-red-600 rounded text-xs" onClick={handleReset}>Limpiar filtro</button>
        : null
      }
    </form>
  );
};

export default Search;
