import React, { useState } from "react";

function DataTable({ data, onEdit, onDelete }) {
  const [highlightedEntry, setHighlightedEntry] = useState(null);

  const handleDelete = (entry) => {
    if (
      window.confirm(
        "Esta ação é permanente e não pode ser desfeita. Tem certeza de que deseja excluir esta entrada?"
      )
    ) {
      onDelete(entry);
    }
  };

  const handleHighlight = (entry) => {
    setHighlightedEntry(entry.id);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center p-4">
        <table className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 border border-black">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2 w-1/6">ID</th>
              <th className="border border-gray-400 px-4 py-2 w-2/6">Nome</th>
              <th className="border border-gray-400 px-4 py-2 w-2/6">Tipo</th>
              <th className="border border-gray-400 px-2 py-2 w-1/6">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr
                key={entry.id}
                onClick={() => handleHighlight(entry)}
                className={highlightedEntry === entry.id ? "bg-yellow-200" : ""}
              >
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {entry.id}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {entry.nome}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {entry.tipo}
                </td>
                <td className="border border-gray-400 px-2 py-2">
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2"
                      onClick={() => onEdit(entry)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                      onClick={() => handleDelete(entry)}
                    >
                      Apagar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
