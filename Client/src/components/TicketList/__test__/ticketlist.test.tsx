import { expect, vi } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../Theme/Theme";
import TicketPanel from "../TicketList";
import { TicketList } from "../../../types";

describe("TicketsPage Component", () => {
  const mockMatchMedia = (width: number) => {
    return (query: string): MediaQueryList => ({
      matches: query.includes(`(min-width: ${width}px)`),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(), // Para navegadores mais antigos
      removeListener: vi.fn(), // Para navegadores mais antigos
      dispatchEvent: vi.fn(),
    });
  };

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia(430),
    });
  });
  const eventTime: Date = new Date();
  eventTime.setHours(12, 0, 0, 0);

  it("displays used and unused tickets with different styles", () => {
    const mockTicktsProps: TicketList[] = [
      {
        id: "1",
        orderId: "#257481-124",
        title: "Mock Movie Title",
        subtitle: "O Caminho da Água",
        eventTime: eventTime,
        eventDate: new Date(2023, 11, 25),
        amountPaid: 60,
        purcheadSeats: ["A-1", "A-2", "A-3", "A-5", "A-6"],
        roomNumber: "3",
        isUsed: false,
      },
      {
        id: "2",
        orderId: "#257481-124",
        title: "Mock Movie Title 3",
        subtitle: "O Caminho da Água",
        eventTime: eventTime,
        eventDate: new Date(2023, 11, 25),
        amountPaid: 60,
        purcheadSeats: ["A-1", "A-2", "A-3"],
        roomNumber: "3",
        isUsed: true,
      },
    ];

    const { getAllByRole } = render(
      <ThemeProvider theme={theme}>
        <TicketPanel tickets={mockTicktsProps} showCheckbox={false} />
      </ThemeProvider>
    );

    const tickets = getAllByRole("ingresso");
    const usedTickets = tickets.filter((ticket) =>
      ticket.textContent?.includes("Mock Movie Title 3")
    );

    const unusedTicket = tickets.filter((ticket) =>
      ticket.textContent?.includes("Mock Movie Title")
    );

    expect(usedTickets[0]).toHaveStyle("border: solid .1rem #FF3030");
    expect(unusedTicket[0]).toHaveStyle("border: solid .1rem #3cc2ea");
  });
});
