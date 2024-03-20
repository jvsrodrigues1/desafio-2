import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LayoutTable from "../src/components/tableLayout";

describe("LayoutTable component", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: [] }),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it("Renderiza sem crashar", () => {
    render(<LayoutTable />);
  });

  it("Puxa a tabela quando carrega a página", async () => {
    render(<LayoutTable />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      "https://apifgts.temsaque.com.br/api/layout"
    );
  });

  it("Mostra a janela com os inputs ao apertar o botão Adicionar Nova", async () => {
    const { getByText } = render(<LayoutTable />);
    fireEvent.click(getByText("Adicionar Nova"));
    await waitFor(() => expect(getByText("Submit")).toBeInTheDocument());
  });
});
