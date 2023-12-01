import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../Theme/Theme";
import Indicator from "../Indicator";

describe("Indicator Component", () => {
  it("renders with correct props", () => {
    const indicatorProps = {
      indicator: {
        sectionName: "Meu perfil",
        src: "path/to/image.png",
        alt: "icone da seção de perfil",
      },
    };

    render(
      <ThemeProvider theme={theme}>
        <Indicator {...indicatorProps} />
      </ThemeProvider>
    );

    // Verifica se o componente IconImg foi renderizado corretamente
    const iconImgElement = screen.getByRole("img", {
      name: "icone da seção de perfil",
    });

    const paragraphElement = screen.getByText("Meu perfil");

    expect(iconImgElement).toHaveAttribute("src", "path/to/image.png");
    expect(iconImgElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});
