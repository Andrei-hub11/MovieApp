import { Mock, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fieldsLogin, fieldsRegister } from "../../../utils/formfields/fields";
import Formkit from "../Formkit";
import { theme } from "../../../Theme/Theme";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";

import useRedirect from "../../../utils/customHook/useRedirect/useRedirect";

// Mock para useRedirect
vi.mock("../../../utils/customHook/useRedirect/useRedirect", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockRedirectTo = vi.fn(); // Função mock redirectTo

describe("Formkit component", () => {
  (useRedirect as Mock).mockReturnValue({
    redirectTo: mockRedirectTo,
  });

  const mockForm = {
    form: {
      title: "Login Form",
      btnText: "Login",
      renderKey: "1",
      handleFormAction: vi.fn(),
      fields: fieldsLogin,
    },
  };

  const mockRegisterForm = {
    form: {
      title: "Register Form",
      btnText: "Registrar",
      renderKey: "2",
      handleFormAction: vi.fn(),
      fields: fieldsRegister,
    },
  };

  it("displays error messages for invalid email and password", async () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <Formkit {...mockForm} />
        </MemoryRouter>
      </ThemeProvider>
    );

    const emailField = getByPlaceholderText("Adicione um email");
    const passwordField = getByPlaceholderText("Diga-me sua senha");
    const submitButton = getByText("Login");

    // Submit the form without filling fields
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("O email é obrigatório")).toBeInTheDocument();
      expect(getByText("A senha é obrigatória")).toBeInTheDocument();
    });

    // Fill the fields with invalid data
    fireEvent.change(emailField, { target: { value: "invalidemail" } });
    fireEvent.change(passwordField, { target: { value: "weakpas" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("Digite um email válido")).toBeInTheDocument();
      expect(
        getByText("A senha deve ter no mínimo 8 caracteres")
      ).toBeInTheDocument();
      // Add assertions for other specific error messages
    });

    fireEvent.change(emailField, { target: { value: "invalidemail@gmail.c" } });
    fireEvent.change(passwordField, { target: { value: "weakpass" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText("Siga o formato padrão de endereços de email")
      ).toBeInTheDocument();
      expect(
        getByText("Deve conter pelo menos 1 letra maiúscula")
      ).toBeInTheDocument();
    });

    fireEvent.change(passwordField, { target: { value: "48824u2Aa$" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText("Deve conter pelo menos 2 caracteres especiais")
      ).toBeInTheDocument();
    });
  });

  it("displays error messages for invalid name, email. password", async () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <Formkit {...mockRegisterForm} />
        </MemoryRouter>
      </ThemeProvider>
    );

    const emailField = getByPlaceholderText("Adicione um email");
    const passwordField = getByPlaceholderText("Diga-me uma senha");
    const passwordConfirmationField = getByPlaceholderText("Confirme a senha");
    const submitButton = getByText("Registrar");

    // Submit the form without filling fields
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("O nome é obrigatório")).toBeInTheDocument();
      expect(getByText("O email é obrigatório")).toBeInTheDocument();
      expect(getByText("A senha é obrigatória")).toBeInTheDocument();
      expect(
        getByText("A confirmação de senha é obrigatória")
      ).toBeInTheDocument();
    });

    // Fill the fields with invalid data
    fireEvent.change(emailField, { target: { value: "invalidemail" } });
    fireEvent.change(passwordField, { target: { value: "weakpas" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("Digite um email válido")).toBeInTheDocument();
      expect(
        getByText("A senha deve ter no mínimo 8 caracteres")
      ).toBeInTheDocument();
      // Add assertions for other specific error messages
    });

    fireEvent.change(emailField, { target: { value: "invalidemail@gmail.c" } });
    fireEvent.change(passwordField, { target: { value: "weakpass" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText("Siga o formato padrão de endereços de email")
      ).toBeInTheDocument();
      expect(
        getByText("Deve conter pelo menos 1 letra maiúscula")
      ).toBeInTheDocument();
    });

    fireEvent.change(passwordField, { target: { value: "48824u2Aa$" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText("Deve conter pelo menos 2 caracteres especiais")
      ).toBeInTheDocument();
    });

    fireEvent.change(passwordField, { target: { value: "48824u2Aa$$" } });
    fireEvent.click(submitButton);
    fireEvent.change(passwordConfirmationField, {
      target: { value: "48824u2Aa$" },
    });

    await waitFor(() => {
      expect(getByText("As senhas devem coincidir")).toBeInTheDocument();
    });
  });

  it("redirects to /register when clicking information links", async () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <Formkit {...mockForm} />
        </MemoryRouter>
      </ThemeProvider>
    );

    const registerLink = getByRole("register-link");

    registerLink && fireEvent.click(registerLink);
    await waitFor(() => {
      expect(mockRedirectTo).toHaveBeenCalledWith("/register");
    });
  });

  it("redirects to /login when clicking information links", async () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <Formkit {...mockRegisterForm} />
        </MemoryRouter>
      </ThemeProvider>
    );

    const loginLink = getByRole("login-link");

    loginLink && fireEvent.click(loginLink);
    await waitFor(() => {
      expect(mockRedirectTo).toHaveBeenCalledWith("/register");
    });
  });
});
