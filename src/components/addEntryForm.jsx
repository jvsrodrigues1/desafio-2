import React, { useState } from "react";

function AddEntryForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type.toUpperCase() === "E" || type.toUpperCase() === "I") {
      onSubmit({ name, type });
      setName("");
      setType("");
      setError("");
    } else {
      setError("Por favor, digite 'E' ou 'I' para o tipo.");
    }
  };

  const handleChange = (e) => {
    setType(e.target.value.toUpperCase());
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md"
    >
      <div className="flex flex-wrap mb-4 -mx-3">
        <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
          <label className="block mb-2 text-gray-800">Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
          <label className="block mb-2 text-gray-800">Tipo (E/I):</label>
          <input
            type="text"
            value={type}
            onChange={handleChange}
            maxLength="1"
            required
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
}

export default AddEntryForm;
