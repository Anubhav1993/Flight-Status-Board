import { useState, useEffect, useMemo } from "react";
import { FLIGHT_API_URL } from "../../utils/Constants";
import "./FlightTable.css";
import FlightRow from "../FlightRow/FlightRow";
const FlightTable = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true); //State for Loading Indicator
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch(FLIGHT_API_URL);
      const jsonResponse = await response.json();
      setFlights(jsonResponse);
      setLoading(false);
    } catch (error) {
      setError("Error fetching flights. Please try again later.");
      setLoading(false);
    }
  };

  const memoizedFlights = useMemo(() => flights, [flights]);
  return (
    <div className="container">
      <h1 className="header">Flight Status Board</h1>
      {loading ? ( // Display Shimmer Effect
        <div className="shimmer-container">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="shimmer-row"></div>
          ))}
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {memoizedFlights.map((flight, index) => (
              <FlightRow key={flight.id} flight={flight} index={index} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FlightTable;
