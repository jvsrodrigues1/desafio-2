import React from "react";

function AddEntryButton({ onClick }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      onClick={onClick}
    >
      Adicionar Nova
    </button>
  );
}

export default AddEntryButton;
