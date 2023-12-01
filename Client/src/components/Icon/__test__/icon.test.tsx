import { render, screen } from "@testing-library/react";
import Icon from "../Icon";
import "@testing-library/jest-dom";

describe("Icon Component", () => {
  it("renders with correct props", () => {
    const iconProps = {
      icon: {
        $primary: true,
        src: "path/to/image.png",
        alt: "Icon Alt Text",
        onClick: () => {},
      },
    };

    render(<Icon {...iconProps} />);

    // Verifica se o componente IconImg foi renderizado corretamente
    const iconImgElement = screen.getByRole("img", { name: "Icon Alt Text" });
    expect(iconImgElement).toBeInTheDocument();

    // Verifica se os props foram passados corretamente para o componente IconImg
    expect(iconImgElement).toHaveAttribute("src", "path/to/image.png");
    expect(iconImgElement).toHaveAttribute("alt", "Icon Alt Text");
    expect(iconImgElement.onclick).toBeInstanceOf(Function);
  });
});
