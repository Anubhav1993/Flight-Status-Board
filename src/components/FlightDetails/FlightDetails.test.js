/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FlightDetails from "./FlightDetails";
import { MemoryRouter } from "react-router-dom";

describe("FlightDetails", () => {
  test("renders flight details", async () => {
    const mockFlight = {
      id: 1,
      flightNumber: "ABC123",
      airline: "Example Airlines",
      origin: "Origin City",
      destination: "Destination City",
      departureTime: "2024-03-10T12:00:00Z",
      status: "On Time",
    };
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => mockFlight,
      ok: true,
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <FlightDetails />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Flight Details")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("ABC123")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Example Airlines")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Origin City")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Destination City")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("10/3/2024, 5:30:00 pm")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("On Time")).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });

  test("renders error message when fetching fails", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Network Error"));

    await act(async () => {
      render(
        <MemoryRouter>
          <FlightDetails />
        </MemoryRouter>
      );
    });

    expect(
      await screen.findByText(
        "Flight details not found. Please check the flight number and try again."
      )
    ).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});
