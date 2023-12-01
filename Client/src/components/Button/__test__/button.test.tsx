import { ThemeProvider } from "styled-components";
import { vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "../Button";
import { theme } from "../../../Theme/Theme";

describe("Button Component", () => {
  it("renders with correct props", () => {
    const mockOnClick = vi.fn();
    const buttonProps = {
      btn: {
        $primary: true,
        onClick: mockOnClick,
      },
    };

    render(
      <ThemeProvider theme={theme}>
        <Button {...buttonProps}>Click me</Button>
      </ThemeProvider>
    );

    // Verifica se o componente Btn foi renderizado corretamente
    const buttonElement = screen.getByRole("button", { name: "Click me" });
    expect(buttonElement).toBeInTheDocument();

    // Verifica se o evento onClick foi passado corretamente
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
