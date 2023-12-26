import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { render, fireEvent } from "@testing-library/react";
import { Mock, vi } from "vitest";
import "@testing-library/jest-dom";

import { theme } from "../../../Theme/Theme";
import { navicons } from "../../../constants/constants";
import Navbottom from "../Navbottom";
import useRedirect from "../../../utils/customHook/useRedirect/useRedirect";
import { RootState, store } from "../../../app/store";

// Mock para useRedirect
vi.mock("../../../utils/customHook/useRedirect/useRedirect", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../../../app/store", async () => {
  const actual = await vi.importActual("../../../app/store");
  return {
    ...(actual as Record<string, unknown>), // Certifique-se de que 'actual' é um objeto
    useTypedSelector: vi.fn(), // Mocking useTypedSelector hook
    useAppDispatch: vi.fn(), // Mocking useAppDispatch hook
  };
});

const mockRedirectTo = vi.fn(); // Função mock redirectTo

const mockedUseTypedSelector = vi.fn();

const mockState: RootState = {
  account: {
    User: {
      Id: "30deecbf-ebe8-4c0e-9282",
      UserName: "testuser",
      Email: "test@gmail.com",
      ProfileImagePath: "",
      Tickets: [],
    },
    Role: ["Admin"],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  cinema: {
    Users: [
      {
        Id: "",
        UserName: "",
        Email: "",
        ProfileImagePath: "",
        Tickets: [],
      },
    ],
    Tickets: [],
    Rooms: [],
    RoomListMovieSelected: [],
    seatsGroup: [
      { group: 1, seats: [] },
      { group: 2, seats: [] },
      { group: 3, seats: [] },
      { group: 4, seats: [] },
      { group: 5, seats: [] },
      { group: 6, seats: [] },
    ],
    GiftCards: [],
    isGiftCardValid: "",
    isManagerError: false,
    isManagerSuccess: false,
    isManagerLoading: false,
    ManagerMessage: "",
  },
  purchase: {
    cartItems: [],
    currentRoom: "",
    orderId: "",
    isUsedGift: false,
    subtotal: 0,
    discount: 0,
    total: 0,
    isPurchaseLoading: false,
    isPurchaseSuccess: false,
    isPurchaseError: false,
    isProcessing: false,
    error: null,
  },
};

// Implementando o mock de useTypedSelector para retornar o estado simulado
(mockedUseTypedSelector as Mock).mockImplementation(
  (
    selectorFn: (
      state: RootState
    ) => Pick<RootState, "account" | "cinema" | "purchase">
  ) => selectorFn(mockState)
);

describe("NavBottom Component", () => {
  test("redirects to the correct route when clicking navigation icons", () => {
    (useRedirect as Mock).mockReturnValue({
      redirectTo: mockRedirectTo,
    });

    const { getAllByAltText } = render(
      <Provider store={mockState}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <Navbottom />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
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
