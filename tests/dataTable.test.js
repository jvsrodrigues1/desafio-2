import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DataTable from "../src/components/dataTable";

describe("DataTable component", () => {
  const mockData = [
    { id: 1, nome: "Item 1", tipo: "E" },
    { id: 2, nome: "Item 2", tipo: "I" },
  ];

  it("Renderiza tabela", () => {
    const { getByText } = render(<DataTable data={mockData} />);
    mockData.forEach((entry) => {
      expect(getByText(entry.id.toString())).toBeTruthy();
      expect(getByText(entry.nome)).toBeTruthy();
      expect(getByText(entry.tipo)).toBeTruthy();
    });
  });

  it("Confirma se foi deletado ao apertar o botão", () => {
    const mockDelete = jest.fn();
    window.confirm = jest.fn(() => true);
    const { getAllByText } = render(
      <DataTable data={mockData} onDelete={mockDelete} />
    );

    const deleteButtons = getAllByText("Apagar");
    fireEvent.click(deleteButtons[0]);
    expect(window.confirm).toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalled();
  });

  it("Não chama o Metodo delete quando não confirma com ok", () => {
    const mockDelete = jest.fn();
    window.confirm = jest.fn(() => false);
    const { getAllByText } = render(
      <DataTable data={mockData} onDelete={mockDelete} />
    );

    const deleteButtons = getAllByText("Apagar");
    fireEvent.click(deleteButtons[0]);
    expect(window.confirm).toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
  });
});
