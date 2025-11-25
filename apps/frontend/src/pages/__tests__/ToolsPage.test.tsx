import { renderHook, waitFor } from "@testing-library/react";
import { useTools } from "../useTools";
import { vi } from "vitest";

vi.mock("../../services/toolRepository", () => ({
  toolRepository: {
    fetchAll: vi.fn().mockResolvedValue([
      { id: "1", name: "Martillo", description: "Para clavar", available: true }
    ]),
    add: vi.fn().mockResolvedValue({
      id: "2",
      name: "Taladro",
      description: "Para perforar",
      available: true
    })
  }
}));

describe("useTools", () => {
  it("carga herramientas correctamente", async () => {
    const { result } = renderHook(() => useTools());

    await waitFor(() => {
      expect(result.current.tools.length).toBe(1);
    });
  });

  it("agrega una herramienta correctamente", async () => {
    const { result } = renderHook(() => useTools("FAKE_TOKEN"));

    await result.current.addTool({
      name: "Taladro",
      description: "Para perforar",
      available: true
    });

    expect(result.current.tools.length).toBe(1); // después de mock fetchAll
  });
});
