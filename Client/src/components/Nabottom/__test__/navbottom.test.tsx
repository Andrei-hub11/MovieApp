import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { render, fireEvent } from "@testing-library/react";
import { Mock, vi } from "vitest";
import "@testing-library/jest-dom";

import { theme } from "../../../Theme/Theme";
import { navicons } from "../../../constants/constants";
import Navbottom from "../Navbottom";
import useRedirect from "../../../utils/customHook/useRedirect/useRedirect";

// Mock para useRedirect
vi.mock("../../../utils/customHook/useRedirect/useRedirect", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockRedirectTo = vi.fn(); // Função mock redirectTo

describe("NavBottom Component", () => {
  test("redirects to the correct route when clicking navigation icons", () => {
    (useRedirect as Mock).mockReturnValue({
      redirectTo: mockRedirectTo,
    });

    const { getAllByAltText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <Navbottom />
        </MemoryRouter>
      </ThemeProvider>
    );

    // Simule um clique em cada ícone
    const navigationIcons = getAllByAltText(
      "icone de navegação"
    ) as HTMLImageElement[];

    navigationIcons.forEach((icon, index) => {
      fireEvent.click(icon); // Simula um clique em cada ícone
      // Espera-se que a função seja chamada com a rota correta
      expect(mockRedirectTo).toHaveBeenCalledWith(navicons[index].route);
    });
  });
});
