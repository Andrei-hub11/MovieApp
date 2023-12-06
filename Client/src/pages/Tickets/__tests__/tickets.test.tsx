import { vi, expect } from "vitest";
import { render } from "@testing-library/react";
import TicketsPage from "../TicketsPage";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../Theme/Theme";
import dayjs from "dayjs";

vi.mock("../../../constants/constants", () => ({
  Tickets: [
    {
      id: 1,
      title: "Mock Movie Title",
      subtitle: "Mock Movie Subtitle",
      orderId: "MOCK123",
      eventTime: "2023-12-05T20:00:00Z",
      eventDate: new Date(2023, 11, 25),
      purcheadSeats: ["A-1", "A-2", "A-3", "A-5", "A-6"],
      isUsed: false,
    },
    {
      id: 2,
      title: "Mock Movie Title 2",
      subtitle: "Mock Movie Subtitle",
      orderId: "M299420492",
      eventTime: "2023-12-05T20:00:00Z",
      eventDate: new Date(2023, 11, 25),
      purcheadSeats: ["A-8"],
      isUsed: false,
    },
    {
      id: 3,
      title: "Mock Movie Title 3",
      subtitle: "Mock Movie Subtitle",
      orderId: "39482820",
      eventTime: "2023-12-05T20:00:00Z",
      eventDate: new Date(2023, 11, 25),
      purcheadSeats: ["A-9"],
      isUsed: true,
    },
  ],
}));

describe("TicketsPage Component", () => {
  const mockTickets = [
    {
      id: 1,
      title: "Mock Movie Title",
      subtitle: "Mock Movie Subtitle",
      orderId: "MOCK123",
      eventTime: "2023-12-05T20:00:00Z",
      eventDate: new Date(2023, 11, 25),
      purcheadSeats: ["A-1", "A-2", "A-3", "A-5", "A-6"],
      isUsed: false,
    },
    {
      id: 2,
      title: "Mock Movie Title 2",
      subtitle: "Mock Movie Subtitle",
      orderId: "M299420492",
      eventTime: "2023-12-05T20:00:00Z",
      eventDate: new Date(2023, 11, 25),
      purcheadSeats: ["A-8"],
      isUsed: false,
    },
    {
      id: 3,
      title: "Mock Movie Title 3",
      subtitle: "Mock Movie Subtitle",
      orderId: "39482820",
      eventTime: "2023-12-05T20:00:00Z",
      eventDate: new Date(2023, 11, 25),
      purcheadSeats: ["A-9"],
      isUsed: true,
    },
  ];

  it("renders tickets correctly", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TicketsPage isUnique />
      </ThemeProvider>
    );

    mockTickets.forEach((ticket) => {
      dayjs.locale("pt-br");
      const formattedDate = dayjs(ticket.eventDate).format("ddd DD/MM/YYYY");
      const formattedTime = dayjs(ticket.eventTime).format("HH:mm A");
      expect(container).toHaveTextContent(ticket.title);
      expect(container).toHaveTextContent(ticket.subtitle);
      expect(container).toHaveTextContent(ticket.orderId);
      expect(container).toHaveTextContent(ticket.purcheadSeats[0]);
      expect(container).toHaveTextContent(formattedDate);
      expect(container).toHaveTextContent(formattedTime);
      expect(container).toHaveTextContent("Horário");
      expect(container).toHaveTextContent("Data");
    });
  });

  it("displays correct ticket information", () => {
    const { getAllByText, getByText } = render(
      <ThemeProvider theme={theme}>
        <TicketsPage isUnique />
      </ThemeProvider>
    );

    // Example assertions after a ticket is clicked
    expect(getByText("Mock Movie Title")).toBeInTheDocument();
    expect(getByText("MOCK123")).toBeInTheDocument();
    const horarioElements = getAllByText("Horário");
    horarioElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    const dataElements = getAllByText("Data");
    dataElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
