import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Profile from "../Profile";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../Theme/Theme";

describe("ProfilePage Component", () => {
  test("renders profile information correctly", () => {
    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <Profile />
      </ThemeProvider>
    );

    expect(getByText("Nome")).toBeTruthy();
    expect(getByText("Anakin Skywalker")).toBeTruthy();
    expect(getByText("E-mail")).toBeTruthy();
    expect(getByText("anakin.skywalker@jediorder.net")).toBeTruthy();

    expect(getByAltText("icone da seção de perfil")).toBeTruthy();
    expect(getByAltText("icone de editar")).toBeTruthy();
  });
});
